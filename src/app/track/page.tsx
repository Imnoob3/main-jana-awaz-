
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ScanSearch } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

export default function TrackSubmissionPage() {
  const [trackingId, setTrackingId] = useState('');
  const router = useRouter();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      router.push(`/track/${trackingId.trim()}`);
    }
  };

  return (
    <main className="container mx-auto px-4 py-12 flex justify-center items-center">
      <Card className="w-full max-w-lg text-center">
        <form onSubmit={handleSubmit}>
          <CardHeader className="items-center">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <ScanSearch className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">{t('track.title')}</CardTitle>
            <CardDescription>
              {t('track.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-left">
              <Label htmlFor="trackingId">{t('track.trackingIdLabel')}</Label>
              <Input
                id="trackingId"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder={t('track.placeholder')}
                required
                className="text-center font-mono tracking-widest"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              {t('track.trackButton')}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
