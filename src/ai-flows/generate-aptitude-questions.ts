'use server';

/**
 * @fileOverview Provides dynamically generated aptitude questions for the profiler test.
 *
 * - generateAptitudeQuestions - A function that returns a list of 10 aptitude questions.
 * - AptitudeQuestionsOutput - The return type for the generateAptitudeQuestions function.
 */

import {ai, profileAnalysisModel} from '@/ai/genkit';
import {z} from 'genkit';

const AptitudeQuestionSchema = z.object({
  question: z.string().describe('The question text.'),
  options: z.array(z.string()).describe('An array of 4 possible answers.'),
  answer: z.string().describe('The correct answer, which must be one of the options.'),
  category: z.enum(['Logical', 'Analytical', 'Verbal']).describe('The category of the question.'),
});

const AptitudeQuestionsOutputSchema = z.object({
  questions: z.array(AptitudeQuestionSchema).length(10).describe('An array of exactly 10 aptitude questions.'),
});
export type AptitudeQuestionsOutput = z.infer<typeof AptitudeQuestionsOutputSchema>;

export async function generateAptitudeQuestions(): Promise<AptitudeQuestionsOutput> {
  return aptitudeQuestionFlow();
}

const prompt = ai.definePrompt({
  name: 'aptitudeQuestionPrompt',
  output: {schema: AptitudeQuestionsOutputSchema},
  prompt: `You are an expert in creating educational assessments. Generate a set of 10 unique aptitude questions suitable for a student in 9th or 10th grade.

The questions should cover the following categories:
- Logical Reasoning (e.g., number series, patterns)
- Analytical Reasoning (e.g., word problems, simple calculations)
- Verbal Reasoning (e.g., analogies, synonyms)

Each question must have:
- A clear question text.
- Exactly 4 multiple-choice options.
- A single correct answer that is one of the provided options.
- The category it belongs to ('Logical', 'Analytical', 'Verbal').

Do not repeat questions. Ensure the difficulty is appropriate for the specified grade level.
`,
  model: profileAnalysisModel,
});

const aptitudeQuestionFlow = ai.defineFlow(
  {
    name: 'aptitudeQuestionFlow',
    outputSchema: AptitudeQuestionsOutputSchema,
  },
  async () => {
    if (!profileAnalysisModel) {
      throw new Error('Profile analysis model is not configured. Please check API keys.');
    }
    const {output} = await prompt();
    return output!;
  }
);
