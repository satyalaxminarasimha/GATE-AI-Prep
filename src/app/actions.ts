"use server";

import { explainAnswer, ExplainAnswerInput } from "@/ai/flows/explain-answer";
import { generateMCQQuestions, GenerateMCQQuestionsInput } from "@/ai/flows/generate-mcq-questions";
import { z } from "zod";

const quizConfigSchema = z.object({
  engineeringStream: z.string(),
  syllabus: z.string(),
  difficultyLevel: z.enum(["Easy", "Medium", "Hard"]),
  previousPapers: z.string().optional(),
  numberOfQuestions: z.number(),
});

export async function generateQuizAction(input: GenerateMCQQuestionsInput) {
  const parsedInput = quizConfigSchema.safeParse(input);
  if (!parsedInput.success) {
    return { success: false, error: "Invalid input." };
  }
  try {
    const output = await generateMCQQuestions(parsedInput.data);
    return { success: true, data: output };
  } catch (e) {
    console.error(e);
    return { success: false, error: "Failed to generate quiz." };
  }
}

export async function getExplanationAction(input: ExplainAnswerInput) {
  try {
    const output = await explainAnswer(input);
    return { success: true, data: output };
  } catch (e) {
    console.error(e);
    return { success: false, error: "Failed to get explanation." };
  }
}
