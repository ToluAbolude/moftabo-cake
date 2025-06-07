
import { useToast } from "@/hooks/use-toast";
import { exportToCSV, exportToPDF } from "@/utils/exportUtils";

interface DashboardData {
  date: string;
  sales: number;
  visits: number;
}

interface StatsSummary {
  totalSales: number;
  totalVisits: number;
  totalQuestions: number;
  salesGrowth: number;
  visitsGrowth: number;
  questionsGrowth: number;
}

interface OrderData {
  id: string;
  created_at: string;
  status: string | null;
  total_amount: number;
  user_id: string | null;
  items: any;
}

export const useDataExport = (
  recentOrders: OrderData[],
  stats: StatsSummary,
  chartData: DashboardData[]
) => {
  const { toast } = useToast();

  const exportOrdersData = () => {
    const exportData = {
      orders: recentOrders,
      stats: stats,
      chartData: chartData,
      exportedAt: new Date().toISOString(),
      exportedBy: 'admin@moftabo.com'
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `orders_export_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const exportToSpreadsheet = () => {
    exportToCSV(recentOrders, stats, chartData);
    toast({ title: "CSV file downloaded successfully" });
  };

  const exportToPDFReport = () => {
    exportToPDF(recentOrders, stats, chartData);
    toast({ title: "PDF report generated successfully" });
  };

  return {
    exportOrdersData,
    exportToSpreadsheet,
    exportToPDFReport
  };
};
