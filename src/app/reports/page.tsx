import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Users } from "lucide-react";
import Link from "next/link";
import ReportsPage from "./[agency]/page";
import { getReportsByAgency } from "@/lib/reports";

export default function ViewReportsPage() {
    const ciaaReports = getReportsByAgency('CIAA');
    const policeReports = getReportsByAgency('Police');

    return (
        <main className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">Browse Reports</h1>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                    Explore anonymous reports submitted by citizens. Reports are automatically routed to the appropriate agency for action.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <ReportsPage params={{ agency: 'ciaa' }} />
                </div>
                <div>
                   <ReportsPage params={{ agency: 'police' }} />
                </div>
            </div>
        </main>
    );
}
