
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { Question, QuizConfig, UserAnswers } from '@/components/gate-ai-prep';
import { useAuth } from './use-auth';

export interface QuizHistoryItem {
  id: string;
  date: Date;
  config: QuizConfig;
  questions: Question[];
  userAnswers: UserAnswers;
  score: number;
}

const getHistoryKey = (email: string | undefined) => email ? `quizHistory_${email}`: 'quizHistory_anonymous';

export const useQuizHistory = () => {
  const { user, loading: authLoading } = useAuth();
  const [history, setHistory] = useState<QuizHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const getHistoryFromStorage = useCallback((email: string): QuizHistoryItem[] => {
    if (typeof window === 'undefined') return [];
    const historyKey = getHistoryKey(email);
    const historyData = localStorage.getItem(historyKey);
    try {
        return historyData ? JSON.parse(historyData) : [];
    } catch(e) {
        console.error("Failed to parse history data", e);
        localStorage.removeItem(historyKey);
        return [];
    }
  }, []);
  
  const saveHistoryToStorage = useCallback((historyData: QuizHistoryItem[], email: string) => {
    if (typeof window === 'undefined') return;
    const historyKey = getHistoryKey(email);
    localStorage.setItem(historyKey, JSON.stringify(historyData));
  }, []);

  useEffect(() => {
    if (!authLoading) {
      if (user) {
          setHistory(getHistoryFromStorage(user.email));
      } else {
          setHistory([]);
      }
      setLoading(false);
    }
  }, [getHistoryFromStorage, user, authLoading]);

  const addQuizToHistory = (quizItem: QuizHistoryItem) => {
    if (!user) return;
    setHistory(prevHistory => {
        const newHistory = [quizItem, ...prevHistory];
        saveHistoryToStorage(newHistory, user.email);
        return newHistory;
    });
  };

  const clearHistory = () => {
    if (!user) return;
    setHistory([]);
    saveHistoryToStorage([], user.email);
  };

  return { history, loading, addQuizToHistory, clearHistory };
};
