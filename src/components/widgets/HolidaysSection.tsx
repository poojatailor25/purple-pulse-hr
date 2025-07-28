import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';
import holidays from '@/data/holidays.json';

export const HolidaysSection = () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  
  const currentMonthHolidays = holidays.filter(holiday => {
    const holidayDate = new Date(holiday.date);
    return holidayDate.getMonth() + 1 === currentMonth && 
           holidayDate.getFullYear() === currentYear;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      weekday: 'short'
    });
  };

  return (
    <Card className="bg-widget-bg border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Holidays
        </CardTitle>
      </CardHeader>
      <CardContent>
        {currentMonthHolidays.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">📅 No holidays this month</p>
          </div>
        ) : (
          <div className="space-y-3">
            {currentMonthHolidays.map((holiday, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-card rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">{holiday.title}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(holiday.date)}</p>
                  </div>
                </div>
                <MapPin className="h-5 w-5 text-primary" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};