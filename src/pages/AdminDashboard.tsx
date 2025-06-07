import { MessageSquare, Users, BarChart, Download, RefreshCw, FileSpreadsheet, FileText } from "lucide-react";
import { StatsCard } from "@/components/admin/StatsCard";
import { AnalyticsChart } from "@/components/admin/AnalyticsChart";
import { OrderDetailModal } from "@/components/admin/OrderDetailModal";
import { ComplaintManagement } from "@/components/admin/ComplaintManagement";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";

const AdminDashboard = () => {
  const { 
    chartData, 
    stats, 
    recentOrders, 
    loading, 
    exportOrdersData, 
    exportToSpreadsheet, 
    exportToPDFReport, 
    refreshData 
  } = useAdminDashboard();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'complaints'>('overview');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleOrderClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
    setSelectedOrderId(null);
    refreshData(); // Refresh data when modal closes to show any updates
  };

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
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={refreshData}
            size="sm"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={exportToSpreadsheet}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export as CSV (Spreadsheet)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportToPDFReport}>
                <FileText className="h-4 w-4 mr-2" />
                Export as PDF Report
              </DropdownMenuItem>
              <DropdownMenuItem onClick={exportOrdersData}>
                <Download className="h-4 w-4 mr-2" />
                Export as JSON (Raw Data)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
            variant={activeTab === 'complaints' ? 'default' : 'outline'}
            onClick={() => setActiveTab('complaints')}
          >
            Complaints
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

          {/* Recent Orders Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders (Preview)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.slice(0, 5).map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id.substring(0, 8)}...</TableCell>
                      <TableCell>{formatDate(order.created_at)}</TableCell>
                      <TableCell>${order.total_amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status || '')}`}>
                          {order.status || 'pending'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleOrderClick(order.id)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      )}

      {activeTab === 'orders' && (
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
                    <TableCell>${order.total_amount.toLocaleString()}</TableCell>
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
                        onClick={() => handleOrderClick(order.id)}
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
      )}

      {activeTab === 'complaints' && <ComplaintManagement />}

      {/* Order Detail Modal */}
      <OrderDetailModal
        orderId={selectedOrderId}
        isOpen={isOrderModalOpen}
        onClose={closeOrderModal}
      />
    </div>
  );
};

export default AdminDashboard;
