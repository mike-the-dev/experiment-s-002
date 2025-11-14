"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Search } from "lucide-react";
import { useAccountTypeForm } from "@/features/accountProfile/accountType/useAccountTypeForm";

interface AccountTypeFormProps {
  accountType?: string;
}

export function AccountTypeForm({ accountType = "teacher" }: AccountTypeFormProps) {
  const {
    selectedType,
    setSelectedType,
    isPending,
    handleContinue,
  } = useAccountTypeForm({ accountType });

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background styling matching signup page */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

      <Card className="w-full max-w-2xl relative backdrop-blur-sm bg-white/95 shadow-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Let&apos;s personalize your Sonata experience.
          </CardTitle>
          <CardDescription className="text-base">
            Choose how you&apos;ll be using the platform. You can update this anytime later from your account settings — completely free.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {/* I'm bringing my own students */}
            <button
              onClick={() => setSelectedType("own-students")}
              disabled={isPending}
              className={`p-6 rounded-lg border-2 transition-all text-left ${
                selectedType === "own-students"
                  ? "border-purple-600 bg-purple-50"
                  : "border-gray-200 hover:border-purple-300"
              } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`p-4 rounded-full ${
                  selectedType === "own-students" ? "bg-purple-600" : "bg-gray-200"
                }`}>
                  <Users className={`h-8 w-8 ${
                    selectedType === "own-students" ? "text-white" : "text-gray-600"
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">I&apos;m bringing my own students</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your existing studio and students
                  </p>
                </div>
              </div>
            </button>

            {/* Looking for music students - Disabled */}
            <div className="p-6 rounded-lg border-2 border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed text-left">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 rounded-full bg-gray-300">
                  <Search className="h-8 w-8 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Looking for music students</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Find new students directly through Sonata
                  </p>
                  <p className="text-xs text-purple-600 font-medium">Coming soon</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleContinue}
              disabled={!selectedType || isPending}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Saving..." : "Continue"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

