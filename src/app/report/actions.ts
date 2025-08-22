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
    };
  }

  const { reportText, photoDataUri, crimeType, district, localAddress } = validatedFields.data;

  try {
    // The AI routing can still be used for more detailed analysis or verification,
    // but the primary routing is now based on user selection.
    // For this implementation, we will directly use the user's selection.
    
    const recipient = crimeType === 'government' ? 'CIAA' : 'Police';
    const reason = crimeType === 'government'
      ? 'The report was categorized by the user as a Government Crime and routed to the CIAA.'
      : 'The report was categorized by the user as a Civilian Crime and routed to the Police.';


    // If you wanted to still use the AI, you could pass the crimeType to the flow.
    // For example:
    // const aiResult = await routeCrimeReport({ reportText, photoDataUri, userHint: crimeType });

    const newReport = addReport({
        reportText,
        photoDataUri,
        recipient: recipient,
        reason: reason,
        district,
        localAddress,
    });
    
    // redirect(`/submission-confirmation/${newReport.id}`);
    return {
      message: `SUCCESS (testing only): Report created with ID ${newReport.id}. Redirection is disabled.`
    }

  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      message: `An unexpected error occurred: ${errorMessage}`,
    };
  }
}
