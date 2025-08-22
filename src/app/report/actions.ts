
'use server';

import { routeCrimeReport } from "@/ai/flows/route-crime-report";
import { addReport } from "@/lib/reports";
import { redirect } from 'next/navigation';
import { reportSchema, FormState } from "./schema";


export async function submitReport(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = reportSchema.safeParse({
    reportText: formData.get('reportText'),
    photoDataUri: formData.get('photoDataUri'),
    crimeType: formData.get('crimeType'),
    district: formData.get('district'),
    localAddress: formData.get('localAddress'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Failed to submit report. Please check the errors.',
      errors: validatedFields.error.flatten().fieldErrors,
      isSuccess: false,
    };
  }

  const { reportText, photoDataUri, crimeType, district, localAddress } = validatedFields.data;

  try {
    const recipient = crimeType === 'government' ? 'CIAA' : 'Police';
    const reason = crimeType === 'government'
      ? 'The report was categorized by the user as a Government Crime and routed to the CIAA.'
      : 'The report was categorized by the user as a Civilian Crime and routed to the Police.';

    const newReport = addReport({
        reportText,
        photoDataUri,
        recipient: recipient,
        reason: reason,
        district,
        localAddress,
    });
    
    // For testing, we return success data instead of redirecting.
    // redirect(`/submission-confirmation/${newReport.id}`);
    return {
      message: `Report created with ID ${newReport.id}.`,
      isSuccess: true,
      reportId: newReport.id,
      recipient: newReport.recipient,
    }

  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      message: `An unexpected error occurred: ${errorMessage}`,
      isSuccess: false,
    };
  }
}
