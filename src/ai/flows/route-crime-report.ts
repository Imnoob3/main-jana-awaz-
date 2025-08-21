'use server';

/**
 * @fileOverview Automatically routes crime reports to the appropriate authority based on the content of the report.
 *
 * - routeCrimeReport - A function that analyzes the crime report and determines the appropriate recipient.
 * - RouteCrimeReportInput - The input type for the routeCrimeReport function.
 * - RouteCrimeReportOutput - The return type for the routeCrimeReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RouteCrimeReportInputSchema = z.object({
  reportText: z.string().describe('The text content of the crime report.'),
  photoDataUri: z
    .string()
    .describe(
      'A photo related to the crime report, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
});
export type RouteCrimeReportInput = z.infer<typeof RouteCrimeReportInputSchema>;

const RouteCrimeReportOutputSchema = z.object({
  recipient: z
    .enum(['CIAA', 'Police'])
    .describe('The appropriate recipient for the crime report.'),
  reason: z
    .string()
    .describe('The reason for routing the report to the specified recipient.'),
});
export type RouteCrimeReportOutput = z.infer<typeof RouteCrimeReportOutputSchema>;

export async function routeCrimeReport(input: RouteCrimeReportInput): Promise<RouteCrimeReportOutput> {
  return routeCrimeReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'routeCrimeReportPrompt',
  input: {schema: RouteCrimeReportInputSchema},
  output: {schema: RouteCrimeReportOutputSchema},
  prompt: `You are an AI assistant tasked with routing crime reports to the appropriate authority in Nepal.

  Analyze the following crime report and determine whether it should be routed to the Commission for the Investigation of Abuse of Authority (CIAA) or the Police.

  Reports involving government officials or corruption should be routed to the CIAA. Reports involving civilians should be routed to the Police.
  Include a brief explanation for your routing decision.

  Crime Report:
  {{reportText}}
  Photo: {{media url=photoDataUri}}

  Format your response as a JSON object with \"recipient\" (either \"CIAA\" or \"Police\") and \"reason\" fields.
  \"recipient\": The agency to which the report should be routed.
  \"reason\": A brief explanation for the routing decision.
  `,
});

const routeCrimeReportFlow = ai.defineFlow(
  {
    name: 'routeCrimeReportFlow',
    inputSchema: RouteCrimeReportInputSchema,
    outputSchema: RouteCrimeReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
