
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Clock, User, MessageSquare, FileText, Download } from "lucide-react";

interface OrderDetailModalProps {
  orderId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

interface OrderStatusHistory {
  id: string;
  status: string;
  comment: string | null;
  created_at: string;
  created_by: string | null;
  is_internal: boolean;
}

interface OrderData {
  id: string;
  created_at: string;
  status: string | null;
  total_amount: number;
  items: any;
  user_id: string | null;
}

export const OrderDetailModal = ({ orderId, isOpen, onClose }: OrderDetailModalProps) => {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [statusHistory, setStatusHistory] = useState<OrderStatusHistory[]>([]);
  const [newStatus, setNewStatus] = useState("");
  const [newComment, setNewComment] = useState("");
  const [isInternal, setIsInternal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const statusOptions = [
    'pending', 'confirmed', 'preparing', 'baking', 'decorating', 
    'quality_check', 'packaging', 'ready_for_pickup', 'cancelled'
  ];

  useEffect(() => {
    if (orderId && isOpen) {
      fetchOrderDetails();
    }
  }, [orderId, isOpen]);

  const fetchOrderDetails = async () => {
    if (!orderId) return;

    try {
      setLoading(true);
      
      // Fetch order details
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (orderError) throw orderError;
      setOrder(orderData);

      // Fetch status history
      const { data: historyData, error: historyError } = await supabase
        .from('order_status_history')
        .select('*')
        .eq('order_id', orderId)
        .order('created_at', { ascending: false });

      if (historyError) throw historyError;
      setStatusHistory(historyData || []);

    } catch (error) {
      console.error('Error fetching order details:', error);
      toast({ title: "Failed to load order details", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const sendPickupReadyEmail = async (orderId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-pickup-notification', {
        body: { orderId }
      });

      if (error) throw error;
      
      toast({ title: "Pickup notification email sent to customer" });
    } catch (error) {
      console.error('Error sending pickup email:', error);
      toast({ 
        title: "Failed to send pickup notification", 
        description: "Status updated but email notification failed",
        variant: "destructive" 
      });
    }
  };

  const addStatusUpdate = async () => {
    if (!orderId || !newStatus || !newComment.trim()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    try {
      // Add status history entry
      const { error: historyError } = await supabase
        .from('order_status_history')
        .insert({
          order_id: orderId,
          status: newStatus,
          comment: newComment,
          is_internal: isInternal
        });

      if (historyError) throw historyError;

      // Update order status
      const { error: orderError } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (orderError) throw orderError;

      // Send email notification if status is ready_for_pickup
      if (newStatus === 'ready_for_pickup') {
        await sendPickupReadyEmail(orderId);
      }

      toast({ title: "Status updated successfully" });
      setNewStatus("");
      setNewComment("");
      setIsInternal(false);
      fetchOrderDetails();

    } catch (error) {
      console.error('Error updating status:', error);
      toast({ title: "Failed to update status", variant: "destructive" });
    }
  };

  const exportOrderData = () => {
    if (!order || !statusHistory) return;

    const exportData = {
      order: order,
      statusHistory: statusHistory,
      exportedAt: new Date().toISOString(),
      exportedBy: 'admin@moftabo.com'
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `order_${orderId}_export.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-blue-100 text-blue-800',
      'preparing': 'bg-orange-100 text-orange-800',
      'baking': 'bg-orange-100 text-orange-800',
      'decorating': 'bg-purple-100 text-purple-800',
      'quality_check': 'bg-indigo-100 text-indigo-800',
      'packaging': 'bg-cyan-100 text-cyan-800',
      'ready_for_pickup': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center py-8">
            <p>Loading order details...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Order Details - {orderId?.substring(0, 8)}...</span>
            <Button onClick={exportOrderData} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </DialogTitle>
        </DialogHeader>

        {order && (
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-medium">{order.id.substring(0, 8)}...</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="font-medium">${order.total_amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Status</p>
                    <Badge className={getStatusColor(order.status || 'pending')}>
                      {order.status || 'pending'}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Created</p>
                    <p className="font-medium">{formatDate(order.created_at)}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">Items</p>
                  <div className="mt-2 space-y-2">
                    {Array.isArray(order.items) ? order.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span>{item.name || 'Unknown Item'}</span>
                        <span className="font-medium">${item.price || 0} x {item.quantity || 1}</span>
                      </div>
                    )) : (
                      <p className="text-gray-500">No items data available</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Order Journey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {statusHistory.map((entry) => (
                    <div key={entry.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0">
                        <Badge className={getStatusColor(entry.status)}>
                          {entry.status}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="h-4 w-4 text-gray-500" />
                          <p className="text-sm">{entry.comment}</p>
                          {entry.is_internal && (
                            <Badge variant="outline" className="text-xs">Internal</Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{formatDate(entry.created_at)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add Status Update */}
            <Card>
              <CardHeader>
                <CardTitle>Add Status Update</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">New Status</label>
                    <Select value={newStatus} onValueChange={setNewStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status.replace('_', ' ').toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="internal"
                      checked={isInternal}
                      onChange={(e) => setIsInternal(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="internal" className="text-sm">Internal note (not visible to customer)</label>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Comment</label>
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment about this status update..."
                    rows={3}
                  />
                </div>
                <Button onClick={addStatusUpdate} className="w-full">
                  Add Status Update
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
