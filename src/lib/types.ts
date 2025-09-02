
export type Report = {
  id: number; // default from supabase
  created_at: string; // default from supabase
  track_id: string;
  type_of_crime: 'government' | 'civilian';
  Specific_Type_of_Crime: string;
  Report_Details: string;
  District: string;
  Local_Address_Tole: string;
  image: string;
};

export type Grievance = {
  id: string;
  title: string;
  description: string;
  photoDataUri?: string;
  createdAt: string;
};
