"use client";

import React from "react";
import { formOptions, useForm } from "@tanstack/react-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useSignIn } from "./useSignIn";
import { LoginFormData, UseSignInFormReturn, LoginFormValidators } from "../_shared/login.schema";
import { mapLoginFormData } from "../_shared/login.mappers";
import { loginFormSchema, emailFieldSchema, passwordFieldSchema } from "../_shared/login.validators";
import { storeAuthSession } from "@/storeAuthSession";
import { useToast } from "@/hooks/use-toast";

export const useSignInForm = (): UseSignInFormReturn => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accountType = (searchParams?.get("type") as "teacher" | "student" | null);
  const signInService = useSignIn();
  const { toast } = useToast();
  const emailInputRef = React.useRef<HTMLInputElement>(null);

  const formOpts = formOptions<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      try {
        // Validate entire form with Zod before mapping
        const validatedData = loginFormSchema.parse(value);
        
        // Sanitize and map form data
        const sanitizedData = mapLoginFormData(validatedData);
        console.log("📦 Signing in with data:", sanitizedData);

        const res = await signInService.signIn(sanitizedData);
        console.log("✅ Sign in response:", res);

        if (res?.authorization) {
          // Store authentication session
          storeAuthSession(res.authorization.user, {
            access: res.authorization.tokens.access,
            refresh: res.authorization.tokens.refresh,
          });

          // Show success message
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          });

          // Navigate based on account type
          if (accountType === "student") {
            router.push("/student/dashboard");
          } else {
            router.push("/dashboard");
          }
        }
      } catch (error: any) {
        console.log("Form submission error: ", error);
      }
    },
  });

  // Validators using Zod - validates one field at a time as user types
  const validators: LoginFormValidators = {
    email: {
      onChange: ({ value }: { value: string }) => {
        // Use individual field schema for real-time validation
        const result = emailFieldSchema.safeParse(value);
        if (!result.success) {
          return result.error.issues[0]?.message;
        }
        return undefined;
      },
    },
    password: {
      onChange: ({ value }: { value: string }) => {
        // Use individual field schema for real-time validation
        const result = passwordFieldSchema.safeParse(value);
        if (!result.success) {
          return result.error.issues[0]?.message;
        }
        return undefined;
      },
    },
  };

  // Form submit handler
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  // Auto-focus on Email input field when component mounts
  React.useEffect(() => {
    // Small delay to ensure the input is rendered
    const timer = setTimeout(() => {
      // Try ref first, then fallback to querySelector
      const inputElement = emailInputRef.current ||
        (document.querySelector('input[name="email"]') as HTMLInputElement);

      if (inputElement) {
        inputElement.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // When error exists, it's always an Error from handleRequest
  const errorMessage = signInService.error;

  return {
    form: form,
    isPending: signInService.isPending,
    error: errorMessage,
    validators: validators,
    handleFormSubmit: handleFormSubmit,
    emailInputRef: emailInputRef,
  };
};
