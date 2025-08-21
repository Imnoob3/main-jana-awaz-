
'use client';

import { Report } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { Clock, ShieldAlert, MapPin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useTranslation } from '@/hooks/use-translation';

export function ReportCard({ report }: { report: Report }) {
  const { t } = useTranslation();
  
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <CardHeader className="p-0 border-b">
        <div className="aspect-video relative">
            <Image
              src={report.photoDataUri}
              alt={t('reportCard.evidenceAlt')}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint="crime scene"
            />
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-2 flex-grow">
        <div className="flex items-center text-xs text-muted-foreground gap-2 mb-2">
            <MapPin className="h-3 w-3" />
            <span>{report.localAddress}, {report.district}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-4">{report.reportText}</p>
      </CardContent>
       <CardFooter className="p-4 pt-0 flex-col items-start gap-4">
         <div className="flex items-center text-xs text-muted-foreground gap-2">
            <Clock className="h-3 w-3" />
            <span>{formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}</span>
        </div>
         <div className="w-full text-xs bg-muted/50 dark:bg-muted/20 p-3 rounded-md border">
           <p className="font-semibold text-muted-foreground flex items-center gap-1.5"><ShieldAlert className="h-4 w-4"/>{t('reportCard.aiAnalysis')}:</p>
           <p className="text-muted-foreground/80 pl-1">{report.reason}</p>
         </div>
       </CardFooter>
    </Card>
  );
}
