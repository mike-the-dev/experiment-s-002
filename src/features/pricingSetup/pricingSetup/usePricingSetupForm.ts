"use client";

import React from "react";
import { formOptions, useForm } from "@tanstack/react-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useCreatePricingSetup } from "../create/useCreatePricingSetup";
import { useUpdateOnboardingStatus } from "@/features/accountProfile/update/useUpdateOnboardingStatus";
import {
  PricingSetupFormData,
  PricingSetupFormValidators,
  UsePricingSetupFormReturn,
  PaymentMethod,
  LessonDuration,
} from "../_shared/pricingSetup.schema";
import { mapPricingSetupFormData } from "../_shared/pricingSetup.mappers";
import {
  pricingSetupFormSchema,
  validatePaymentMethod,
  validateLessonRate,
  validateLessonDuration,
} from "../_shared/pricingSetup.validators";
import { useToast } from "@/hooks/use-toast";
import { OnboardingState } from "@/types/onboarding";

interface UsePricingSetupFormProps {
  accountType?: string;
}

export const usePricingSetupForm = ({
  accountType = "teacher",
}: UsePricingSetupFormProps): UsePricingSetupFormReturn => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { isPending, error, createPricingSetup } = useCreatePricingSetup();
  const {
    isPending: isUpdatingOnboardingStatus,
    updateOnboardingStatus,
  } = useUpdateOnboardingStatus();

  const formOpts = formOptions<PricingSetupFormData>({
    defaultValues: {
      paymentMethod: "sonata" as PaymentMethod,
      lessonRate: "",
      lessonDuration: "",
    },
  });

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      try {
        // Get current payment method for conditional validation
        const paymentMethod = value.paymentMethod as PaymentMethod | null;

        const validatedData = pricingSetupFormSchema.parse({
          paymentMethod: paymentMethod || undefined,
          lessonRate:
            paymentMethod === "sonata" ? value.lessonRate : undefined,
          lessonDuration:
            paymentMethod === "sonata" ? value.lessonDuration : undefined,
        });

        const payload = mapPricingSetupFormData({
          paymentMethod: validatedData.paymentMethod as PaymentMethod,
          lessonRate: validatedData.lessonRate || "",
          lessonDuration: (validatedData.lessonDuration as LessonDuration) || "",
        });

        const response = await createPricingSetup(payload);

        if (response) {
          toast({
            title: "Pricing setup saved!",
            description: "Your pricing setup has been saved successfully.",
          });

          // Navigate based on payment method
          if (payload.paymentMethod === "sonata") {
            router.push("/signup/teacher/stripe-connect");
          } else {
            router.push("/signup/teacher/invite-students");
          }
        }
      } catch (error) {
        console.error("Pricing setup form submission error:", error);
      }
    },
  });

  const validators: PricingSetupFormValidators = {
    paymentMethod: {
      onChange: ({ value }) => validatePaymentMethod(value),
    },
    lessonRate: {
      onChange: ({ value }) => {
        const paymentMethod = form.state.values.paymentMethod;
        return validateLessonRate(value, paymentMethod);
      },
    },
    lessonDuration: {
      onChange: ({ value }) => {
        const paymentMethod = form.state.values.paymentMethod;
        return validateLessonDuration(value, paymentMethod);
      },
    },
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  const handleBack = async (): Promise<void> => {
    try {
      // Update onboarding state to the previous step (teaching_profile)
      const response = await updateOnboardingStatus({
        onboardingState: OnboardingState.TEACHING_PROFILE,
      });

      if (response) router.push("/signup/teacher/teaching-profile");
    } catch (error) {
      console.error("Failed to update onboarding status:", error);
    }
  };

  const errorMessage = error
    ? typeof error === "string"
      ? error
      : (error as Error)?.message || "An error occurred"
    : null;

  // Combine pending states from both mutations
  const isPendingState = isPending || isUpdatingOnboardingStatus;

  return {
    form,
    isPending: isPendingState,
    error: errorMessage,
    validators,
    handleFormSubmit,
    handleBack,
  };
};

