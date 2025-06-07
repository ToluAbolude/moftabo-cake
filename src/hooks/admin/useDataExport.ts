
import { useToast } from "@/hooks/use-toast";
import { exportToCSV, exportToPDF } from "@/utils/exportUtils";
import { supabase } from "@/integrations/supabase/client";

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

  const logExportAction = async (exportType: string, recordCount: number) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      await supabase.from('audit_logs').insert({
        user_id: session.user.id,
        action: 'DATA_EXPORT',
        table_name: 'orders',
        new_data: { 
          export_type: exportType,
          record_count: recordCount,
          exported_at: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error("Failed to log export action:", error);
    }
  };

  const validateAdminAccess = async () => {
    try {
      const { data: isAdminResult, error } = await supabase.rpc('is_admin');
      if (error || !isAdminResult) {
        toast({ title: "Unauthorized: Admin access required", variant: "destructive" });
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error validating admin access:", error);
      toast({ title: "Authentication error", variant: "destructive" });
      return false;
    }
  };

  const exportOrdersData = async () => {
    if (!(await validateAdminAccess())) return;

    try {
      const exportData = {
        orders: recentOrders.map(order => ({
          ...order,
          // Sanitize sensitive data for export
          user_id: order.user_id ? order.user_id.substring(0, 8) + '...' : null,
          items: Array.isArray(order.items) ? order.items.map((item: any) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })) : order.items
        })),
        stats: stats,
        chartData: chartData,
        exportedAt: new Date().toISOString(),
        exportedBy: 'admin'
      };

      const dataStr = JSON.stringify(exportData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `orders_export_${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();

      await logExportAction('JSON', recentOrders.length);
      toast({ title: "Data exported successfully" });
    } catch (error) {
      console.error("Export failed:", error);
      toast({ title: "Export failed", variant: "destructive" });
    }
  };

  const exportToSpreadsheet = async () => {
    if (!(await validateAdminAccess())) return;

    try {
      exportToCSV(recentOrders, stats, chartData);
      await logExportAction('CSV', recentOrders.length);
      toast({ title: "CSV file downloaded successfully" });
    } catch (error) {
      console.error("CSV export failed:", error);
      toast({ title: "CSV export failed", variant: "destructive" });
    }
  };

  const exportToPDFReport = async () => {
    if (!(await validateAdminAccess())) return;

    try {
      exportToPDF(recentOrders, stats, chartData);
      await logExportAction('PDF', recentOrders.length);
      toast({ title: "PDF report generated successfully" });
    } catch (error) {
      console.error("PDF export failed:", error);
      toast({ title: "PDF export failed", variant: "destructive" });
    }
  };

  return {
    exportOrdersData,
    exportToSpreadsheet,
    exportToPDFReport
  };
};
