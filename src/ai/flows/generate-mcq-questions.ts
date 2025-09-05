// This is a server-side file.
'use server';

/**
 * @fileOverview Generates multiple-choice questions (MCQs) for GATE exam preparation.
 *
 * - generateMCQQuestions - A function that generates MCQs based on the engineering stream, syllabus, difficulty, and previous papers.
 * - GenerateMCQQuestionsInput - The input type for the generateMCQQuestions function.
 * - GenerateMCQQuestionsOutput - The return type for the generateMCQQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMCQQuestionsInputSchema = z.object({
  engineeringStream: z
    .string()
    .describe('The selected engineering stream (e.g., Computer Science, Mechanical Engineering).'),
  syllabus: z.string().describe('The syllabus for the selected engineering stream.'),
  difficultyLevel: z
    .string()
    .describe('The difficulty level of the MCQs (e.g., Easy, Medium, Hard).'),
  previousPapers: z
    .string()
    .describe('Information from previous year papers relevant to the topic.'),
  numberOfQuestions: z.number().describe('The number of MCQs to generate.'),
});
export type GenerateMCQQuestionsInput = z.infer<
  typeof GenerateMCQQuestionsInputSchema
>;

const GenerateMCQQuestionsOutputSchema = z.object({
  mcqQuestions: z.array(
    z.object({
      question: z.string().describe('The MCQ question.'),
      options: z.array(z.string()).describe('The options for the MCQ.'),
      correctAnswer: z.string().describe('The correct answer to the MCQ.'),
    })
  ).describe('The generated multiple-choice questions.'),
});
export type GenerateMCQQuestionsOutput = z.infer<
  typeof GenerateMCQQuestionsOutputSchema
>;

export async function generateMCQQuestions(
  input: GenerateMCQQuestionsInput
): Promise<GenerateMCQQuestionsOutput> {
  return generateMCQQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMCQQuestionsPrompt',
  input: {schema: GenerateMCQQuestionsInputSchema},
  output: {schema: GenerateMCQQuestionsOutputSchema},
  prompt: `You are an expert in generating multiple-choice questions (MCQs) for the GATE exam.

You will generate MCQs based on the following information:

Engineering Stream: {{{engineeringStream}}}
Syllabus: {{{syllabus}}}
Difficulty Level: {{{difficultyLevel}}}
Previous Papers: {{{previousPapers}}}
Number of Questions: {{{numberOfQuestions}}}

Each MCQ should have a question, four options, and the correct answer.

Ensure that the MCQs are relevant to the syllabus and reflect the difficulty level specified.

Output the MCQs in the following JSON format:

{
  "mcqQuestions": [
    {
      "question": "...",
      "options": ["...", "...", "...", "..."],
      "correctAnswer": "..."
    },
    ...
  ]
}
`,
});

const generateMCQQuestionsFlow = ai.defineFlow(
  {
    name: 'generateMCQQuestionsFlow',
    inputSchema: GenerateMCQQuestionsInputSchema,
    outputSchema: GenerateMCQQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
