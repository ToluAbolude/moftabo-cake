
import { useEffect } from "react";
import { useAdminAuth } from "./admin/useAdminAuth";
import { useDashboardData } from "./admin/useDashboardData";
import { useDataExport } from "./admin/useDataExport";

export const useAdminDashboard = () => {
  const { checkAdminAccess, logAdminAction } = useAdminAuth();
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

    // Refresh every 5 minutes instead of every minute for better performance
    const interval = setInterval(() => {
      checkAdminAccess().then(hasAccess => {
        if (hasAccess) {
          fetchDashboardData();
        }
      });
    }, 300000); // 5 minutes

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
    refreshData: fetchDashboardData,
    logAdminAction
  };
};
