import { prismaAdapter } from "better-auth/adapters/prisma";
import { betterAuth } from "better-auth";
import { PrismaClient } from "@prisma/client";
import { openAPI } from "better-auth/plugins"

const prisma = new PrismaClient();

export const auth = betterAuth({
  appName: "blogsphere",
  secret: process.env.BETTER_AUTH_SECRET as string,
  url: process.env.BETTER_AUTH_URL as string,
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),

  // Email/Password config
  emailAndPassword: {
    enabled: true,
    signUp: async (data: { email: string; password: string; name?: string; username?: string }) => {
      // The username is now provided by the user in the form
      // No need to generate it automatically
      return data;
    }
  },

  // Google OAuth config
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile: async (profile: { email: string; name?: string; picture?: string; id: string }) => {
        // For OAuth users, we don't provide a username initially
        // They can set it later in their profile
        return {
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          // username is not set - user can add it later
        };
      },
    },
  },

  // Session config
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },

  trustedOrigins: [
    "http://localhost:3000",
    "https://your-production-domain.com",
  ],
  plugins: [ 
    openAPI(), 
  ] 
});