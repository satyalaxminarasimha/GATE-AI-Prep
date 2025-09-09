
"use client";

import type { GenerateMCQQuestionsOutput } from "@/ai/flows/generate-mcq-questions";
import { generateQuizAction, getExplanationAction } from "@/app/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle, HelpCircle, Loader2, Sparkles, XCircle } from "lucide-react";
import React, { useState } from "react";
import { useForm, type SubmitHandler, FormProvider } from "react-hook-form";
import { z } from "zod";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useQuizHistory } from "@/hooks/use-quiz-history";
import { syllabusMap } from "@/lib/syllabus";

const quizConfigSchema = z.object({
  engineeringStream: z.string().min(1, "Please select an engineering stream."),
  syllabus: z.string().min(10, "Syllabus must be at least 10 characters.").max(5000),
  difficultyLevel: z.enum(["Easy", "Medium", "Hard"]),
  previousPapers: z.string().max(2000).optional(),
  numberOfQuestions: z.coerce.number().min(1).max(100),
});

export type QuizConfig = z.infer<typeof quizConfigSchema>;
export type Question = GenerateMCQQuestionsOutput["mcqQuestions"][0];
export type UserAnswers = Record<number, string>;

export default function GateAiPrep() {
  const [step, setStep] = useState<"config" | "loading" | "quiz" | "results">("config");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [score, setScore] = useState(0);
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);
  const { addQuizToHistory } = useQuizHistory();

  const handleQuizStart = (generatedQuestions: Question[], config: QuizConfig) => {
    setQuestions(generatedQuestions);
    setQuizConfig(config);
    setUserAnswers({});
    setScore(0);
    setStep("quiz");
  };

  const handleQuizSubmit = (answers: UserAnswers) => {
    let correctCount = 0;
    questions.forEach((q, index) => {
      if (q.correctAnswer === answers[index]) {
        correctCount++;
      }
    });

    if (quizConfig) {
       addQuizToHistory({
        id: new Date().toISOString(),
        date: new Date(),
        questions,
        userAnswers: answers,
        score: correctCount,
        config: quizConfig,
      });
    }

    setScore(correctCount);
    setUserAnswers(answers);
    setStep("results");
  };

  const handleRestart = () => {
    setStep("config");
    setQuestions([]);
    setUserAnswers({});
    setQuizConfig(null);
  };
  
  const handleTryAgain = () => {
    setStep("quiz");
    setUserAnswers({});
    setScore(0);
  }

  switch (step) {
    case "config":
      return <QuizConfigForm onQuizStart={handleQuizStart} setStep={setStep} />;
    case "loading":
        return <LoadingState />;
    case "quiz":
      return <QuizSession questions={questions} onQuizSubmit={handleQuizSubmit} onQuit={handleRestart} />;
    case "results":
      return (
        <QuizResults
          questions={questions}
          userAnswers={userAnswers}
          score={score}
          onRestart={handleRestart}
          onTryAgain={handleTryAgain}
          quizConfig={quizConfig}
        />
      );
    default:
      return null;
  }
}

function QuizConfigForm({
  onQuizStart,
  setStep,
}: {
  onQuizStart: (questions: Question[], config: QuizConfig) => void;
  setStep: (step: "loading" | "config") => void;
}) {
  const { toast } = useToast();

  const form = useForm<QuizConfig>({
    resolver: zodResolver(quizConfigSchema),
    defaultValues: {
      engineeringStream: "Computer Science and Information Technology",
      syllabus: syllabusMap.get("Computer Science and Information Technology") || "",
      difficultyLevel: "Medium",
      previousPapers: "",
      numberOfQuestions: 10,
    },
  });

  const handleStreamChange = (stream: string) => {
    form.setValue("engineeringStream", stream);
    form.setValue("syllabus", syllabusMap.get(stream) || "");
  }

  const onSubmit: SubmitHandler<QuizConfig> = async (data) => {
    setStep("loading");
    const result = await generateQuizAction(data);
    if (result.success && result.data && result.data.mcqQuestions.length > 0) {
      onQuizStart(result.data.mcqQuestions, data);
    } else {
      toast({
        variant: "destructive",
        title: "Error Generating Quiz",
        description: result.error || "Could not generate questions based on the provided input. Please try again with different parameters.",
      });
      setStep("config");
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Create Your Practice Quiz</CardTitle>
            <CardDescription>
              Customize the quiz to focus on your specific preparation needs.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="engineeringStream"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Engineering Stream</FormLabel>
                    <Select onValueChange={handleStreamChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your stream" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from(syllabusMap.keys()).map((stream) => (
                           <SelectItem key={stream} value={stream}>{stream}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="difficultyLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="syllabus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Syllabus Topics</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Data Structures, Algorithms, Operating Systems"
                      {...field}
                      rows={6}
                    />
                  </FormControl>
                  <FormDescription>
                    The syllabus for the selected stream. You can edit it to focus on specific topics.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="previousPapers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Previous Papers Context (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Focus on questions similar to GATE 2022 paper, especially graph theory."
                      {...field}
                      rows={3}
                    />
                  </FormControl>
                  <FormDescription>
                    Add any specific context from past papers you want the AI to consider.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="numberOfQuestions"
                render={({ field }) => (
                  <FormItem className="max-w-xs">
                    <FormLabel>Number of Questions</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" max="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={form.formState.isSubmitting} size="lg">
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Quiz
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}

function LoadingState() {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border bg-card text-card-foreground shadow-lg p-12 min-h-[400px]">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <h2 className="text-2xl font-semibold font-headline text-center">Generating Your Quiz...</h2>
            <p className="text-muted-foreground text-center mt-2">Our AI is crafting questions just for you. Please wait a moment.</p>
        </div>
    );
}

function QuizSession({
  questions,
  onQuizSubmit,
  onQuit,
}: {
  questions: Question[];
  onQuizSubmit: (answers: UserAnswers) => void;
  onQuit: () => void;
}) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({});
  const formMethods = useForm();

  const handleOptionChange = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQ]: value }));
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    }
  };
  
  const handleSubmit = () => {
    onQuizSubmit(answers);
  };
  
  const progress = ((currentQ + 1) / questions.length) * 100;
  const question = questions[currentQ];

  return (
    <FormProvider {...formMethods}>
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="font-headline text-2xl">Question {currentQ + 1} of {questions.length}</CardTitle>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Quit Quiz</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to quit?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Your progress will be lost and this quiz will not be saved in your history.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onQuit} className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">Quit</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <CardContent className="min-h-[250px]">
          <p className="text-lg font-medium mb-6">{question.question}</p>
          <RadioGroup onValueChange={handleOptionChange} value={answers[currentQ]}>
            {question.options.map((option, index) => (
              <FormItem key={index} className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                      <RadioGroupItem value={option} id={`q${currentQ}-o${index}`} />
                  </FormControl>
                  <Label htmlFor={`q${currentQ}-o${index}`} className="font-normal text-base">
                      {option}
                  </Label>
              </FormItem>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={currentQ === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
          </Button>
          {currentQ < questions.length - 1 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">Submit Quiz</Button>
          )}
        </CardFooter>
      </Card>
    </FormProvider>
  );
}

function QuizResults({
  questions,
  userAnswers,
  score,
  onRestart,
  onTryAgain,
  quizConfig
}: {
  questions: Question[];
  userAnswers: UserAnswers;
  score: number;
  onRestart: () => void;
  onTryAgain: () => void;
  quizConfig: QuizConfig | null;
}) {
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-3xl">Quiz Complete!</CardTitle>
        <CardDescription className="text-lg">
            You scored {score} out of {questions.length} ({percentage}%)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-bold mb-4 font-headline">Review Your Answers</h3>
        <Accordion type="single" collapsible className="w-full">
            {questions.map((q, index) => (
                <ResultItem key={index} question={q} userAnswer={userAnswers[index]} index={index} quizConfig={quizConfig} />
            ))}
        </Accordion>
      </CardContent>
      <CardFooter className="flex-col sm:flex-row gap-2 justify-center">
        <Button onClick={onRestart}>Create a New Quiz</Button>
        <Button variant="outline" onClick={onTryAgain}>Try This Quiz Again</Button>
      </CardFooter>
    </Card>
  );
}

export function ResultItem({ question, userAnswer, index, quizConfig }: { question: Question, userAnswer: string, index: number, quizConfig: QuizConfig | null}) {
    const isCorrect = question.correctAnswer === userAnswer;
    return (
        <AccordionItem value={`item-${index}`}>
            <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-4 w-full pr-4">
                    {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                        <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                    )}
                    <span className="text-left flex-1">Question {index + 1}: {question.question}</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-2 pb-4">
                <div className="space-y-4">
                    <p>Your answer: <span className={cn("font-semibold", isCorrect ? "text-green-600" : "text-destructive")}>{userAnswer || "Not answered"}</span></p>
                    <p>Correct answer: <span className="font-semibold text-green-600">{question.correctAnswer}</span></p>
                    <Explanation question={question} quizConfig={quizConfig} />
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}

export function Explanation({ question, quizConfig }: { question: Question, quizConfig: QuizConfig | null }) {
    const [explanation, setExplanation] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const fetchExplanation = async () => {
        if (!quizConfig) return;
        setIsLoading(true);
        const result = await getExplanationAction({
            question: question.question,
            correctAnswer: question.correctAnswer,
            incorrectAnswers: question.options.filter(o => o !== question.correctAnswer),
            engineeringStream: quizConfig.engineeringStream,
        });
        setIsLoading(false);
        if (result.success && result.data) {
            setExplanation(result.data.explanation);
        } else {
            toast({
                variant: "destructive",
                title: "Error",
                description: result.error || "Failed to load explanation.",
            });
        }
    };
    
    if (explanation) {
        return (
            <div className="prose prose-sm max-w-none p-4 border rounded-md bg-secondary/50 font-code">
                <h4 className="font-headline">Explanation:</h4>
                <p>{explanation}</p>
            </div>
        );
    }
    
    return (
        <Button variant="outline" size="sm" onClick={fetchExplanation} disabled={isLoading || !quizConfig}>
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting Explanation...
                </>
            ) : (
                 <>
                    <HelpCircle className="mr-2 h-4 w-4" />
                    Show AI Explanation
                </>
            )}
        </Button>
    )
}
    
    
