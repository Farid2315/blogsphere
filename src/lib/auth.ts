import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Username validation function
function isValidUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9._]+$/;
  return usernameRegex.test(username) && username.length >= 3 && username.length <= 30;
}

export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET as string,
    database: prismaAdapter(prisma, {
        provider: "mongodb",
    }),
    emailAndPassword: {
        enabled: true,
        async signUp({ email, password, name, username }: { email: string; password: string; name?: string; username: string }) {
            // Validate username
            if (!username || !isValidUsername(username)) {
                throw new Error("Username must be 3-30 characters long and contain only letters, numbers, dots, and underscores");
            }

            // Check if username already exists
            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [
                        { email },
                        { username }
                    ]
                }
            });

            if (existingUser) {
                if (existingUser.email === email) {
                    throw new Error("Email already registered");
                }
                if (existingUser.username === username) {
                    throw new Error("Username already taken");
                }
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 12);

            // Create user
            const user = await prisma.user.create({
                data: {
                    email,
                    username,
                    name: name || username,
                    password: hashedPassword,
                    emailVerified: false,
                    updatedAt: new Date(),
                }
            });

            return user;
        },
        async signIn({ email, password }: { email: string; password: string }) {
            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (!user || !user.password) {
                throw new Error("Invalid credentials");
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                throw new Error("Invalid credentials");
            }

            return user;
        }
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
});