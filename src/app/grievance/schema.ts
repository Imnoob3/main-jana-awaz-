
import { z } from "zod";

export const grievanceSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters long.' }),
  description: z.string().min(50, { message: 'Description must be at least 50 characters long.' }),
  photoDataUri: z.string({required_error: "A photo is required."}).min(1, { message: 'A photo is required.' }),
});

export type GrievanceFormState = {
    message?: string;
    errors?: {
        title?: string[];
        description?: string[];
        photoDataUri?: string[];
    };
}
