"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateAccountProfile } from "../create/useCreateAccountProfile";
import { UsageType, UseAccountTypeFormReturn } from "../_shared/accountProfile.schema";
import { useToast } from "@/hooks/use-toast";
import { useUpdateOnboardingStatus } from "../update/useUpdateOnboardingStatus";
import { OnboardingState } from "@/types/onboarding";

interface UseAccountTypeFormProps {
  accountType?: string;
}

export const useAccountTypeForm = ({
  accountType = "teacher",
}: UseAccountTypeFormProps): UseAccountTypeFormReturn => {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<UsageType | "">("");
  const { isPending, error, createAccountProfile } = useCreateAccountProfile();
  const { updateOnboardingStatus } = useUpdateOnboardingStatus();

  const handleContinue = async (): Promise<void> => {
    if (!selectedType) {
      return;
    }

    // At this point, selectedType is guaranteed to be a UsageType (not empty string)
    const usageType = selectedType as UsageType;

    try {
      const response = await createAccountProfile({
        usageType,
      });

      if (response) {
        toast({
          title: "Account type saved!",
          description: "Your account type has been saved successfully.",
        });

        // Navigate to the next step in onboarding
        router.push(`/signup/teacher/teaching-profile?type=${accountType}`);
      }
    } catch (error: any) {
      // Check if this is the 409 "Profile already exists" error
      if (error?.isProfileExists || error?.message === "Profile already exists for this account. Use update endpoint instead.") {
        // Profile already exists, update onboarding status to next step and forward
        try {
          const response = await updateOnboardingStatus({
            onboardingState: OnboardingState.TEACHING_PROFILE,
          });

          if (response) {
            router.push(`/signup/teacher/teaching-profile?type=${accountType}`);
          }
        } catch (updateError) {
          console.error("Failed to update onboarding status:", updateError);
          // Still redirect even if update fails
          router.push(`/signup/teacher/teaching-profile?type=${accountType}`);
        }
      } else {
        // Other errors are already handled in the hook with toast
        console.error("Failed to save account type:", error);
      }
    }
  };

  const handleBack = (): void => {
    router.push("/");
  };

  return {
    selectedType,
    setSelectedType,
    isPending,
    error,
    handleContinue,
    handleBack,
  };
};

