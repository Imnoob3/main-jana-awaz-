
'use client';

import type { Grievance } from './types';

const REPORTS_KEY = 'reports';
const GRIEVANCES_KEY = 'grievances';

// This file is now only used for local mock data for grievances,
// as the main report submission now goes directly to Supabase.
// The local mock data for reports is no longer used but is kept
// here for potential future reference or local testing.


// Helper to safely access localStorage
const getLocalStorageItem = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage key “${key}”:`, error);
    return defaultValue;
  }
};

const setLocalStorageItem = <T>(key: string, value: T) => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key “${key}”:`, error);
  }
};

const initialGrievances: Grievance[] = [
    {
        id: '1722384-21-5-11',
        title: 'Lack of Public Toilets in Ratna Park',
        description: 'The number of public toilets in the Ratna Park area is severely insufficient. This causes great inconvenience to the thousands of commuters and pedestrians who use the area daily. We request the local government to install more clean and accessible public toilets.',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
        photoDataUri: 'https://picsum.photos/400/300'
    }
];

if (typeof window !== 'undefined' && !localStorage.getItem(GRIEVANCES_KEY)) {
  setLocalStorageItem(GRIEVANCES_KEY, initialGrievances);
}


// A simple, URL-safe unique ID generator.
const generateUniqueId = () => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

export function addGrievance(grievance: Omit<Grievance, 'id' | 'createdAt'>): Grievance {
    const grievances = getLocalStorageItem<Grievance[]>(GRIEVANCES_KEY, []);
    const newGrievance: Grievance = {
        ...grievance,
        id: generateUniqueId(),
        createdAt: new Date().toISOString(),
    };
    grievances.unshift(newGrievance);
    setLocalStorageItem(GRIEVANCES_KEY, grievances);
    return newGrievance;
}

export function getGrievances(): Grievance[] {
    const grievances = getLocalStorageItem<Grievance[]>(GRIEVANCES_KEY, []);
    return grievances.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getGrievanceById(id: string): Grievance | undefined {
    const grievances = getLocalStorageItem<Grievance[]>(GRIEVANCES_KEY, []);
    return grievances.find(g => g.id === id);
}

// The report functions below are no longer used by the main application flow
// but are kept for reference.

type LocalReport = {
    id: string;
    reportText: string;
    photoDataUri: string;
    crimeType: 'Government' | 'Civilian' | 'ICC';
    crimeSubType: string;
    createdAt: string;
    district: string;
    localAddress: string;
}


const initialReports: LocalReport[] = [
    {
        id: '1722384-24-2-8',
        reportText: 'A government official was seen accepting a bribe in broad daylight near the ministry office. The official was in a blue suit and was handed a thick envelope by a businessman. This has happened multiple times this month.',
        photoDataUri: 'https://picsum.photos/400/300',
        crimeType: 'Government',
        crimeSubType: 'Bribery',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        district: 'Kathmandu',
        localAddress: 'Singha Durbar',
    },
    {
        id: '1722384-23-1-9',
        reportText: 'Theft reported at a local electronics shop in Thamel. The suspect was caught on a CCTV camera wearing a red jacket and a black cap, smashing the front glass door and stealing several laptops and phones.',
        photoDataUri: 'https://picsum.photos/400/300',
        crimeType: 'Civilian',
        crimeSubType: 'Theft',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
        district: 'Kathmandu',
        localAddress: 'Thamel',
    },
];

if (typeof window !== 'undefined' && !localStorage.getItem(REPORTS_KEY)) {
  setLocalStorageItem(REPORTS_KEY, initialReports);
}


export function getReportsByAgency(agency: 'Government' | 'Civilian' | 'ICC'): LocalReport[] {
  const reports = getLocalStorageItem<LocalReport[]>(REPORTS_KEY, []);
  return reports.filter(report => report.crimeType === agency).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

    