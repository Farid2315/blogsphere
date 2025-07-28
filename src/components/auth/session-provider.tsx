"use client";

import { createContext, useContext } from "react";
import { useSession, signIn, signUp } from "@/lib/auth-client";

interface Session {
  user: any;
  isLoading: boolean;
}

interface SessionContextType {
  session: Session;
  signIn: (provider: string, credentials?: any) => Promise<void>;
  signUp: (provider: string, credentials?: any) => Promise<void>;
  signOut: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function useSessionContext() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSessionContext must be used within a SessionProvider");
  }
  return context;
}

interface SessionProviderProps {
  children: React.ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  const { data: session, isLoading, signOut } = useSession();

  const sessionValue: SessionContextType = {
    session: {
      user: session?.user || null,
      isLoading,
    },
    signIn,
    signUp,
    signOut,
  };

  return (
    <SessionContext.Provider value={sessionValue}>
      {children}
    </SessionContext.Provider>
  );
} 