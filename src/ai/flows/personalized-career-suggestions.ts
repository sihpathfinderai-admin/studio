'use server';

/**
 * @fileOverview Provides personalized career suggestions based on user profile data and preferences.
 *
 * - getPersonalizedCareerSuggestions - A function that generates personalized suggestions.
 * - PersonalizedCareerSuggestionsInput - The input type for the getPersonalizedCareerSuggestions function.
 * - PersonalizedCareerSuggestionsOutput - The return type for the getPersonalizedCareerSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { careerPlanModel } from '../genkit';

const PersonalizedCareerSuggestionsInputSchema = z.object({
  strengths: z.array(z.string()).describe("The user's top strengths (e.g., Analytical, Creative)."),
  profileChartData: z.array(z.object({
    category: z.string(),
    score: z.number(),
  })).describe("The user's detailed profiler scores across different categories."),
  preferences: z.string().describe('The user preferences for learning resources, colleges, degrees, and streams.'),
  interests: z.string().optional().describe('User-provided text about their interests and skills.'),
});
export type PersonalizedCareerSuggestionsInput = z.infer<typeof PersonalizedCareerSuggestionsInputSchema>;

const PersonalizedCareerSuggestionsOutputSchema = z.object({
  learningResources: z.string().describe('Personalized suggestions for learning resources.'),
  colleges: z.string().describe('Personalized suggestions for colleges.'),
  degrees: z.string().describe('Personalized suggestions for degrees.'),
  streams: z.string().describe('Personalized suggestions for streams.'),
});
export type PersonalizedCareerSuggestionsOutput = z.infer<typeof PersonalizedCareerSuggestionsOutputSchema>;

export async function getPersonalizedCareerSuggestions(input: PersonalizedCareerSuggestionsInput): Promise<PersonalizedCareerSuggestionsOutput> {
  return personalizedCareerSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedCareerSuggestionsPrompt',
  input: {schema: PersonalizedCareerSuggestionsInputSchema},
  output: {schema: PersonalizedCareerSuggestionsOutputSchema},
  prompt: `You are an AI-powered career advisor. Analyze the provided user profile data and preferences to provide personalized suggestions for learning resources, colleges, degrees, and streams.

User's Top Strengths:
{{#each strengths}}
- {{this}}
{{/each}}

User's Detailed Profile Scores:
{{#each profileChartData}}
- {{category}}: {{score}}/100
{{/each}}

User's Stated Interests:
{{{interests}}}

User's Stated Preferences:
{{{preferences}}}

Based on all this information, provide comprehensive and personalized suggestions for:
- Learning Resources
- Colleges
- Degrees
- Streams`,
  model: careerPlanModel,
});

const personalizedCareerSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedCareerSuggestionsFlow',
    inputSchema: PersonalizedCareerSuggestionsInputSchema,
    outputSchema: PersonalizedCareerSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
