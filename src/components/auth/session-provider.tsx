"use client";

import { ReactNode, createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
  provider?: string;
  createdAt?: string;
}

interface Session {
  user: User | null;
  isLoading: boolean;
}

interface AuthContextType {
  session: Session;
  signIn: (provider: string, credentials?: any) => Promise<void>;
  signUp: (provider: string, credentials?: any) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a SessionProvider");
  }
  return context;
}

interface SessionProviderProps {
  children: ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  const [session, setSession] = useState<Session>({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    // Check for existing session on mount
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      // Use relative URL to avoid port issues
      const response = await fetch("/api/auth/session");
      if (response.ok) {
        const data = await response.json();
        setSession({ user: data.user, isLoading: false });
      } else {
        setSession({ user: null, isLoading: false });
      }
    } catch (error) {
      console.error("Error checking session:", error);
      // Set loading to false even if there's an error
      setSession({ user: null, isLoading: false });
    }
  };

  const signIn = async (provider: string, credentials?: any) => {
    try {
      if (provider === "google") {
        // Redirect to the actual Google OAuth flow
        window.location.href = "/api/auth/signin/google";
        return;
      }
      
      // For email/password, you would implement this later
      console.log("Email/password sign in not implemented yet");
      throw new Error("Email/password sign in not implemented yet");
      
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  };

  const signUp = async (provider: string, credentials?: any) => {
    try {
      // For email/password signup, you would implement this later
      console.log("Email/password sign up not implemented yet");
      throw new Error("Email/password sign up not implemented yet");
      
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Use relative URL to avoid port issues
      const response = await fetch("/api/auth/signout", { method: "POST" });
      if (response.ok) {
        setSession({ user: null, isLoading: false });
      }
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const value = {
    session,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 