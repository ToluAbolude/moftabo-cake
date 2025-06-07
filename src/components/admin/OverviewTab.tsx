
import { BarChart, Users, MessageSquare } from "lucide-react";
import { StatsCard } from "./StatsCard";
import { AnalyticsChart } from "./AnalyticsChart";
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

interface StatsSummary {
  totalSales: number;
  totalVisits: number;
  totalQuestions: number;
  salesGrowth: number;
  visitsGrowth: number;
  questionsGrowth: number;
}

interface DashboardData {
  date: string;
  sales: number;
  visits: number;
}

interface OverviewTabProps {
  stats: StatsSummary;
  chartData: DashboardData[];
  recentOrders: OrderData[];
  onOrderClick: (orderId: string) => void;
}

export const OverviewTab = ({ stats, chartData, recentOrders, onOrderClick }: OverviewTabProps) => {
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
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Sales"
          value={`£${stats.totalSales.toLocaleString()}`}
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
                  <TableCell>£{order.total_amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status || '')}`}>
                      {order.status || 'pending'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onOrderClick(order.id)}
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
  );
};
