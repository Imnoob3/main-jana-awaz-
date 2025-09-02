

export type Report = {
  track_id: string;
  created_at: string; 
  type_of_crime: 'government' | 'civilian';
  Specific_Type_of_Crime: string;
  Report_Details: string;
  District: string;
  Local_Address_Tole: string;
  image: string | null;
};

export type Grievance = {
  id: string;
  title: string;
  description: string;
  photoDataUri?: string;
  createdAt: string;
};

    

    