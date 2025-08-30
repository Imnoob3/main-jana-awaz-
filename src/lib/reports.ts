
import type { Report, Grievance } from './types';
import { randomUUID } from 'crypto';

// In-memory store for reports. In a real application, you would use a database.
let reports: Report[] = [
    {
        id: 'd8c4f4b1-2a1d-4f1c-8b8a-9e2c6f3d7b5a',
        reportText: 'A government official was seen accepting a bribe in broad daylight near the ministry office. The official was in a blue suit and was handed a thick envelope by a businessman. This has happened multiple times this month.',
        photoDataUri: 'https://placehold.co/400x300.png',
        crimeType: 'Government',
        crimeSubType: 'Bribery',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        district: 'Kathmandu',
        localAddress: 'Singha Durbar',
    },
    {
        id: 'e9b3f3a2-1b0c-4e2b-9c9d-8f1e5d4c6a4b',
        reportText: 'Theft reported at a local electronics shop in Thamel. The suspect was caught on a CCTV camera wearing a red jacket and a black cap, smashing the front glass door and stealing several laptops and phones.',
        photoDataUri: 'https://placehold.co/400x300.png',
        crimeType: 'Civilian',
        crimeSubType: 'Theft',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
        district: 'Kathmandu',
        localAddress: 'Thamel',
    },
    {
        id: 'f7a2e2b1-0c1b-5d3c-8a8b-7e0d4c5b6a3c',
        reportText: 'Illegal construction on public land by a local contractor in the Baneshwor area. They are building a multi-story commercial building without any permits, blocking a public pathway.',
        photoDataUri: 'https://placehold.co/400x300.png',
        crimeType: 'Civilian',
        crimeSubType: 'Other',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        district: 'Kathmandu',
        localAddress: 'New Baneshwor',
    }
];

let grievances: Grievance[] = [
    {
        id: 'g1c4f4b1-2a1d-4f1c-8b8a-9e2c6f3d7b5a',
        title: 'Lack of Public Toilets in Ratna Park',
        description: 'The number of public toilets in the Ratna Park area is severely insufficient. This causes great inconvenience to the thousands of commuters and pedestrians who use the area daily. We request the local government to install more clean and accessible public toilets.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    }
];

export function addReport(report: Omit<Report, 'id' | 'createdAt'>): Report {
  const newReport: Report = {
    ...report,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };
  reports.unshift(newReport); // Add to the beginning of the array
  return newReport;
}

export function getReportsByAgency(agency: 'Government' | 'Civilian' | 'ICC'): Report[] {
  return reports.filter(report => report.crimeType === agency).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getReportById(id: string): Report | undefined {
  return reports.find(report => report.id === id);
}

export function addGrievance(grievance: Omit<Grievance, 'id' | 'createdAt'>): Grievance {
    const newGrievance: Grievance = {
        ...grievance,
        id: randomUUID(),
        createdAt: new Date().toISOString(),
    };
    grievances.unshift(newGrievance);
    return newGrievance;
}

export function getGrievances(): Grievance[] {
    return grievances.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getGrievanceById(id: string): Grievance | undefined {
    return grievances.find(g => g.id === id);
}
