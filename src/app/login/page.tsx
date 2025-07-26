import { AuthForm } from "@/components/auth/auth-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to your BlogSphere account
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
} 