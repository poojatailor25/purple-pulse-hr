import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Play, Square } from 'lucide-react';

export const ClockInOutCard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isClocked, setIsClocked] = useState(false);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockAction = () => {
    if (!isClocked) {
      setClockInTime(new Date());
      setIsClocked(true);
    } else {
      setIsClocked(false);
      setClockInTime(null);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Card className="bg-widget-bg border-border">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Current Time</p>
            <p className="text-2xl font-bold text-foreground">{formatTime(currentTime)}</p>
            <p className="text-sm text-muted-foreground">{formatDate(currentTime)}</p>
          </div>
          <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Clock className="h-6 w-6 text-primary" />
          </div>
        </div>

        {clockInTime && (
          <div className="mb-4 p-3 bg-primary/10 rounded-lg">
            <p className="text-sm text-muted-foreground">Clock In Time</p>
            <p className="text-lg font-semibold text-primary">{formatTime(clockInTime)}</p>
          </div>
        )}

        <Button 
          onClick={handleClockAction}
          className={`w-full ${isClocked ? 'bg-destructive hover:bg-destructive/90' : 'bg-success hover:bg-success/90'}`}
        >
          {isClocked ? (
            <>
              <Square className="mr-2 h-4 w-4" />
              Clock Out
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Clock In
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};