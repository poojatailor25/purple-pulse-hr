import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar } from 'lucide-react';

export const PrivilegesSickLeave = () => {
  const privilegesData = {
    taken: 13,
    total: 16,
    percentage: (13 / 16) * 100
  };

  return (
    <Card className="bg-widget-bg border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Privileges and Sick Leave
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground mb-2">
            {privilegesData.taken}/{privilegesData.total}
          </div>
          <p className="text-muted-foreground text-sm">
            {privilegesData.taken} taken out of {privilegesData.total}
          </p>
        </div>
        <Progress 
          value={privilegesData.percentage} 
          className="h-3"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Used: {privilegesData.taken} days</span>
          <span>Remaining: {privilegesData.total - privilegesData.taken} days</span>
        </div>
      </CardContent>
    </Card>
  );
};