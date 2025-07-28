import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Cake } from 'lucide-react';
import birthdays from '@/data/birthdays.json';

export const BirthdaysSection = () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  
  const currentMonthBirthdays = birthdays.filter(birthday => {
    const birthdayDate = new Date(birthday.date);
    return birthdayDate.getMonth() + 1 === currentMonth && 
           birthdayDate.getFullYear() === currentYear;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card className="bg-widget-bg border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Cake className="h-5 w-5 text-primary" />
          Upcoming Birthdays
        </CardTitle>
      </CardHeader>
      <CardContent>
        {currentMonthBirthdays.length === 0 ? (
          <div className="text-center py-8">
            <Cake className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">🎂 No birthdays this month</p>
          </div>
        ) : (
          <div className="space-y-3">
            {currentMonthBirthdays.map((birthday, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-card rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">{birthday.name}</p>
                    <p className="text-sm text-muted-foreground">{formatDate(birthday.date)}</p>
                  </div>
                </div>
                <Cake className="h-5 w-5 text-primary" />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};