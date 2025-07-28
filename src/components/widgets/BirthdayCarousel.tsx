import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Cake } from 'lucide-react';
import birthdays from '@/data/birthdays.json';
import Autoplay from 'embla-carousel-autoplay';

export const BirthdayCarousel = () => {
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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
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
          <Carousel
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent>
              {currentMonthBirthdays.map((birthday, index) => (
                <CarouselItem key={index}>
                  <div className="flex items-center gap-4 p-4 bg-card rounded-lg">
                    <Avatar className="h-16 w-16">
                      <AvatarImage 
                        src={`https://images.unsplash.com/${birthday.image}?w=100&h=100&fit=crop&crop=face`} 
                        alt={birthday.name} 
                      />
                      <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                        {getInitials(birthday.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-foreground font-semibold text-lg">{birthday.name}</p>
                      <p className="text-muted-foreground">{formatDate(birthday.date)}</p>
                    </div>
                    <Cake className="h-8 w-8 text-primary" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {currentMonthBirthdays.length > 1 && (
              <>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </>
            )}
          </Carousel>
        )}
      </CardContent>
    </Card>
  );
};