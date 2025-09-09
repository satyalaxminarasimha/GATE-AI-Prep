"use client";

import GateAiPrep from "@/components/gate-ai-prep";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100dvh-11.5rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight lg:text-5xl font-headline">
          AI-Powered GATE Practice
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-muted-foreground">
          Generate tailored MCQs for your engineering stream and get instant, AI-powered explanations.
        </p>
      </div>
      <GateAiPrep />
    </div>
  );
}