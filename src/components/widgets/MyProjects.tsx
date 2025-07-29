import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FolderOpen } from 'lucide-react';

const projectsData = [
  {
    name: "Employee Management System",
    owner: "John Doe",
    client: "TechCorp Inc.",
    status: "Ongoing"
  },
  {
    name: "E-commerce Platform",
    owner: "Jane Smith",
    client: "ShopMart Ltd.",
    status: "Completed"
  },
  {
    name: "Mobile Banking App",
    owner: "Mike Johnson",
    client: "FinanceBank",
    status: "On Hold"
  },
  {
    name: "CRM Dashboard",
    owner: "Sarah Wilson",
    client: "SalesPro Corp",
    status: "Ongoing"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Ongoing':
      return 'bg-info text-info-foreground';
    case 'Completed':
      return 'bg-success text-success-foreground';
    case 'On Hold':
      return 'bg-warning text-warning-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export const MyProjects = () => {
  return (
    <Card className="bg-widget-bg border-border">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <FolderOpen className="h-5 w-5 text-primary" />
          My Projects
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {projectsData.map((project, index) => (
            <div key={index} className="p-4 bg-card rounded-lg border border-border">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-foreground text-sm leading-tight">
                    {project.name}
                  </h3>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-muted-foreground">
                    <span className="font-medium">Owner:</span> {project.owner}
                  </p>
                  <p className="text-muted-foreground">
                    <span className="font-medium">Client:</span> {project.client}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};