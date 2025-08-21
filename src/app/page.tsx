import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Shield, Users } from 'lucide-react';
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
            <Link href="/reports/ciaa">View Reports</Link>
          </Button>
        </div>
      </section>

      <section className="py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold font-headline mb-4">How It Works</h2>
            <p className="text-muted-foreground mb-6">
              Our platform ensures your report reaches the correct authorities without revealing who you are.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full mt-1">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">1. Submit Your Report</h3>
                  <p className="text-muted-foreground">Fill out a simple, anonymous form with details of the incident and upload a photo as evidence.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full mt-1">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">2. AI-Powered Routing</h3>
                  <p className="text-muted-foreground">Our intelligent system analyzes your report and automatically forwards it to the appropriate body—the CIAA for official corruption or the Police for other crimes.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                 <div className="bg-primary/10 p-3 rounded-full mt-1">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">3. Public Transparency</h3>
                  <p className="text-muted-foreground">Submitted reports are made public to ensure transparency and accountability.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <Image 
              src="https://placehold.co/600x400.png"
              alt="A person holding a phone to report an incident"
              data-ai-hint="justice freedom"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>
      
      <section className="text-center py-24">
         <h2 className="text-3xl font-bold font-headline mb-4">Report Categories</h2>
         <p className="max-w-2xl mx-auto text-muted-foreground mb-8">
            Reports are automatically categorized and routed to ensure they are handled by the correct agency.
          </p>
         <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="text-left">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Shield className="h-7 w-7 text-primary" />
                  <span className="text-xl">Government & Corruption</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Reports involving government officials, abuse of authority, or corruption are sent to the CIAA.</p>
                <Button asChild variant="link" className="p-0 h-auto mt-4 font-semibold">
                  <Link href="/reports/ciaa">View CIAA Reports &rarr;</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="text-left">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users className="h-7 w-7 text-primary" />
                  <span className="text-xl">Civilian Related Crimes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Reports concerning crimes committed by civilians are directed to the Nepal Police.</p>
                 <Button asChild variant="link" className="p-0 h-auto mt-4 font-semibold">
                  <Link href="/reports/police">View Police Reports &rarr;</Link>
                </Button>
              </CardContent>
            </Card>
         </div>
      </section>
    </main>
  );
}
