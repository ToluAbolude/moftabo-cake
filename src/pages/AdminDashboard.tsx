
import { OrderDetailModal } from "@/components/admin/OrderDetailModal";
import { ComplaintManagement } from "@/components/admin/ComplaintManagement";
import { TabNavigation } from "@/components/admin/TabNavigation";
import { ExportDropdown } from "@/components/admin/ExportDropdown";
import { OverviewTab } from "@/components/admin/OverviewTab";
import { OrdersTab } from "@/components/admin/OrdersTab";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import { useState } from "react";

const AdminDashboard = () => {
  const { 
    chartData, 
    stats, 
    recentOrders, 
    loading, 
    exportOrdersData, 
    exportToSpreadsheet, 
    exportToPDFReport, 
    refreshData 
  } = useAdminDashboard();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'complaints'>('overview');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleOrderClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
    setSelectedOrderId(null);
    refreshData();
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6 flex items-center justify-center min-h-[60vh]">
        <p className="text-lg text-gray-600">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <ExportDropdown
            onRefresh={refreshData}
            onExportSpreadsheet={exportToSpreadsheet}
            onExportPDF={exportToPDFReport}
            onExportJSON={exportOrdersData}
          />
          <TabNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
      </div>
      
      {activeTab === 'overview' && (
        <OverviewTab
          stats={stats}
          chartData={chartData}
          recentOrders={recentOrders}
          onOrderClick={handleOrderClick}
        />
      )}

      {activeTab === 'orders' && (
        <OrdersTab
          recentOrders={recentOrders}
          onOrderClick={handleOrderClick}
        />
      )}

      {activeTab === 'complaints' && <ComplaintManagement />}

      <OrderDetailModal
        orderId={selectedOrderId}
        isOpen={isOrderModalOpen}
        onClose={closeOrderModal}
      />
    </div>
  );
};

export default AdminDashboard;
