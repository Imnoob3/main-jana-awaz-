'use server';

import { z } from "zod";
import { routeCrimeReport } from "@/ai/flows/route-crime-report";
import { addReport } from "@/lib/reports";
import { redirect } from 'next/navigation';

export const reportSchema = z.object({
  reportText: z.string().min(50, { message: 'Report must be at least 50 characters long.' }),
  photoDataUri: z.string({required_error: "A photo is required."}).min(1, { message: 'A photo is required.' }),
});

export type FormState = {
    message: string;
    errors?: {
        reportText?: string[];
        photoDataUri?: string[];
    };
}


export async function submitReport(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = reportSchema.safeParse({
    reportText: formData.get('reportText'),
    photoDataUri: formData.get('photoDataUri'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Failed to submit report. Please check the errors.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { reportText, photoDataUri } = validatedFields.data;

  try {
    const aiResult = await routeCrimeReport({ reportText, photoDataUri });

    if (!aiResult || !aiResult.recipient) {
      throw new Error("AI routing failed to return a valid recipient.");
    }

    const newReport = addReport({
        reportText,
        photoDataUri,
        recipient: aiResult.recipient,
        reason: aiResult.reason,
    });
    
    redirect(`/submission-confirmation/${newReport.id}`);

  } catch (error) {
    console.error(error);
    return {
      message: 'An unexpected error occurred while processing your report. Please try again later.',
    };
  }
}
