
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface OrderData {
  id: string;
  created_at: string;
  status: string | null;
  total_amount: number;
  user_id: string | null;
  items: any;
}

interface OrdersTabProps {
  recentOrders: OrderData[];
  onOrderClick: (orderId: string) => void;
}

export const OrdersTab = ({ recentOrders, onOrderClick }: OrdersTabProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready_for_pickup':
        return 'bg-green-100 text-green-800';
      case 'processing':
      case 'preparing':
      case 'baking':
      case 'decorating':
      case 'quality_check':
      case 'packaging':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
      case 'confirmed':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders - Order Management & Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id.substring(0, 8)}...</TableCell>
                <TableCell>{formatDate(order.created_at)}</TableCell>
                <TableCell>{order.user_id ? order.user_id.substring(0, 8) + '...' : 'Guest'}</TableCell>
                <TableCell>£{order.total_amount.toLocaleString()}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status || '')}`}>
                    {order.status || 'pending'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs truncate">
                    {Array.isArray(order.items) 
                      ? order.items.map((item: any) => item.name || 'Item').join(', ')
                      : 'No items data'
                    }
                  </div>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onOrderClick(order.id)}
                  >
                    Track Order
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
