import { getReportsByAgency } from '@/lib/reports';
import { notFound } from 'next/navigation';
import { ReportsList } from '@/components/reports-list';
import { Shield, Users } from 'lucide-react';

const agencyConfig = {
    ciaa: {
        title: 'CIAA Reports',
        description: 'Reports concerning government officials and corruption, routed to the Commission for the Investigation of Abuse of Authority (CIAA).',
        icon: <Shield className="h-8 w-8 text-primary" />,
        dbKey: 'CIAA' as const
    },
    police: {
        title: 'Police Reports',
        description: 'Reports concerning civilian-related crimes, routed to the Nepal Police.',
        icon: <Users className="h-8 w-8 text-primary" />,
        dbKey: 'Police' as const
    }
};

export default function ReportsPage({ params }: { params: { agency: 'ciaa' | 'police' } }) {
  const agencyKey = params.agency.toLowerCase();
  
  if (agencyKey !== 'ciaa' && agencyKey !== 'police') {
    notFound();
  }
  
  const config = agencyConfig[agencyKey];
  const reports = getReportsByAgency(config.dbKey);

  return (
    <main className="container mx-auto px-4 py-12">
        <div className="flex items-start gap-4 mb-8">
            <div className="flex-shrink-0">
                {config.icon}
            </div>
            <div>
                <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">{config.title}</h1>
                <p className="text-muted-foreground mt-1 max-w-3xl">{config.description}</p>
            </div>
        </div>
        <ReportsList initialReports={JSON.parse(JSON.stringify(reports))} />
    </main>
  );
}

export function generateStaticParams() {
    return [{ agency: 'ciaa' }, { agency: 'police' }];
}
