
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useAdminAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const checkAdminAccess = async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        console.error("Session error:", sessionError);
        toast({ title: "Please sign in to access this page", variant: "destructive" });
        navigate("/signin");
        return false;
      }

      // Use the new role-based function to check admin status
      const { data: isAdminResult, error: adminError } = await supabase.rpc('is_admin');
      
      if (adminError) {
        console.error("Error checking admin status:", adminError);
        toast({ title: "Authentication error", variant: "destructive" });
        navigate("/signin");
        return false;
      }

      if (!isAdminResult) {
        console.warn("Non-admin user attempted to access admin area:", session.user.email);
        toast({ title: "You do not have admin access", variant: "destructive" });
        navigate("/");
        return false;
      }

      // Log admin access for audit trail
      try {
        await supabase.from('audit_logs').insert({
          user_id: session.user.id,
          action: 'ADMIN_ACCESS',
          table_name: 'admin_dashboard',
          new_data: { 
            accessed_at: new Date().toISOString(),
            user_email: session.user.email 
          }
        });
      } catch (err) {
        console.error("Failed to log admin access:", err);
      }
      
      return true;
    } catch (error) {
      console.error("Error checking admin access:", error);
      toast({ title: "Authentication error", variant: "destructive" });
      navigate("/signin");
      return false;
    }
  };

  const logAdminAction = async (action: string, tableName?: string, recordId?: string, data?: any) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      await supabase.from('audit_logs').insert({
        user_id: session.user.id,
        action,
        table_name: tableName,
        record_id: recordId,
        new_data: data
      });
    } catch (error) {
      console.error("Failed to log admin action:", error);
    }
  };

  return { checkAdminAccess, logAdminAction };
};
