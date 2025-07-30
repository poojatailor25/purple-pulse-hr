import { useLocation } from 'react-router-dom';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { MetricCard } from '@/components/widgets/MetricCard';
import { ClockInOutCard } from '@/components/widgets/ClockInOutCard';
import { BirthdayCarousel } from '@/components/widgets/BirthdayCarousel';
import { HolidaysSection } from '@/components/widgets/HolidaysSection';
import { AttendanceOverview } from '@/components/widgets/AttendanceOverview';
import { PrivilegesSickLeave } from '@/components/widgets/PrivilegesSickLeave';
import { MyProjects } from '@/components/widgets/MyProjects';
import { MonthlyWorkingHours } from '@/components/widgets/MonthlyWorkingHours';
import { Users, UserPlus } from 'lucide-react';

const Dashboard = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname;
    switch (path) {
      case '/dashboard':
        return 'Dashboard';
      case '/employees':
        return 'Employees';
      case '/calendar':
        return 'Calendar';
      case '/attendance':
        return 'Attendance';
      case '/reports':
        return 'Reports';
      case '/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header with page title */}
          <header className="h-16 flex items-center justify-between border-b border-border bg-card px-6">
            <h1 className="text-2xl font-semibold text-foreground">{getPageTitle()}</h1>
          </header>
          
          <main className="flex-1 p-6 overflow-auto">
            {/* Metrics Row - Including Clock In/Out and Monthly Hours */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <ClockInOutCard />
              <MonthlyWorkingHours />
              <MetricCard
                title="Total Employees"
                value="1,234"
                icon={Users}
                change="+12% from last month"
                changeType="positive"
              />
              <MetricCard
                title="Number of Leaves"
                value="45"
                icon={UserPlus}
                change="+5% from last month"
                changeType="positive"
              />
            </div>

            {/* Birthdays and Holidays */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <BirthdayCarousel />
              <HolidaysSection />
            </div>

            {/* Attendance and Privileges */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <AttendanceOverview />
              <PrivilegesSickLeave />
            </div>

            {/* My Projects */}
            <MyProjects />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;