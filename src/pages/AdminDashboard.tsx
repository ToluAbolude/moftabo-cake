
import { MessageSquare, Users, ChartBarIcon } from "lucide-react";
import { StatsCard } from "@/components/admin/StatsCard";
import { AnalyticsChart } from "@/components/admin/AnalyticsChart";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";

const AdminDashboard = () => {
  const { chartData, stats, loading } = useAdminDashboard();

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6 flex items-center justify-center min-h-[60vh]">
        <p className="text-lg text-gray-600">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Sales"
          value={`$${stats.totalSales.toLocaleString()}`}
          growthRate={stats.salesGrowth}
          Icon={ChartBarIcon}
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
    </div>
  );
};

export default AdminDashboard;
