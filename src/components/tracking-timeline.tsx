
'use client';

import { CheckCircle, CircleDashed, Hourglass,ThumbsUp } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

interface TimelineStep {
  icon: React.ElementType;
  title: string;
  description: string;
  status: 'complete' | 'in_progress' | 'pending';
}

export function TrackingTimeline() {
  const { t } = useTranslation();

  // This is mock data. In a real application, this would come from your backend.
  const steps: TimelineStep[] = [
    {
      icon: CheckCircle,
      title: t('timeline.submitted.title'),
      description: t('timeline.submitted.description'),
      status: 'complete',
    },
    {
      icon: Hourglass,
      title: t('timeline.inReview.title'),
      description: t('timeline.inReview.description'),
      status: 'in_progress',
    },
    {
      icon: CircleDashed,
      title: t('timeline.actionTaken.title'),
      description: t('timeline.actionTaken.description'),
      status: 'pending',
    },
    {
      icon: ThumbsUp,
      title: t('timeline.resolved.title'),
      description: t('timeline.resolved.description'),
      status: 'pending',
    },
  ];

  return (
    <div className="space-y-8">
      {steps.map((step, index) => {
        const isLastStep = index === steps.length - 1;
        const Icon = step.icon;

        return (
          <div key={step.title} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center border-2',
                  step.status === 'complete' && 'bg-green-100 dark:bg-green-900/50 border-green-600 dark:border-green-400 text-green-600 dark:text-green-400',
                  step.status === 'in_progress' && 'bg-blue-100 dark:bg-blue-900/50 border-primary text-primary animate-pulse',
                  step.status === 'pending' && 'bg-muted border-border text-muted-foreground'
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              {!isLastStep && (
                <div
                  className={cn(
                    'w-0.5 flex-grow my-2',
                    step.status === 'complete' ? 'bg-green-600' : 'bg-border'
                  )}
                />
              )}
            </div>
            <div className="pt-1.5">
              <h4 className="font-semibold">{step.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
