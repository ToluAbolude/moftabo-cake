
import { useEffect } from "react";
import { useAdminAuth } from "./admin/useAdminAuth";
import { useDashboardData } from "./admin/useDashboardData";
import { useDataExport } from "./admin/useDataExport";

export const useAdminDashboard = () => {
  const { checkAdminAccess } = useAdminAuth();
  const { 
    chartData, 
    stats, 
    recentOrders, 
    loading, 
    fetchDashboardData 
  } = useDashboardData();
  
  const {
    exportOrdersData,
    exportToSpreadsheet,
    exportToPDFReport
  } = useDataExport(recentOrders, stats, chartData);

  useEffect(() => {
    checkAdminAccess().then(hasAccess => {
      if (hasAccess) {
        fetchDashboardData();
      }
    });

    const interval = setInterval(fetchDashboardData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  return { 
    chartData, 
    stats, 
    recentOrders, 
    loading, 
    exportOrdersData,
    exportToSpreadsheet,
    exportToPDFReport,
    refreshData: fetchDashboardData
  };
};
