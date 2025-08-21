import { ReportsList } from '@/components/reports-list';
import { getReportsByAgency } from '@/lib/reports';
import { Shield, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ViewReportsPage() {
  const ciaaReports = getReportsByAgency('CIAA');
  const policeReports = getReportsByAgency('Police');

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">Browse Reports</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Explore anonymous reports submitted by citizens. Reports are automatically routed to the appropriate agency for action.
        </p>
      </div>

      <Tabs defaultValue="ciaa" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="ciaa">
            <Shield className="mr-2" />
            CIAA Reports
          </TabsTrigger>
          <TabsTrigger value="police">
            <Users className="mr-2" />
            Police Reports
          </TabsTrigger>
        </TabsList>
        <TabsContent value="ciaa" className="mt-8">
            <div className="space-y-4">
                 <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                        <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold font-headline tracking-tight">CIAA Reports</h2>
                        <p className="text-muted-foreground mt-1 max-w-3xl">Reports concerning government officials and corruption, routed to the Commission for the Investigation of Abuse of Authority (CIAA).</p>
                    </div>
                </div>
                <ReportsList initialReports={JSON.parse(JSON.stringify(ciaaReports))} />
            </div>
        </TabsContent>
        <TabsContent value="police" className="mt-8">
            <div className="space-y-4">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                        <Users className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold font-headline tracking-tight">Police Reports</h2>
                        <p className="text-muted-foreground mt-1 max-w-3xl">Reports concerning civilian-related crimes, routed to the Nepal Police.</p>
                    </div>
                </div>
                <ReportsList initialReports={JSON.parse(JSON.stringify(policeReports))} />
            </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
