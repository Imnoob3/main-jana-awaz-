'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Shield, Users, TrendingUp, Landmark, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="container mx-auto px-4">
      <section className="text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter mb-4">
          {t('home.title')}
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
          {t('home.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/report">{t('home.fileReport')}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/reports">{t('home.viewReports')}</Link>
          </Button>
        </div>
      </section>
      
      <section className="text-center py-16">
         <div className="space-y-6">
            <h2 className="text-3xl font-bold font-headline">{t('home.transparentNepal.title')}</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              {t('home.transparentNepal.description')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md mx-auto pt-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">2,500+</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{t('home.transparentNepal.reportsSubmitted')}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">85%</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">{t('home.transparentNepal.casesActioned')}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
      </section>

      <section className="py-16">
        <Card className="max-w-4xl mx-auto bg-card border-destructive/20 shadow-lg">
            <CardHeader className="text-center">
                 <div className="mx-auto bg-destructive/10 p-3 rounded-lg w-fit mb-4">
                    <Landmark className="h-8 w-8 text-destructive" />
                  </div>
                <CardTitle className="text-2xl font-headline">{t('home.iccSection.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <p className="text-center text-muted-foreground max-w-3xl mx-auto">{t('home.iccSection.description')}</p>
                <Alert variant="destructive" className="max-w-3xl mx-auto border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                        {t('home.iccSection.warning')}
                    </AlertDescription>
                </Alert>
                <div className="flex justify-center">
                    <Button asChild variant="destructive">
                        <Link href="/report/icc">{t('home.iccSection.reportButton')}</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
      </section>

      <section className="text-center py-24">
         <h2 className="text-3xl font-bold font-headline mb-4">{t('home.howItWorks.title')}</h2>
         <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
            {t('home.howItWorks.description')}
          </p>
         <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-left p-4">
              <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{t('home.howItWorks.step1.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('home.howItWorks.step1.description')}</p>
              </CardContent>
            </Card>
            <Card className="text-left p-4">
               <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{t('home.howItWorks.step2.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('home.howItWorks.step2.description')}</p>
              </CardContent>
            </Card>
            <Card className="text-left p-4">
              <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{t('home.howItWorks.step3.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t('home.howItWorks.step3.description')}</p>
              </CardContent>
            </Card>
         </div>
      </section>
    </main>
  );
}
