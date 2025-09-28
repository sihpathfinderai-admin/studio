'use server';

import { getFutureSkills, type FutureSkillsOutput } from "@/ai/flows/future-skills-radar";
import { z } from "zod";

const formSchema = z.object({
  careerPath: z.string().min(3, 'Please provide a career path.'),
});

export type FormState = {
  message: string;
  data?: FutureSkillsOutput;
};

export async function getSkills(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = formSchema.safeParse({
    careerPath: formData.get("careerPath"),
  });

  if (!validatedFields.success) {
    return {
      message: "Please enter a valid career path.",
    };
  }

  try {
    const result = await getFutureSkills(validatedFields.data);
    return {
      message: "success",
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "An error occurred while getting skill insights. Please try again.",
    };
  }
}
