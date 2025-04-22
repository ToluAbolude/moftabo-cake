
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  growthRate: number;
  Icon: LucideIcon;
}

export const StatsCard = ({ title, value, growthRate, Icon }: StatsCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${growthRate > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {growthRate > 0 ? '+' : ''}{growthRate}% from last month
        </p>
      </CardContent>
    </Card>
  );
};
