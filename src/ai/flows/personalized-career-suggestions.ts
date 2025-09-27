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

const PersonalizedCareerSuggestionsInputSchema = z.object({
  profileData: z.string().describe('The user profile data including interests, skills, and academic background.'),
  preferences: z.string().describe('The user preferences for learning resources, colleges, degrees, and streams.'),
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
  prompt: `You are an AI-powered career advisor. Analyze the provided profile data and preferences to provide personalized suggestions for learning resources, colleges, degrees, and streams.

Profile Data: {{{profileData}}}
Preferences: {{{preferences}}}

Based on this information, provide personalized suggestions for:

Learning Resources:
{{{learningResources}}}

Colleges:
{{{colleges}}}

Degrees:
{{{degrees}}}

Streams:
{{{streams}}}`, 
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
