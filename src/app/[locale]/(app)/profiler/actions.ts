
'use server';

import { generateAptitudeQuestions, AptitudeQuestionsOutput } from "@/ai-flows/generate-aptitude-questions";

export type ActionState = {
    message: string;
    data?: AptitudeQuestionsOutput;
}

export async function getAptitudeQuestions(): Promise<ActionState> {
    try {
        const result = await generateAptitudeQuestions();
        return {
            message: 'success',
            data: result
        }
    } catch(error: any) {
        console.error(error);
        return {
            message: `Failed to generate aptitude questions: ${error.message}`
        }
    }
}
