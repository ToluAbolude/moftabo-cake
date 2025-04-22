
import { MessageSquare, Users, BarChart } from "lucide-react";
import { StatsCard } from "@/components/admin/StatsCard";
import { AnalyticsChart } from "@/components/admin/AnalyticsChart";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const AdminDashboard = () => {
  const { chartData, stats, recentOrders, loading } = useAdminDashboard();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'customers'>('overview');

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6 flex items-center justify-center min-h-[60vh]">
        <p className="text-lg text-gray-600">Loading dashboard data...</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex space-x-2">
          <Button 
            variant={activeTab === 'overview' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </Button>
          <Button 
            variant={activeTab === 'orders' ? 'default' : 'outline'}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </Button>
          <Button 
            variant={activeTab === 'customers' ? 'default' : 'outline'}
            onClick={() => setActiveTab('customers')}
          >
            Customers
          </Button>
        </div>
      </div>
      
      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
              title="Total Sales"
              value={`$${stats.totalSales.toLocaleString()}`}
              growthRate={stats.salesGrowth}
              Icon={BarChart}
            />
            <StatsCard
              title="Page Visits"
              value={stats.totalVisits.toLocaleString()}
              growthRate={stats.visitsGrowth}
              Icon={Users}
            />
            <StatsCard
              title="Customer Questions"
              value={stats.totalQuestions}
              growthRate={stats.questionsGrowth}
              Icon={MessageSquare}
            />
          </div>

          <AnalyticsChart data={chartData} />
        </>
      )}

      {activeTab === 'orders' && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
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
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id.substring(0, 8)}...</TableCell>
                    <TableCell>{formatDate(order.created_at)}</TableCell>
                    <TableCell>{order.email || 'Anonymous'}</TableCell>
                    <TableCell>${order.total_amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status || '')}`}>
                        {order.status || 'pending'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === 'customers' && (
        <Card>
          <CardHeader>
            <CardTitle>Customer Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center py-8 text-gray-500">Customer management features coming soon!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminDashboard;
