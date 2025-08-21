import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Shield, Users, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="container mx-auto px-4">
      <section className="text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter mb-4">
          Jana Awaz: Your Voice for Justice
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-8">
          Anonymously report crimes and corruption in Nepal. Your identity is always protected. Together, we can build a more accountable and transparent society.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/report">File a Report Now</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/reports">View Reports</Link>
          </Button>
        </div>
      </section>
      
      <section className="text-center py-16">
         <div className="space-y-6">
            <h2 className="text-3xl font-bold font-headline">A Transparent & Accountable Nepal</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Jana Awaz provides a secure and anonymous platform for citizens to expose wrongdoing, ensuring that every voice is heard and every report is taken seriously.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md mx-auto pt-4">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">2,500+</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Reports Submitted</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">85%</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Cases Actioned</p>
                    </CardContent>
                </Card>
            </div>
        </div>
      </section>

      <section className="text-center py-24">
         <h2 className="text-3xl font-bold font-headline mb-4">How It Works</h2>
         <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
            Our platform ensures your report reaches the correct authorities without revealing who you are.
          </p>
         <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-left p-4">
              <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>1. Submit Your Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Fill out a simple, anonymous form with details of the incident and upload a photo as evidence.</p>
              </CardContent>
            </Card>
            <Card className="text-left p-4">
               <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>2. AI-Powered Routing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Our intelligent system analyzes your report and automatically forwards it to the appropriate body—the CIAA for official corruption or the Police for other crimes.</p>
              </CardContent>
            </Card>
            <Card className="text-left p-4">
              <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>3. Public Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Submitted reports are made public to ensure transparency and accountability, driving systemic change.</p>
              </CardContent>
            </Card>
         </div>
      </section>
    </main>
  );
}
