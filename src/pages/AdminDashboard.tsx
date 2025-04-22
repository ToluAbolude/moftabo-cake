
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, Tooltip } from "recharts";
import { MessageSquare, Users, ChartBarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Supabase client
const supabase = (window as any).supabase;

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

const AdminDashboard = () => {
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

  useEffect(() => {
    async function checkAdminAccess() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          toast({ title: "Please sign in as admin to access this page", variant: "destructive" });
          navigate("/signin");
          return;
        }
        
        // Here you would check if the user has admin role
        // For demonstration, we'll continue loading the data
        fetchDashboardData();
      } catch (error) {
        console.error("Error checking admin access:", error);
        toast({ title: "Authentication error", variant: "destructive" });
        navigate("/signin");
      }
    }

    checkAdminAccess();
  }, [navigate, toast]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // For real implementation, replace this with actual Supabase queries
      // Example:
      // const { data: salesData, error: salesError } = await supabase
      //   .from('sales')
      //   .select('*')
      //   .order('date', { ascending: true });

      // Simulate fetching data with setTimeout
      setTimeout(() => {
        // Sample real-time data (in a real app, this would come from Supabase)
        const currentDate = new Date();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
        // Generate last 6 months of data
        const generatedData = Array(6).fill(0).map((_, i) => {
          const month = new Date(currentDate);
          month.setMonth(currentDate.getMonth() - (5 - i));
          const monthName = monthNames[month.getMonth()];
          
          // Generate somewhat random but gradually increasing values
          const baseSales = 1500 + (i * 500) + Math.floor(Math.random() * 1000);
          const baseVisits = 1000 + (i * 300) + Math.floor(Math.random() * 800);
          
          return {
            date: monthName,
            sales: baseSales,
            visits: baseVisits
          };
        });
        
        setChartData(generatedData);
        
        // Calculate summary stats
        const latestData = generatedData[generatedData.length - 1];
        const previousData = generatedData[generatedData.length - 2];
        
        const calculateGrowth = (current: number, previous: number) => 
          previous ? (((current - previous) / previous) * 100).toFixed(1) : "0.0";
        
        setStats({
          totalSales: latestData.sales,
          totalVisits: latestData.visits,
          totalQuestions: Math.floor(latestData.visits * 0.08), // Assume 8% of visitors ask questions
          salesGrowth: parseFloat(calculateGrowth(latestData.sales, previousData.sales)),
          visitsGrowth: parseFloat(calculateGrowth(latestData.visits, previousData.visits)),
          questionsGrowth: parseFloat(calculateGrowth(
            Math.floor(latestData.visits * 0.08), 
            Math.floor(previousData.visits * 0.08)
          )),
        });
        
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({ title: "Failed to load dashboard data", variant: "destructive" });
      setLoading(false);
    }
  };

  // Set up real-time subscription (in a real app)
  useEffect(() => {
    // In a real application with Supabase, you would set up a subscription like this:
    /*
    const subscription = supabase
      .channel('public:sales')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'sales' }, fetchDashboardData)
      .subscribe();
    
    return () => {
      supabase.removeChannel(subscription);
    };
    */
    
    // For demo purposes, refresh every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

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
        {/* Sales Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <ChartBarIcon className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalSales.toLocaleString()}</div>
            <p className={`text-xs ${stats.salesGrowth > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stats.salesGrowth > 0 ? '+' : ''}{stats.salesGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        {/* Visitors Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Page Visits</CardTitle>
            <Users className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVisits.toLocaleString()}</div>
            <p className={`text-xs ${stats.visitsGrowth > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stats.visitsGrowth > 0 ? '+' : ''}{stats.visitsGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        {/* Customer Questions Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Customer Questions</CardTitle>
            <MessageSquare className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalQuestions}</div>
            <p className={`text-xs ${stats.questionsGrowth > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stats.questionsGrowth > 0 ? '+' : ''}{stats.questionsGrowth}% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Analytics Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[300px]" config={{
            sales: { color: "#2563eb" },
            visits: { color: "#e11d48" }
          }}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="sales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="visits" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#e11d48" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#e11d48" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="sales" stroke="#2563eb" fillOpacity={1} fill="url(#sales)" />
              <Area type="monotone" dataKey="visits" stroke="#e11d48" fillOpacity={1} fill="url(#visits)" />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
