'use server';

import { z } from 'zod';
import { reportSchema } from './schema';
import { addReport } from '@/lib/reports';
import { redirect } from 'next/navigation';
import type { Report } from '@/lib/types';

export async function submitReport(prevState: any, formData: FormData) {
  const validatedFields = reportSchema.safeParse({
    reportText: formData.get('reportText'),
    photoDataUri: formData.get('photoDataUri'),
    crimeType: formData.get('crimeType'),
    crimeSubType: formData.get('crimeSubType'),
    district: formData.get('district'),
    localAddress: formData.get('localAddress'),
  });
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your input.',
    };
  }

  try {
    const crimeTypeCapitalized = validatedFields.data.crimeType.charAt(0).toUpperCase() + validatedFields.data.crimeType.slice(1) as Report['crimeType'];
    const newReport = addReport({
        ...validatedFields.data,
        crimeType: crimeTypeCapitalized,
    });
    redirect(`/submission-confirmation/${newReport.id}`);
  } catch (error) {
    return {
      message: 'An unexpected error occurred.',
      errors: {},
    };
  }
}
