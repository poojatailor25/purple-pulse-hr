import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock } from 'lucide-react';

export const MonthlyWorkingHours = () => {
  const workingHoursData = {
    current: 152,
    target: 180,
    percentage: (152 / 180) * 100
  };

  return (
    <Card className="bg-widget-bg border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-foreground flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-primary" />
          Monthly Working Hours
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">
            {workingHoursData.current}h
          </div>
          <p className="text-xs text-muted-foreground">
            of {workingHoursData.target}h target
          </p>
        </div>
        <Progress 
          value={workingHoursData.percentage} 
          className="h-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{Math.round(workingHoursData.percentage)}% complete</span>
          <span>{workingHoursData.target - workingHoursData.current}h remaining</span>
        </div>
      </CardContent>
    </Card>
  );
};