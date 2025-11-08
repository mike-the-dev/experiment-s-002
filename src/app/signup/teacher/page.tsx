import { BackToHomeButton } from "@/components/pages/SignUp/BackToHomeButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music } from "lucide-react";
import { Form } from "@/components/pages/SignUp/Form";

export default function SignupPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Background gradient orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-blue-400 opacity-20 blur-3xl" />
        <div className="absolute -right-40 top-1/4 h-96 w-96 rounded-full bg-purple-400 opacity-20 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 h-80 w-80 rounded-full bg-pink-400 opacity-20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Back button */}
          <BackToHomeButton className="mb-6 hover:bg-white/50" />

          <Card className="border-2 border-white/60 bg-white/80 backdrop-blur-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600">
                <Music className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold">
                Create your teacher account
              </CardTitle>
              <CardDescription className="text-base">
                Start managing your music lessons with ease
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

