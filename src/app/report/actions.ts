
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
    crimeSubType: formData.get('crimeSubType'),
    district: formData.get('district'),
    localAddress: formData.get('localAddress'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Failed to submit report. Please check the errors.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { reportText, photoDataUri, crimeType, crimeSubType, district, localAddress } = validatedFields.data;

  try {
    const recipient = crimeType === 'government' ? 'CIAA' : 'Police';
    const reason = crimeType === 'government'
      ? `The report was categorized by the user as a Government Crime (${crimeSubType}) and routed to the CIAA.`
      : `The report was categorized by the user as a Civilian Crime (${crimeSubType}) and routed to the Police.`;

    const newReport = addReport({
        reportText,
        photoDataUri,
        recipient: recipient,
        reason: reason,
        district,
        localAddress,
    });
    
    redirect(`/submission-confirmation/${newReport.id}`);

  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      message: `An unexpected error occurred: ${errorMessage}`,
    };
  }
}
