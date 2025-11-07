import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/pages/SignIn/Form";

export default function Signin() {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background styling */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20" />
      <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20" />
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20" />

      <Card className="w-full max-w-md relative backdrop-blur-sm bg-white/95 shadow-xl">
        <CardHeader className="text-center space-y-4">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">S</span>
            </div>
          </div>
          
          <div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Welcome back to Sonata
            </CardTitle>
            <CardDescription className="mt-2">
              Sign in to your teaching studio.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Form />

          <div className="mt-6 text-center">
            <Link
              href="/support"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Need help? Contact support
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

