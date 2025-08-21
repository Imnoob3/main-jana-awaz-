import { getReportById } from '@/lib/reports';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function SubmissionConfirmationPage({ params }: { params: { id: string } }) {
  const report = getReportById(params.id);

  if (!report) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-12 flex justify-center items-center">
      <Card className="w-full max-w-2xl text-center">
        <CardHeader className="items-center">
          <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full w-fit mb-4">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl">Report Submitted Successfully!</CardTitle>
          <CardDescription>
            Your report has been received and routed to the <span className="font-semibold text-foreground">{report.recipient}</span>. Thank you for your contribution.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Please save your tracking ID. This ID will not be shown again.</p>
          <div className="p-4 bg-muted/50 dark:bg-muted/20 rounded-md border">
            <p className="text-sm font-semibold text-muted-foreground">Your Tracking ID</p>
            <p className="text-lg font-mono tracking-widest break-all text-primary">{report.id}</p>
          </div>
        </CardContent>
        <CardFooter className="flex-col sm:flex-row justify-center gap-4 pt-6">
            <Button asChild>
              <Link href={`/reports/${report.recipient.toLowerCase()}`}>View {report.recipient} Reports</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
