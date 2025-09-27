"use server";

import { getPersonalizedCareerSuggestions } from "@/ai/flows/personalized-career-suggestions";
import { z } from "zod";

const formSchema = z.object({
  profileData: z.string().min(10, 'Please provide more details about your profile.'),
  preferences: z.string().min(10, 'Please provide more details about your preferences.'),
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
  const validatedFields = formSchema.safeParse({
    profileData: formData.get("profileData"),
    preferences: formData.get("preferences"),
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
    return {
      message: "An error occurred while getting suggestions. Please try again.",
    };
  }
}
