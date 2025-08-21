'use client';

import { useState, useMemo } from 'react';
import { Report } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { ReportCard } from './report-card';
import { Search } from 'lucide-react';

export function ReportsList({ initialReports }: { initialReports: Report[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = useMemo(() => {
    if (!searchTerm) return initialReports;
    const lowercasedTerm = searchTerm.toLowerCase();
    return initialReports.filter(report =>
      report.reportText.toLowerCase().includes(lowercasedTerm) ||
      report.reason.toLowerCase().includes(lowercasedTerm)
    );
  }, [searchTerm, initialReports]);

  return (
    <div className="space-y-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by keywords in reports..."
          className="w-full max-w-lg pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map(report => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
            <h3 className="text-xl font-semibold">No Reports Found</h3>
            <p className="text-muted-foreground mt-2">No reports matched your search criteria.</p>
        </div>
      )}
    </div>
  );
}
