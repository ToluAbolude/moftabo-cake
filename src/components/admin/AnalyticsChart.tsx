
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis, Tooltip } from "recharts";

interface DashboardData {
  date: string;
  sales: number;
  visits: number;
}

interface AnalyticsChartProps {
  data: DashboardData[];
}

export const AnalyticsChart = ({ data }: AnalyticsChartProps) => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Analytics Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[300px]" config={{
          sales: { color: "#2563eb" },
          visits: { color: "#e11d48" }
        }}>
          <AreaChart data={data}>
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
  );
};
