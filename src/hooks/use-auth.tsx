"use client";

import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { loginUserAction, registerUserAction } from '@/app/auth/actions';

interface User {
  name: string;
  college: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password_DO_NOT_USE_IN_PROD: string) => Promise<{ success: boolean; message?: string }>;
  register: (newUser: { name: string, college: string, email: string, password: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getLoggedInUser = (): User | null => {
      if (typeof window === 'undefined') return null;
      try {
        const userJson = localStorage.getItem('loggedInUser');
        if (userJson) {
          return JSON.parse(userJson);
        }
        return null;
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('loggedInUser');
        return null;
      }
    };

    const loggedInUser = getLoggedInUser();
    setUser(loggedInUser);
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password_DO_NOT_USE_IN_PROD: string): Promise<{success: boolean; message?: string}> => {
    setLoading(true);
    const result = await loginUserAction({ email, password: password_DO_NOT_USE_IN_PROD });
    if (result.success && result.user) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('loggedInUser', JSON.stringify(result.user));
      }
      setUser(result.user);
      setLoading(false);
      return { success: true };
    }
    setLoading(false);
    return { success: false, message: result.message };
  }, []);

  const register = useCallback(
    async (
      newUser: { name: string; college: string; email: string; password: string }
    ): Promise<{ success: boolean; message?: string }> => {
      const result = await registerUserAction(newUser);
      return { success: result.success, message: result.message };
    },
    []
  );

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInUser) {
        try {
            const parsedUser = JSON.parse(loggedInUser);
            localStorage.removeItem(`quizHistory_${parsedUser.email}`);
        } catch (e) {
            console.error("Could not parse user to clear history on logout", e);
        }
      }
      localStorage.removeItem('loggedInUser');
    }
    setUser(null);
    setLoading(false); // Done loading
    router.push('/login');
  }, [router]);

  const value = { user, loading, login, register, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

