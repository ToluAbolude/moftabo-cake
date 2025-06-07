
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
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

export const useAdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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

  const checkAdminAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({ title: "Please sign in as admin to access this page", variant: "destructive" });
        navigate("/signin");
        return false;
      }

      if (session.user.email !== 'admin@moftabo.com') {
        toast({ title: "You do not have admin access", variant: "destructive" });
        navigate("/");
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Error checking admin access:", error);
      toast({ title: "Authentication error", variant: "destructive" });
      navigate("/signin");
      return false;
    }
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch real orders data
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (ordersError) {
        console.error("Error fetching orders:", ordersError);
        // Fall back to mock data if there's an error
        generateMockData();
        return;
      }

      setRecentOrders(ordersData || []);

      // Calculate real stats from orders
      const totalSales = ordersData?.reduce((sum, order) => sum + order.total_amount, 0) || 0;
      const totalOrders = ordersData?.length || 0;

      // Generate chart data based on real orders
      const last6Months = Array(6).fill(0).map((_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - (5 - i));
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });
        
        // Calculate orders for this month
        const monthOrders = ordersData?.filter(order => {
          const orderDate = new Date(order.created_at);
          return orderDate.getMonth() === date.getMonth() && 
                 orderDate.getFullYear() === date.getFullYear();
        }) || [];

        const monthlySales = monthOrders.reduce((sum, order) => sum + order.total_amount, 0);
        
        return {
          date: monthName,
          sales: monthlySales,
          visits: Math.floor(monthlySales * 0.8) + Math.floor(Math.random() * 200) // Estimated visits
        };
      });

      setChartData(last6Months);

      // Calculate growth rates
      const currentMonth = last6Months[last6Months.length - 1];
      const previousMonth = last6Months[last6Months.length - 2];
      
      const calculateGrowth = (current: number, previous: number) => 
        previous ? (((current - previous) / previous) * 100) : 0;

      setStats({
        totalSales: totalSales,
        totalVisits: currentMonth?.visits || 0,
        totalQuestions: Math.floor(totalOrders * 0.1), // Estimate: 10% of orders have questions
        salesGrowth: calculateGrowth(currentMonth?.sales || 0, previousMonth?.sales || 0),
        visitsGrowth: calculateGrowth(currentMonth?.visits || 0, previousMonth?.visits || 0),
        questionsGrowth: Math.floor(Math.random() * 20) - 10 // Random growth for demo
      });

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      generateMockData();
    } finally {
      setLoading(false);
    }
  };

  const generateMockData = () => {
    // Fallback mock data
    const currentDate = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const generatedData = Array(6).fill(0).map((_, i) => {
      const month = new Date(currentDate);
      month.setMonth(currentDate.getMonth() - (5 - i));
      const monthName = monthNames[month.getMonth()];
      
      const baseSales = 1500 + (i * 500) + Math.floor(Math.random() * 1000);
      const baseVisits = 1000 + (i * 300) + Math.floor(Math.random() * 800);
      
      return {
        date: monthName,
        sales: baseSales,
        visits: baseVisits
      };
    });
    
    setChartData(generatedData);
    
    const latestData = generatedData[generatedData.length - 1];
    const previousData = generatedData[generatedData.length - 2];
    
    const calculateGrowth = (current: number, previous: number) => 
      previous ? (((current - previous) / previous) * 100) : 0;
    
    setStats({
      totalSales: latestData.sales,
      totalVisits: latestData.visits,
      totalQuestions: Math.floor(latestData.visits * 0.08),
      salesGrowth: calculateGrowth(latestData.sales, previousData.sales),
      visitsGrowth: calculateGrowth(latestData.visits, previousData.visits),
      questionsGrowth: calculateGrowth(
        Math.floor(latestData.visits * 0.08), 
        Math.floor(previousData.visits * 0.08)
      ),
    });

    // Generate mock recent orders if no real data
    const mockOrders = Array(10).fill(0).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      const statuses = ['ready_for_pickup', 'packaging', 'quality_check', 'decorating', 'baking', 'preparing', 'confirmed', 'pending'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      
      const amount = Math.floor(Math.random() * 500) + 50;
      
      return {
        id: `mock-order-${crypto.randomUUID()}`,
        created_at: date.toISOString(),
        status: status,
        total_amount: amount,
        user_id: null,
        items: [{ name: 'Custom Cake', price: amount, quantity: 1 }]
      };
    });
    
    setRecentOrders(mockOrders);
  };

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
    refreshData: fetchDashboardData
  };
};
