
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

export const useMockDataGenerator = () => {
  const generateMockChartData = (): DashboardData[] => {
    const currentDate = new Date();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    return Array(6).fill(0).map((_, i) => {
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
  };

  const generateMockStats = (chartData: DashboardData[]): StatsSummary => {
    const latestData = chartData[chartData.length - 1];
    const previousData = chartData[chartData.length - 2];
    
    const calculateGrowth = (current: number, previous: number) => 
      previous ? (((current - previous) / previous) * 100) : 0;
    
    return {
      totalSales: latestData.sales,
      totalVisits: latestData.visits,
      totalQuestions: Math.floor(latestData.visits * 0.08),
      salesGrowth: calculateGrowth(latestData.sales, previousData.sales),
      visitsGrowth: calculateGrowth(latestData.visits, previousData.visits),
      questionsGrowth: calculateGrowth(
        Math.floor(latestData.visits * 0.08), 
        Math.floor(previousData.visits * 0.08)
      ),
    };
  };

  const generateMockOrders = (): OrderData[] => {
    return Array(10).fill(0).map((_, i) => {
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
  };

  return {
    generateMockChartData,
    generateMockStats,
    generateMockOrders
  };
};
