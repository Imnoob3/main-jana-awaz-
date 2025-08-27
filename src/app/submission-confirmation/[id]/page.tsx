
'use client';

import { getReportById } from '@/lib/reports';
import { notFound, useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

export default function SubmissionConfirmationPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';
  const report = getReportById(id);
  const { t } = useTranslation();

  if (!report) {
    notFound();
  }
  
  const recipient = report.crimeType === 'Government' ? 'CIAA' : report.crimeType === 'Civilian' ? 'Police' : 'ICC';


  return (
    <main className="container mx-auto px-4 py-12 flex justify-center items-center">
      <Card className="w-full max-w-2xl text-center">
        <CardHeader className="items-center">
          <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full w-fit mb-4">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl">{t('confirmation.title')}</CardTitle>
          <CardDescription>
            {t('confirmation.description', { recipient: recipient })}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{t('confirmation.saveId')}</p>
          <div className="p-4 bg-muted/50 dark:bg-muted/20 rounded-md border">
            <p className="text-sm font-semibold text-muted-foreground">{t('confirmation.trackingId')}</p>
            <p className="text-lg font-mono tracking-widest break-all text-primary">{report.id}</p>
          </div>
        </CardContent>
        <CardFooter className="flex-col sm:flex-row justify-center gap-4 pt-6">
            <Button asChild>
              <Link href={`/reports`}>{t('confirmation.viewReports', { recipient: recipient })}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">{t('confirmation.backToHome')}</Link>
            </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
