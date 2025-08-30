
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Shield, Users, TrendingUp, Landmark, AlertTriangle, MessageSquareWarning, ScanSearch } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Home() {
  const { t } = useTranslation();

  const handleMouseOver = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.target as HTMLSpanElement;
    const h1 = target.closest('h1');
    if (h1 && target.dataset.index) {
      h1.classList.add('is-hovered');
      h1.style.setProperty('--hovered-index', target.dataset.index);
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLHeadingElement>) => {
    e.currentTarget.classList.remove('is-hovered');
  };

  const titleWords = t('home.title').split(' ');

  return (
    <main className="container mx-auto px-4">
      <section className="text-center py-12 md:py-20">
        <h1 
          className="text-4xl md:text-5xl font-bold font-headline tracking-tighter mb-4 title-animate"
          onMouseLeave={handleMouseLeave}
        >
          {titleWords.map((word, wordIndex) => (
            <span 
              key={wordIndex} 
              className="inline-block word" 
              onMouseOver={handleMouseOver}
              data-index={wordIndex}
              style={{ '--index': wordIndex } as React.CSSProperties}
            >
              {word}
              {wordIndex < titleWords.length - 1 && <span>&nbsp;</span>}
            </span>
          ))}
        </h1>
        <p className="max-w-3xl mx-auto text-base md:text-lg text-muted-foreground mb-8 px-4">
          {t('home.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 flex-wrap">
          <Button asChild size="lg">
            <Link href="/report">{t('home.fileReport')}</Link>
          </Button>
           <Button asChild size="lg">
            <Link href="/grievance">{t('home.voiceGrievance')}</Link>
          </Button>
          <Button asChild size="lg">
            <Link href="/reports">{t('home.viewReports')}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/track">
              <ScanSearch />
              {t('home.trackSubmission')}
            </Link>
          </Button>
        </div>
      </section>
      
      <section className="text-center py-12 md:py-16 bg-muted/30 dark:bg-muted/10 rounded-lg shadow-inner">
         <div className="space-y-6 px-4">
            <h2 className="text-2xl md:text-3xl font-bold font-headline">{t('home.transparentNepal.title')}</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-sm md:text-base">
              {t('home.transparentNepal.description')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto pt-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl md:text-3xl font-bold">2,500+</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs md:text-sm text-muted-foreground">{t('home.transparentNepal.reportsSubmitted')}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl md:text-3xl font-bold">85%</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xs md:text-sm text-muted-foreground">{t('home.transparentNepal.casesActioned')}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
         <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-headline mb-4">{t('home.howItWorks.title')}</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mb-12 text-sm md:text-base">
                {t('home.howItWorks.description')}
            </p>
         </div>
         <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-left p-4">
              <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                    <FileText className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg md:text-xl">{t('home.howItWorks.step1.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm md:text-base">{t('home.howItWorks.step1.description')}</p>
              </CardContent>
            </Card>
            <Card className="text-left p-4">
               <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                    <Shield className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg md:text-xl">{t('home.howItWorks.step2.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm md:text-base">{t('home.howItWorks.step2.description')}</p>
              </CardContent>
            </Card>
            <Card className="text-left p-4">
              <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                    <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg md:text-xl">{t('home.howItWorks.step3.title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm md:text-base">{t('home.howItWorks.step3.description')}</p>
              </CardContent>
            </Card>
         </div>
      </section>

      <section className="py-16">
        <Card className="max-w-4xl mx-auto bg-card border-destructive/20 shadow-lg">
            <CardHeader className="text-center">
                 <div className="mx-auto bg-destructive/10 p-3 rounded-lg w-fit mb-4">
                    <Landmark className="h-6 w-6 md:h-8 md:w-8 text-destructive" />
                  </div>
                <CardTitle className="text-xl md:text-2xl font-headline">{t('home.iccSection.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center px-4 md:px-6">
                <p className="text-muted-foreground max-w-3xl mx-auto text-sm md:text-base">{t('home.iccSection.description')}</p>
                <Alert variant="destructive" className="max-w-3xl mx-auto border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-xs md:text-sm">
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
    </main>
  );
}
