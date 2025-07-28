import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', project: 65, bench: 25 },
  { day: 'Tue', project: 70, bench: 20 },
  { day: 'Wed', project: 75, bench: 15 },
  { day: 'Thu', project: 80, bench: 10 },
  { day: 'Fri', project: 85, bench: 5 },
  { day: 'Sat', project: 45, bench: 35 },
  { day: 'Sun', project: 30, bench: 50 },
];

export const ProjectEmploymentChart = () => {
  return (
    <Card className="bg-widget-bg border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Project Employment</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="day" 
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
            <Bar dataKey="project" fill="#8B5CF6" name="Project" />
            <Bar dataKey="bench" fill="#A78BFA" name="Bench" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};