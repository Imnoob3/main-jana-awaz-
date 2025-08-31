'use server';

import { z } from 'zod';
import { grievanceSchema } from './schema';
import { addGrievance } from '@/lib/reports';
import { redirect } from 'next/navigation';

export async function submitGrievance(prevState: any, formData: FormData) {
  const validatedFields = grievanceSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    photoDataUri: formData.get('photoDataUri'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your input.',
    };
  }
  
  try {
    const newGrievance = addGrievance(validatedFields.data);
    redirect(`/submission-confirmation/${newGrievance.id}`);
  } catch (error) {
    return {
      message: 'An unexpected error occurred.',
      errors: {},
    };
  }
}
