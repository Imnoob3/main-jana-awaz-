
import { z } from "zod";

export const reportSchema = z.object({
  reportText: z.string().min(50, { message: 'Report must be at least 50 characters long.' }),
  photoDataUri: z.string({required_error: "A photo is required."}).min(1, { message: 'A photo is required.' }),
  crimeType: z.enum(['government', 'civilian'], { required_error: 'You must select a crime type.' }),
  crimeSubType: z.string({ required_error: 'You must select a specific crime type.' }),
  district: z.string({ required_error: 'You must select a district.' }),
  localAddress: z.string().min(3, { message: 'Local address must be at least 3 characters long.' }),
});

export type FormState = {
    message: string;
    errors?: {
        reportText?: string[];
        photoDataUri?: string[];
        crimeType?: string[];
        crimeSubType?: string[];
        district?: string[];
        localAddress?: string[];
    };
    isSuccess: boolean;
    reportId?: string;
    recipient?: 'CIAA' | 'Police' | 'ICC';
}
