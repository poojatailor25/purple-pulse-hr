import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Clock } from 'lucide-react';
import attendanceData from '@/data/attendance.json';

export const AttendanceFilterView = () => {
  const dailyData = [
    {
      category: 'Today',
      onTime: attendanceData.daily.onTime,
      late: attendanceData.daily.late,
      wfh: attendanceData.daily.wfh,
      absent: attendanceData.daily.absent,
    }
  ];

  return (
    <Card className="bg-widget-bg border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Attendance Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="mt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="category" 
                  stroke="hsl(var(--foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Legend />
                <Bar dataKey="onTime" stackId="a" fill="hsl(var(--success))" name="On Time" />
                <Bar dataKey="late" stackId="a" fill="hsl(var(--warning))" name="Late" />
                <Bar dataKey="wfh" stackId="a" fill="hsl(var(--info))" name="Work from Home" />
                <Bar dataKey="absent" stackId="a" fill="hsl(var(--destructive))" name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="weekly" className="mt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData.weekly}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Legend />
                <Bar dataKey="onTime" stackId="a" fill="hsl(var(--success))" name="On Time" />
                <Bar dataKey="late" stackId="a" fill="hsl(var(--warning))" name="Late" />
                <Bar dataKey="wfh" stackId="a" fill="hsl(var(--info))" name="Work from Home" />
                <Bar dataKey="absent" stackId="a" fill="hsl(var(--destructive))" name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="monthly" className="mt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData.monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="week" 
                  stroke="hsl(var(--foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--foreground))" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--popover))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '6px'
                  }}
                />
                <Legend />
                <Bar dataKey="onTime" stackId="a" fill="hsl(var(--success))" name="On Time" />
                <Bar dataKey="late" stackId="a" fill="hsl(var(--warning))" name="Late" />
                <Bar dataKey="wfh" stackId="a" fill="hsl(var(--info))" name="Work from Home" />
                <Bar dataKey="absent" stackId="a" fill="hsl(var(--destructive))" name="Absent" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};