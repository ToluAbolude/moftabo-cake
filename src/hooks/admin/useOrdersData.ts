
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

export const useOrdersData = () => {
  const fetchOrders = async (): Promise<OrderData[]> => {
    const { data: ordersData, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    if (ordersError) {
      console.error("Error fetching orders:", ordersError);
      throw ordersError;
    }

    return ordersData || [];
  };

  const generateChartDataFromOrders = (ordersData: OrderData[]): DashboardData[] => {
    return Array(6).fill(0).map((_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (5 - i));
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      
      const monthOrders = ordersData.filter(order => {
        const orderDate = new Date(order.created_at);
        return orderDate.getMonth() === date.getMonth() && 
               orderDate.getFullYear() === date.getFullYear();
      });

      const monthlySales = monthOrders.reduce((sum, order) => sum + order.total_amount, 0);
      
      return {
        date: monthName,
        sales: monthlySales,
        visits: Math.floor(monthlySales * 0.8) + Math.floor(Math.random() * 200)
      };
    });
  };

  const calculateStatsFromOrders = (ordersData: OrderData[], chartData: DashboardData[]): StatsSummary => {
    const totalSales = ordersData.reduce((sum, order) => sum + order.total_amount, 0);
    const totalOrders = ordersData.length;
    
    const currentMonth = chartData[chartData.length - 1];
    const previousMonth = chartData[chartData.length - 2];
    
    const calculateGrowth = (current: number, previous: number) => 
      previous ? (((current - previous) / previous) * 100) : 0;

    return {
      totalSales: totalSales,
      totalVisits: currentMonth?.visits || 0,
      totalQuestions: Math.floor(totalOrders * 0.1),
      salesGrowth: calculateGrowth(currentMonth?.sales || 0, previousMonth?.sales || 0),
      visitsGrowth: calculateGrowth(currentMonth?.visits || 0, previousMonth?.visits || 0),
      questionsGrowth: Math.floor(Math.random() * 20) - 10
    };
  };

  return {
    fetchOrders,
    generateChartDataFromOrders,
    calculateStatsFromOrders
  };
};
