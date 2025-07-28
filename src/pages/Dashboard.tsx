import { Header } from '@/components/layout/Header';
import { MetricCard } from '@/components/widgets/MetricCard';
import { WorkingFormatChart } from '@/components/widgets/WorkingFormatChart';
import { ProjectEmploymentChart } from '@/components/widgets/ProjectEmploymentChart';
import { StaffTurnoverChart } from '@/components/widgets/StaffTurnoverChart';
import { ApplicationsProgress } from '@/components/widgets/ApplicationsProgress';
import { RecruitmentTable } from '@/components/widgets/RecruitmentTable';
import { BirthdaysSection } from '@/components/widgets/BirthdaysSection';
import { HolidaysSection } from '@/components/widgets/HolidaysSection';
import { Users, UserPlus, TrendingUp, Heart } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="p-6">
        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
          <MetricCard
            title="New Employees"
            value="23"
            icon={TrendingUp}
            change="+8% from last month"
            changeType="positive"
          />
          <MetricCard
            title="Happiness Rate"
            value="94%"
            icon={Heart}
            change="+2% from last month"
            changeType="positive"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
          <WorkingFormatChart />
          <ProjectEmploymentChart />
          <StaffTurnoverChart />
        </div>

        {/* Applications and Recruitment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ApplicationsProgress />
          <RecruitmentTable />
        </div>

        {/* Birthdays and Holidays */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BirthdaysSection />
          <HolidaysSection />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;