
'use client';

import { Grievance } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Clock, MessageSquareWarning } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useTranslation } from '@/hooks/use-translation';

export function GrievanceCard({ grievance }: { grievance: Grievance }) {
  const { t } = useTranslation();
  
  return (
    <Card className="overflow-hidden flex flex-col h-full hover:-translate-y-1">
      <CardHeader>
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-lg w-fit">
                <MessageSquareWarning className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-lg line-clamp-2">{grievance.title}</CardTitle>
          </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-4">{grievance.description}</p>
        {grievance.photoDataUri && (
            <div className="aspect-video relative rounded-md overflow-hidden border">
                 <Image
                    src={grievance.photoDataUri}
                    alt={t('track.details.evidenceAlt')}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    data-ai-hint="evidence photo"
                />
            </div>
        )}
      </CardContent>
       <CardFooter className="p-4 pt-0 flex flex-col items-start gap-2">
        <div className="w-full border-t pt-3 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                <span>{formatDistanceToNow(new Date(grievance.createdAt), { addSuffix: true })}</span>
            </div>
        </div>
       </CardFooter>
    </Card>
  );
}
