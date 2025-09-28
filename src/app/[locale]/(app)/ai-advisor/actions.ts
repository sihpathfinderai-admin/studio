"use server";

import { getPersonalizedCareerSuggestions } from "@/ai/flows/personalized-career-suggestions";
import { z } from "zod";

const formSchema = z.object({
  preferences: z.string().min(10, 'Please provide more details about your preferences.'),
  interests: z.string().optional(),
  strengths: z.array(z.string()),
  profileChartData: z.array(z.object({
    category: z.string(),
    score: z.number(),
  })),
});

export type FormState = {
  message: string;
  data?: {
    learningResources: string;
    colleges: string;
    degrees: string;
    streams: string;
  };
};

export async function getSuggestions(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {

  const strengths = formData.getAll('strengths[]');
  const profileChartData = JSON.parse(formData.get('profileChartData') as string || '[]');

  const validatedFields = formSchema.safeParse({
    preferences: formData.get("preferences"),
    interests: formData.get("profileData"),
    strengths,
    profileChartData
  });

  if (!validatedFields.success) {
    return {
      message: "Please fill out the fields with more detail.",
    };
  }

  try {
    const result = await getPersonalizedCareerSuggestions(validatedFields.data);
    return {
      message: "success",
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "An error occurred while getting suggestions. Please try again.",
    };
  }
}
