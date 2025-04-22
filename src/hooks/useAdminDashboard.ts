
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
  const [loading, setLoading] = useState(true);

  const checkAdminAccess = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({ title: "Please sign in as admin to access this page", variant: "destructive" });
        navigate("/signin");
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
        previous ? (((current - previous) / previous) * 100).toFixed(1) : "0.0";
      
      setStats({
        totalSales: latestData.sales,
        totalVisits: latestData.visits,
        totalQuestions: Math.floor(latestData.visits * 0.08),
        salesGrowth: parseFloat(calculateGrowth(latestData.sales, previousData.sales)),
        visitsGrowth: parseFloat(calculateGrowth(latestData.visits, previousData.visits)),
        questionsGrowth: parseFloat(calculateGrowth(
          Math.floor(latestData.visits * 0.08), 
          Math.floor(previousData.visits * 0.08)
        )),
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({ title: "Failed to load dashboard data", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAdminAccess().then(hasAccess => {
      if (hasAccess) {
        fetchDashboardData();
      }
    });

    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  return { chartData, stats, loading };
};
