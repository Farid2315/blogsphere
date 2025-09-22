import { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';

interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  emailVerified: boolean;
  image?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  authenticated: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    authenticated: false,
  });

  const checkAuth = async () => {
    try {
      const session = await authClient.getSession();
      
      if (session?.data?.user) {
        const user = session.data.user;
        setAuthState({
          user: {
            id: user.id,
            email: user.email,
            username: user.email.split('@')[0], // Generate username from email
            name: user.name || user.email.split('@')[0],
            emailVerified: user.emailVerified || false,
            image: user.image || undefined,
          },
          loading: false,
          authenticated: true,
        });
      } else {
        setAuthState({
          user: null,
          loading: false,
          authenticated: false,
        });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setAuthState({
        user: null,
        loading: false,
        authenticated: false,
      });
    }
  };

  const logout = async () => {
    try {
      await authClient.signOut();
      setAuthState({
        user: null,
        loading: false,
        authenticated: false,
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return {
    ...authState,
    checkAuth,
    logout,
  };
}