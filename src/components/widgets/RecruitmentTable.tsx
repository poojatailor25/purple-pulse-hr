import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const recruitmentData = [
  { name: 'Dom Sibley', department: 'DevOps', type: 'Tech Interview' },
  { name: 'Joe Root', department: 'UX/UI Designer', type: 'Resume Review' },
  { name: 'Zak Crawley', department: '.NET Developer', type: 'Final Interview' },
  { name: 'Ben Stokes', department: 'Frontend Developer', type: 'HR Round' },
  { name: 'Jos Buttler', department: 'Product Manager', type: 'Technical Test' },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Tech Interview':
      return 'bg-primary/20 text-primary';
    case 'Resume Review':
      return 'bg-info/20 text-info';
    case 'Final Interview':
      return 'bg-success/20 text-success';
    case 'HR Round':
      return 'bg-warning/20 text-warning';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export const RecruitmentTable = () => {
  return (
    <Card className="bg-widget-bg border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Recruitment Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-muted-foreground">Full Name</TableHead>
              <TableHead className="text-muted-foreground">Department</TableHead>
              <TableHead className="text-muted-foreground">Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recruitmentData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-foreground font-medium">{item.name}</TableCell>
                <TableCell className="text-muted-foreground">{item.department}</TableCell>
                <TableCell>
                  <Badge className={getTypeColor(item.type)} variant="secondary">
                    {item.type}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};