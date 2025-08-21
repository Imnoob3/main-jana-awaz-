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
  });

  if (!validatedFields.success) {
    return {
      message: 'Failed to submit report. Please check the errors.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { reportText, photoDataUri, crimeType } = validatedFields.data;

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
    });
    
    redirect(`/submission-confirmation/${newReport.id}`);

  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred while processing your report. Please try again later.',
    };
  }
}
