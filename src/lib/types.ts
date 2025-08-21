export type Report = {
  id: string;
  reportText: string;
  photoDataUri: string;
  recipient: 'CIAA' | 'Police' | 'ICC';
  reason: string;
  createdAt: string; // Using string to avoid serialization issues between server/client
  district: string;
  localAddress: string;
};
