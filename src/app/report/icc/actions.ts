
'use server';

import { addReport } from "@/lib/reports";
import { redirect } from 'next/navigation';
import { iccReportSchema, IccFormState } from "./schema";

export async function submitIccReport(prevState: IccFormState, formData: FormData): Promise<IccFormState> {
  const validatedFields = iccReportSchema.safeParse({
    reportText: formData.get('reportText'),
    photoDataUri: formData.get('photoDataUri'),
    agreeWarning: formData.get('agreeWarning') === 'on',
  });

  if (!validatedFields.success) {
    return {
      message: 'Failed to submit report. Please check the errors.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { reportText, photoDataUri } = validatedFields.data;

  let newReportId: string;
  try {
    const newReport = addReport({
        reportText,
        photoDataUri,
        crimeType: 'ICC',
        crimeSubType: 'International Crime',
        // District and local address are not required for ICC reports in this schema
        district: 'International', 
        localAddress: 'N/A',
    });
    newReportId = newReport.id;
    
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      message: `An unexpected error occurred: ${errorMessage}`,
    };
  }
  
  redirect(`/submission-confirmation/${newReportId}`);
}
