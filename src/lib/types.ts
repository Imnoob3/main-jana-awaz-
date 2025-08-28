
export type Report = {
  id: string;
  reportText: string;
  photoDataUri: string;
  crimeType: 'Government' | 'Civilian' | 'ICC';
  crimeSubType: string;
  createdAt: string; // Using string to avoid serialization issues between server/client
  district: string;
  localAddress: string;
};

export type Grievance = {
  id: string;
  title: string;
  description: string;
  photoDataUri: string;
  createdAt: string;
};
