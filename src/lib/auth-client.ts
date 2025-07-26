import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000"
});

// Export specific methods for easier use
export const { signIn, signUp, useSession, signOut } = authClient; 