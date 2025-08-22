
import { z } from "zod";

export const iccReportSchema = z.object({
  reportText: z.string().min(100, { message: 'Report must be at least 100 characters long.' }),
  photoDataUri: z.string({required_error: "A photo is required."}).min(1, { message: 'A photo is required.' }),
  agreeWarning: z.boolean().refine(val => val === true, {
    message: 'You must agree to the warning to proceed.',
  }),
});

export type IccFormState = {
    message: string;
    errors?: {
        reportText?: string[];
        photoDataUri?: string[];
        agreeWarning?: string[];
    };
    isSuccess: boolean;
    reportId?: string;
    recipient?: 'CIAA' | 'Police' | 'ICC';
}
