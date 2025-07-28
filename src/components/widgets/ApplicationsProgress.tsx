import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const applicationData = [
  { status: 'Applications', percentage: 58, color: 'bg-primary' },
  { status: 'Shortlisted', percentage: 22, color: 'bg-info' },
  { status: 'On Hold', percentage: 12, color: 'bg-warning' },
  { status: 'Rejected', percentage: 8, color: 'bg-destructive' },
];

export const ApplicationsProgress = () => {
  return (
    <Card className="bg-widget-bg border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Total Applications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {applicationData.map((item) => (
          <div key={item.status} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground">{item.status}</span>
              <span className="text-muted-foreground">{item.percentage}%</span>
            </div>
            <Progress value={item.percentage} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};