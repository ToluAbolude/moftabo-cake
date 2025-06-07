
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface PickupNotificationRequest {
  orderId: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId }: PickupNotificationRequest = await req.json();

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Fetch order details and user profile
    const { data: order, error: orderError } = await supabaseClient
      .from('orders')
      .select(`
        *,
        profiles(email, full_name)
      `)
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      throw new Error(`Order not found: ${orderError?.message}`);
    }

    // Get customer email - try from profiles first, then fallback to user lookup
    let customerEmail = order.profiles?.email;
    let customerName = order.profiles?.full_name || 'Valued Customer';

    if (!customerEmail && order.user_id) {
      // Fallback: try to get email from auth users (requires service role)
      const { data: authUser } = await supabaseClient.auth.admin.getUserById(order.user_id);
      customerEmail = authUser.user?.email;
      customerName = authUser.user?.user_metadata?.full_name || customerName;
    }

    if (!customerEmail) {
      throw new Error('Customer email not found for order');
    }

    // Prepare order items for email
    const itemsList = Array.isArray(order.items) 
      ? order.items.map((item: any) => `- ${item.name || 'Item'} (${item.quantity || 1}x)`).join('\n')
      : 'Order items';

    const pickupAddress = "123 Moftabo Bakery Street, Sweet City, SC 12345"; // Replace with actual address

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; line-height: 1.6;">
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h1 style="color: #2c3e50; margin: 0;">🎂 Your Cake is Ready for Pickup!</h1>
        </div>
        
        <p>Dear ${customerName},</p>
        
        <p>Great news! Your cake order is now ready for pickup. We're excited for you to enjoy your delicious creation!</p>
        
        <div style="background-color: #e8f5e8; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h3 style="color: #27ae60; margin-top: 0;">Order Details:</h3>
          <p><strong>Order ID:</strong> ${orderId.substring(0, 8)}...</p>
          <p><strong>Total Amount:</strong> $${order.total_amount}</p>
          <p><strong>Items:</strong></p>
          <pre style="white-space: pre-wrap; font-family: Arial, sans-serif;">${itemsList}</pre>
        </div>
        
        <div style="background-color: #fff3cd; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h3 style="color: #856404; margin-top: 0;">📍 Pickup Location:</h3>
          <p style="font-size: 16px; font-weight: bold;">${pickupAddress}</p>
          <p><strong>Pickup Hours:</strong> Monday - Saturday: 8:00 AM - 6:00 PM, Sunday: 10:00 AM - 4:00 PM</p>
        </div>
        
        <div style="background-color: #d1ecf1; padding: 15px; border-radius: 6px; margin: 20px 0;">
          <h3 style="color: #0c5460; margin-top: 0;">📋 Important Pickup Information:</h3>
          <ul>
            <li>Please bring this email or your order confirmation</li>
            <li>Valid ID may be required for order verification</li>
            <li>Orders are held for 48 hours after notification</li>
            <li>For questions, please contact us at support@moftabo.com</li>
          </ul>
        </div>
        
        <p>Thank you for choosing Moftabo Bakery! We hope you absolutely love your cake and look forward to serving you again soon.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 12px;">
          <p><strong>Moftabo Bakery</strong><br>
          Creating sweet memories, one cake at a time<br>
          📧 support@moftabo.com | 📞 (555) 123-CAKE<br>
          🌐 www.moftabo.com</p>
          
          <p style="margin-top: 15px;">
            <em>This is an automated notification regarding order #${orderId.substring(0, 8)}. 
            Please do not reply to this email address.</em>
          </p>
        </div>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: "Moftabo Bakery <orders@moftabo.com>",
      to: [customerEmail],
      subject: `🎂 Order #${orderId.substring(0, 8)} Ready for Pickup - Moftabo Bakery`,
      html: emailHtml,
    });

    console.log("Pickup notification email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      emailResponse,
      sentTo: customerEmail 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-pickup-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
