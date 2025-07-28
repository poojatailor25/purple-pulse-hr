import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', turnover: 5 },
  { month: 'Feb', turnover: 8 },
  { month: 'Mar', turnover: 3 },
  { month: 'Apr', turnover: 12 },
  { month: 'May', turnover: 7 },
  { month: 'Jun', turnover: 15 },
  { month: 'Jul', turnover: 9 },
  { month: 'Aug', turnover: 6 },
  { month: 'Sep', turnover: 11 },
];

export const StaffTurnoverChart = () => {
  return (
    <Card className="bg-widget-bg border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Staff Turnover (Monthly)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis 
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px',
                color: 'hsl(var(--foreground))'
              }} 
            />
            <Bar dataKey="turnover" fill="#8B5CF6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};