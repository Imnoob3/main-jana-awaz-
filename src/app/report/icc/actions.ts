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

  try {
    const newReport = addReport({
        reportText,
        photoDataUri,
        recipient: 'ICC',
        reason: 'This report has been directly submitted to the ICC due to its potential severity and international implications.',
    });
    
    // redirect(`/submission-confirmation/${newReport.id}`);
    return {
      message: `SUCCESS (testing only): ICC Report created with ID ${newReport.id}. Redirection is disabled.`
    }

  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      message: `An unexpected error occurred: ${errorMessage}`,
    };
  }
}
