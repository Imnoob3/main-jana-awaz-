
import { z } from "zod";

export const grievanceSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters long.' }),
  description: z.string().min(50, { message: 'Description must be at least 50 characters long.' }),
  photoDataUri: z.string().optional(),
});

export type GrievanceFormState = {
    message?: string;
    errors?: {
        title?: string[];
        description?: string[];
        photoDataUri?: string[];
    };
}
