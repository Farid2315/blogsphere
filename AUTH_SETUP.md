# Better Auth Setup Guide for BlogSphere

This guide will help you set up Better Auth with email/password and Google OAuth authentication for your BlogSphere application.

## 🚀 Quick Start

### 1. Environment Variables

Create a `.env.local` file in your project root and add the following variables:

```env
# Better Auth Configuration
BETTER_AUTH_SECRET=nKMwH3I5gj7VBB5Y6vEP5unQWUvk51S7
BETTER_AUTH_URL=http://localhost:3000

# Database
DATABASE_URL="mongodb://localhost:27017/blogsphere"

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

### 2. Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set up the OAuth consent screen
6. Choose "Web application" as the application type
7. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
8. Copy the Client ID and Client Secret to your `.env.local` file

### 3. Database Setup

Make sure you have MongoDB running locally or use a cloud service like MongoDB Atlas.

```bash
# If using local MongoDB
mongod

# Generate Prisma client
npx prisma generate

# Push the schema to your database
npx prisma db push
```

### 4. Generate Better Auth Files

Run the Better Auth CLI to generate the necessary database tables:

```bash
npx @better-auth/cli generate
```

## 📁 File Structure

```
src/
├── lib/
│   ├── auth.ts              # Better Auth configuration
│   ├── auth-client.ts       # Client-side auth instance
│   └── utils.ts             # Utility functions
├── app/
│   ├── api/auth/[...all]/route.ts  # Auth API routes
│   ├── login/page.tsx       # Login page
│   ├── signup/page.tsx      # Signup page
│   └── dashboard/page.tsx   # Protected dashboard
├── components/
│   └── auth/
│       ├── auth-form.tsx    # Authentication form component
│       └── session-provider.tsx  # Session provider
└── app/layout.tsx           # Root layout with SessionProvider
```

## 🔧 Configuration Details

### Auth Configuration (`src/lib/auth.ts`)

```typescript
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "mongodb",
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
});
```

### Client Configuration (`src/lib/auth-client.ts`)

```typescript
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000"
});

export const { signIn, signUp, useSession, signOut } = authClient;
```

## 🎯 Usage Examples

### Using the Session Hook

```typescript
import { useSession } from "@/lib/auth-client";

function MyComponent() {
  const { data: session, isLoading } = useSession();
  
  if (isLoading) return <div>Loading...</div>;
  if (!session) return <div>Please sign in</div>;
  
  return <div>Welcome, {session.user?.email}!</div>;
}
```

### Sign In/Up Functions

```typescript
import { signIn, signUp } from "@/lib/auth-client";

// Email/Password authentication
await signIn("emailAndPassword", { email, password });
await signUp("emailAndPassword", { email, password });

// Google OAuth
await signIn("google");

// Sign out
await signOut();
```

### Protected Routes

```typescript
"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage() {
  const { data: session, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !session) {
      router.push("/login");
    }
  }, [session, isLoading, router]);

  if (isLoading) return <div>Loading...</div>;
  if (!session) return null;

  return <div>Protected content here</div>;
}
```

## 🚀 Running the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your environment variables in `.env.local`

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000` to see your application

## 🔒 Security Notes

- Never commit your `.env.local` file to version control
- Use strong, unique secrets for `BETTER_AUTH_SECRET`
- In production, use HTTPS and update the `BETTER_AUTH_URL` accordingly
- Regularly rotate your OAuth client secrets

## 🐛 Troubleshooting

### Common Issues

1. **"Module not found: Can't resolve '@/lib/utils'"**
   - Make sure `src/lib/utils.ts` exists and exports the `cn` function

2. **"Cannot find module '@prisma/client'"**
   - Run `npx prisma generate` to generate the Prisma client

3. **Google OAuth not working**
   - Verify your redirect URIs are correct
   - Check that your Google OAuth credentials are properly set in environment variables

4. **Database connection issues**
   - Ensure MongoDB is running
   - Verify your `DATABASE_URL` is correct
   - Run `npx prisma db push` to sync your schema

### Getting Help

- Check the [Better Auth documentation](https://better-auth.com/)
- Review the [Prisma documentation](https://www.prisma.io/docs/)
- Check the console for detailed error messages

## 🎉 Next Steps

Now that authentication is set up, you can:

1. Create protected routes for your blog posts
2. Add user profiles and settings
3. Implement role-based access control
4. Add more social providers (GitHub, Twitter, etc.)
5. Customize the authentication UI to match your brand

Happy coding! 🚀 