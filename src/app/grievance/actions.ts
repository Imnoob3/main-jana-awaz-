
'use server';

import { addGrievance } from "@/lib/reports";
import { redirect } from 'next/navigation';
import { grievanceSchema, GrievanceFormState } from "./schema";


export async function submitGrievance(prevState: GrievanceFormState, formData: FormData): Promise<GrievanceFormState> {
  const validatedFields = grievanceSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    photoDataUri: formData.get('photoDataUri') || undefined,
  });

  if (!validatedFields.success) {
    return {
      message: 'Failed to submit grievance. Please check the errors.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { title, description, photoDataUri } = validatedFields.data;

  try {
    const newGrievance = addGrievance({
        title,
        description,
        photoDataUri,
    });
    redirect(`/submission-confirmation/${newGrievance.id}?type=grievance`);
    
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      message: `An unexpected error occurred: ${errorMessage}`,
    };
  }
}
