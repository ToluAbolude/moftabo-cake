
import { OrderData, StatsSummary, DashboardData } from './types';

export const exportToCSV = (
  orders: OrderData[], 
  stats: StatsSummary, 
  chartData: DashboardData[]
) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Create CSV content
  let csvContent = '';
  
  // Summary Stats Section
  csvContent += 'DASHBOARD SUMMARY\n';
  csvContent += 'Metric,Value,Growth Rate\n';
  csvContent += `Total Sales,$${stats.totalSales.toLocaleString()},${stats.salesGrowth.toFixed(2)}%\n`;
  csvContent += `Total Visits,${stats.totalVisits.toLocaleString()},${stats.visitsGrowth.toFixed(2)}%\n`;
  csvContent += `Total Questions,${stats.totalQuestions},${stats.questionsGrowth.toFixed(2)}%\n`;
  csvContent += '\n';

  // Monthly Data Section
  csvContent += 'MONTHLY DATA\n';
  csvContent += 'Month,Sales,Visits\n';
  chartData.forEach(data => {
    csvContent += `${data.date},$${data.sales},${data.visits}\n`;
  });
  csvContent += '\n';

  // Orders Section
  csvContent += 'ORDERS DETAILS\n';
  csvContent += 'Order ID,Date,Customer,Amount,Status,Items\n';
  orders.forEach(order => {
    const orderItems = Array.isArray(order.items) 
      ? order.items.map((item: any) => `${item.name || 'Item'} (${item.quantity || 1}x)`).join('; ')
      : 'No items data';
    
    csvContent += `${order.id.substring(0, 8)}...,${formatDate(order.created_at)},${order.user_id ? order.user_id.substring(0, 8) + '...' : 'Guest'},$${order.total_amount},${order.status || 'pending'},"${orderItems}"\n`;
  });

  // Create and download CSV file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `moftabo_dashboard_export_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
