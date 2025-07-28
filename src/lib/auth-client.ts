import { useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Session {
  user: User | null;
  isLoading: boolean;
}

export function useSession() {
  const [session, setSession] = useState<Session>({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const response = await fetch("/api/auth/session");
      if (response.ok) {
        const data = await response.json();
        setSession({ user: data.user, isLoading: false });
      } else {
        setSession({ user: null, isLoading: false });
      }
    } catch (error) {
      console.error("Error checking session:", error);
      setSession({ user: null, isLoading: false });
    }
  };

  const signOut = async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" });
      setSession({ user: null, isLoading: false });
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return {
    data: session.user ? { user: session.user } : null,
    isLoading: session.isLoading,
    signOut,
  };
}

export const signIn = async (provider: string) => {
  if (provider === "google") {
    window.location.href = "/api/auth/signin/google";
  }
};

export const signUp = async (provider: string) => {
  if (provider === "google") {
    window.location.href = "/api/auth/signin/google";
  }
}; 