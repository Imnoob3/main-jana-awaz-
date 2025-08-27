
'use client';

import { ReportsList } from '@/components/reports-list';
import { getReportsByAgency } from '@/lib/reports';
import { Landmark, Shield, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from '@/hooks/use-translation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ViewReportsPage() {
  const { t } = useTranslation();
  const ciaaReports = getReportsByAgency('CIAA');
  const policeReports = getReportsByAgency('Police');
  const iccReports = getReportsByAgency('ICC');

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">{t('reportsPage.title')}</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          {t('reportsPage.description')}
        </p>
      </div>

      <Tabs defaultValue="ciaa" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-lg mx-auto">
          <TabsTrigger value="ciaa">
            <Shield className="mr-2" />
            {t('reportsPage.ciaaReports')}
          </TabsTrigger>
          <TabsTrigger value="police">
            <Users className="mr-2" />
            {t('reportsPage.policeReports')}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="ciaa" className="mt-8">
            <div className="space-y-4">
                 <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                        <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold font-headline tracking-tight">{t('reportsPage.ciaaReports')}</h2>
                        <p className="text-muted-foreground mt-1 max-w-3xl">{t('reportsPage.ciaaDescription')}</p>
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
                        <h2 className="text-2xl md:text-3xl font-bold font-headline tracking-tight">{t('reportsPage.policeReports')}</h2>
                        <p className="text-muted-foreground mt-1 max-w-3xl">{t('reportsPage.policeDescription')}</p>
                    </div>
                </div>
                <ReportsList initialReports={JSON.parse(JSON.stringify(policeReports))} />
            </div>
        </TabsContent>
      </Tabs>

      <Separator className="my-16" />

      <Card className="border-destructive/50">
        <CardHeader>
             <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                    <div className="bg-destructive/10 p-3 rounded-lg w-fit">
                        <Landmark className="h-8 w-8 text-destructive" />
                    </div>
                </div>
                <div>
                    <CardTitle className="text-2xl md:text-3xl font-headline tracking-tight text-destructive">{t('reportsPage.iccReports')}</CardTitle>
                    <p className="text-muted-foreground mt-1 max-w-3xl">{t('reportsPage.iccDescription')}</p>
                </div>
            </div>
        </CardHeader>
        <CardContent>
             <ReportsList initialReports={JSON.parse(JSON.stringify(iccReports))} />
        </CardContent>
      </Card>

    </main>
  );
}
