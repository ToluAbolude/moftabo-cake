
import { useState } from "react";
import { useAdminValidation } from "./useAdminValidation";
import { useMockDataGenerator } from "./useMockDataGenerator";
import { useOrdersData } from "./useOrdersData";

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

export const useDashboardData = () => {
  const [chartData, setChartData] = useState<DashboardData[]>([]);
  const [stats, setStats] = useState<StatsSummary>({
    totalSales: 0,
    totalVisits: 0,
    totalQuestions: 0,
    salesGrowth: 0,
    visitsGrowth: 0,
    questionsGrowth: 0
  });
  const [recentOrders, setRecentOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);

  const { validateAdminAccess, logAuditAccess } = useAdminValidation();
  const { generateMockChartData, generateMockStats, generateMockOrders } = useMockDataGenerator();
  const { fetchOrders, generateChartDataFromOrders, calculateStatsFromOrders } = useOrdersData();

  const generateMockData = () => {
    const generatedChartData = generateMockChartData();
    const generatedStats = generateMockStats(generatedChartData);
    const generatedOrders = generateMockOrders();
    
    setChartData(generatedChartData);
    setStats(generatedStats);
    setRecentOrders(generatedOrders);
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    
    try {
      const hasAdminAccess = await validateAdminAccess();
      if (!hasAdminAccess) {
        console.warn("Unauthorized access attempt to dashboard data");
        generateMockData();
        setLoading(false);
        return;
      }

      try {
        const ordersData = await fetchOrders();
        setRecentOrders(ordersData);

        const chartDataFromOrders = generateChartDataFromOrders(ordersData);
        setChartData(chartDataFromOrders);

        const calculatedStats = calculateStatsFromOrders(ordersData, chartDataFromOrders);
        setStats(calculatedStats);

        await logAuditAccess();
      } catch (error) {
        console.error("Error fetching real data, falling back to mock:", error);
        generateMockData();
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      generateMockData();
    } finally {
      setLoading(false);
    }
  };

  return {
    chartData,
    stats,
    recentOrders,
    loading,
    fetchDashboardData,
    setLoading
  };
};
