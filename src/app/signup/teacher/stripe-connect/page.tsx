"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function StripeConnectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectStripe = () => {
    setIsConnecting(true);
    
    // TODO: Replace this with actual Stripe Express Connected Account flow
    // This is a placeholder for developers to implement the real integration
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      // Navigate to invite students page after "connection"
      router.push("/signup/teacher/invite-students");
    }, 2000);
  };

  const handleSkip = () => {
    router.push("/signup/teacher/invite-students");
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 py-12">
      {/* Background styling matching previous pages */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />

      <Card className="w-full max-w-2xl relative backdrop-blur-sm bg-white/95 shadow-xl">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Connect Your Stripe Account
          </CardTitle>
          <CardDescription className="text-base">
            Connect your Stripe account to start receiving payments from your students through Sonata.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>For Developers:</strong> This is a placeholder page. Replace the &quot;Connect with Stripe&quot; button functionality with the actual Stripe Express Connected Account onboarding flow.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 space-y-3">
              <h3 className="font-semibold text-lg text-gray-900">What you&apos;ll need:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Your business or personal information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Bank account details for payouts</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Tax information (SSN or EIN)</span>
                </li>
              </ul>
            </div>

            <div className="text-sm text-gray-600 space-y-2">
              <p>
                Sonata uses Stripe to ensure secure payments and fast payouts. Your financial information is never stored on Sonata&apos;s servers.
              </p>
              <p>
                You can complete this setup later from your account settings if you prefer.
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              variant="outline"
              onClick={handleSkip}
              className="flex-1"
              disabled={isConnecting}
            >
              Skip for Now
            </Button>
            <Button
              onClick={handleConnectStripe}
              disabled={isConnecting}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isConnecting ? "Connecting..." : "Connect with Stripe"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

