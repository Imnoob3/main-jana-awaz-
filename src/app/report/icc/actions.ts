'use server';

import { z } from 'zod';
import { iccReportSchema } from './schema';
import { addReport } from '@/lib/reports';
import { redirect } from 'next/navigation';

export async function submitIccReport(prevState: any, formData: FormData) {
  const validatedFields = iccReportSchema.safeParse({
    reportText: formData.get('reportText'),
    photoDataUri: formData.get('photoDataUri'),
    agreeWarning: formData.get('agreeWarning') === 'on',
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your input.',
    };
  }
  
  try {
    const newReport = addReport({
      reportText: validatedFields.data.reportText,
      photoDataUri: validatedFields.data.photoDataUri,
      crimeType: 'ICC',
      crimeSubType: 'International Crime',
      district: 'N/A',
      localAddress: 'N/A',
    });
    redirect(`/submission-confirmation/${newReport.id}`);
  } catch (error) {
    return {
      message: 'An unexpected error occurred.',
      errors: {},
    };
  }
}
