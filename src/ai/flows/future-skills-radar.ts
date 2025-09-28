'use server';

/**
 * @fileOverview Provides insights into future skills based on a given career path.
 *
 * - getFutureSkills - A function that generates insights on emerging skills, certifications, and technologies.
 * - FutureSkillsInput - The input type for the getFutureSkills function.
 * - FutureSkillsOutput - The return type for the getFutureSkills function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { definePromptWithFallback } from '../genkit';

const FutureSkillsInputSchema = z.object({
  careerPath: z.string().describe('The chosen career or degree path of the student.'),
});
export type FutureSkillsInput = z.infer<typeof FutureSkillsInputSchema>;

const FutureSkillsOutputSchema = z.object({
  emergingSkills: z.array(z.object({ skill: z.string(), description: z.string() })).describe('A list of emerging skills relevant to the career path.'),
  certifications: z.array(z.object({ name: z.string(), authority: z.string() })).describe('A list of recommended certifications.'),
  trendingTechnologies: z.array(z.object({ technology: z.string(), description: z.string() })).describe('A list of trending technologies and tools.'),
  upgradePath: z.string().describe('A suggested future-proof skill upgrade path to safeguard the career against automation and job shifts.'),
});
export type FutureSkillsOutput = z.infer<typeof FutureSkillsOutputSchema>;

export async function getFutureSkills(input: FutureSkillsInput): Promise<FutureSkillsOutput> {
  return futureSkillsFlow(input);
}

const prompt = definePromptWithFallback({
  name: 'futureSkillsPrompt',
  input: {schema: FutureSkillsInputSchema},
  output: {schema: FutureSkillsOutputSchema},
  prompt: `You are an AI career analyst. Your task is to provide insights on emerging skills, certifications, and tools for a student's chosen career path. Also, provide a future-proof skill upgrade path.

Career Path: {{{careerPath}}}

Based on this career path, provide the following:
- A list of emerging skills with brief descriptions.
- A list of valuable certifications with the issuing authority.
- A list of trending technologies and tools with brief descriptions.
- A concise, actionable skill upgrade path to stay ahead of automation.
`,
});

const futureSkillsFlow = ai.defineFlow(
  {
    name: 'futureSkillsFlow',
    inputSchema: FutureSkillsInputSchema,
    outputSchema: FutureSkillsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
