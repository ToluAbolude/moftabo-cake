
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Package, Clock, ShoppingCart } from "lucide-react";
import Footer from "@/components/layout/Footer";
import { Json } from "@/integrations/supabase/types";

// Define the order type
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  total_amount: number;
  items: OrderItem[];
}

// Define the database order type that matches Supabase's return type
interface DatabaseOrder {
  id: string;
  created_at: string;
  status: string | null;
  stripe_session_id: string | null;
  total_amount: number;
  user_id: string | null;
  items: Json;
}

// Type guard to check if an item is a valid OrderItem
function isValidOrderItem(item: any): item is OrderItem {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.price === 'number' &&
    typeof item.quantity === 'number'
  );
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        
        // Check if user is logged in
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          navigate('/signin?redirect=orders');
          return;
        }
        
        // Fetch user's orders
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        // Convert database orders to application orders with proper typing
        if (data) {
          const typedOrders: Order[] = (data as DatabaseOrder[]).map(dbOrder => {
            // Transform items with proper type checking
            let orderItems: OrderItem[] = [];
            
            if (Array.isArray(dbOrder.items)) {
              // Filter only valid items that match OrderItem structure
              orderItems = (dbOrder.items as any[])
                .filter(isValidOrderItem)
                .map(item => ({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  imageUrl: item.imageUrl
                }));
            }
            
            return {
              id: dbOrder.id,
              created_at: dbOrder.created_at,
              status: dbOrder.status || 'Processing',
              total_amount: dbOrder.total_amount,
              items: orderItems
            };
          });
          
          setOrders(typedOrders);
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrders();
  }, [navigate]);

  // Format date nicely
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Order History</h1>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cake-purple"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No orders yet</h3>
            <p className="mt-2 text-gray-500">You haven't placed any orders yet.</p>
            <Button 
              onClick={() => navigate('/catalog')}
              className="mt-6 bg-cake-purple hover:bg-cake-dark-purple"
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
              >
                <div className="p-6">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4 pb-4 border-b border-gray-200">
                    <div>
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>Ordered on {formatDate(order.created_at)}</span>
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">Order ID:</span> #{order.id.substring(0, 8)}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-1">
                        {order.status || 'Processing'}
                      </div>
                      <p className="font-semibold text-lg">
                        £{(order.total_amount / 100).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className="bg-gray-100 rounded-md w-16 h-16 flex-shrink-0 overflow-hidden">
                          {item.imageUrl ? (
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package className="w-full h-full p-2 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">
                              {item.quantity} x £{item.price?.toFixed(2)}
                            </p>
                            <p className="font-medium">
                              £{(item.quantity * item.price).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default OrderHistory;
