import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Users } from 'lucide-react';
import attendanceData from '@/data/attendance.json';

const COLORS = {
  present: 'hsl(var(--success))',
  late: 'hsl(var(--warning))', 
  permission: 'hsl(var(--info))',
  absent: 'hsl(var(--destructive))'
};

export const AttendanceOverview = () => {
  const data = [
    { name: 'Present', value: attendanceData.present, color: COLORS.present },
    { name: 'Late', value: attendanceData.late, color: COLORS.late },
    { name: 'Permission', value: attendanceData.permission, color: COLORS.permission },
    { name: 'Absent', value: attendanceData.absent, color: COLORS.absent },
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="bg-widget-bg border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Attendance Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6">
          {/* Chart Section */}
          <div className="relative">
            <ResponsiveContainer width={200} height={200}>
              <PieChart>
                <Pie
                  data={data}
                  cx={100}
                  cy={100}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{attendanceData.total}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>
          </div>

          {/* Legend and Stats */}
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {data.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-foreground">{item.name}</span>
                  <span className="text-sm font-medium text-muted-foreground ml-auto">
                    {Math.round((item.value / attendanceData.total) * 100)}%
                  </span>
                </div>
              ))}
            </div>

            {/* Absentees */}
            <div className="pt-4 border-t border-border">
              <p className="text-sm font-medium text-foreground mb-3">Today's Absentees</p>
              <div className="flex items-center gap-2 mb-3">
                {attendanceData.absentees.slice(0, 5).map((person, index) => (
                  <Avatar key={index} className="h-8 w-8">
                    <AvatarImage 
                      src={`https://images.unsplash.com/${person.image}?w=32&h=32&fit=crop&crop=face`} 
                      alt={person.name} 
                    />
                    <AvatarFallback className="bg-destructive/20 text-destructive text-xs">
                      {getInitials(person.name)}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {attendanceData.absentees.length > 5 && (
                  <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">
                      +{attendanceData.absentees.length - 5}
                    </span>
                  </div>
                )}
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};