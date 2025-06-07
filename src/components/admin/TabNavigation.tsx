
import { Button } from "@/components/ui/button";

type Tab = 'overview' | 'orders' | 'complaints';

interface TabNavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="flex space-x-2">
      <Button 
        variant={activeTab === 'overview' ? 'default' : 'outline'} 
        onClick={() => onTabChange('overview')}
      >
        Overview
      </Button>
      <Button 
        variant={activeTab === 'orders' ? 'default' : 'outline'}
        onClick={() => onTabChange('orders')}
      >
        Orders
      </Button>
      <Button 
        variant={activeTab === 'complaints' ? 'default' : 'outline'}
        onClick={() => onTabChange('complaints')}
      >
        Complaints
      </Button>
    </div>
  );
};
