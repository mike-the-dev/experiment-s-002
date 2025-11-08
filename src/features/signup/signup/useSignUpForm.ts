"use client";

import React from "react";
import { formOptions, useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { useSignUp } from "./useSignUp";
import {
  SignupFormData,
  SignupFormValidators,
  UseSignUpFormReturn,
} from "../_shared/signup.schema";
import { mapSignupFormData } from "../_shared/signup.mappers";
import {
  signupFormSchema,
  firstNameFieldSchema,
  lastNameFieldSchema,
  emailFieldSchema,
  passwordFieldSchema,
  validateConfirmPassword,
} from "../_shared/signup.validators";
import { storeAuthSession } from "@/storeAuthSession";
import { useToast } from "@/hooks/use-toast";

export const useSignUpForm = (): UseSignUpFormReturn => {
  const router = useRouter();

  const signUpService = useSignUp();
  const { toast } = useToast();
  const firstNameInputRef = React.useRef<HTMLInputElement>(null);

  const formOpts = formOptions<SignupFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      try {
        const validatedData = signupFormSchema.parse(value);
        const payload = mapSignupFormData(validatedData);

        const response = await signUpService.signUp(payload);

        if (response?.authorization) {
          storeAuthSession(response.authorization.user, {
            access: response.authorization.tokens.access,
            refresh: response.authorization.tokens.refresh,
          });
        }

        toast({
          title: "Account created!",
          description: "Your teacher account has been created successfully.",
        });

        router.push("/teacher/dashboard");
      } catch (error) {
        console.log("Sign up form submission error:", error);
      }
    },
  });

  const validators: SignupFormValidators = {
    firstName: {
      onChange: ({ value }) => {
        const result = firstNameFieldSchema.safeParse(value);
        return result.success ? undefined : result.error.issues[0]?.message;
      },
    },
    lastName: {
      onChange: ({ value }) => {
        const result = lastNameFieldSchema.safeParse(value);
        return result.success ? undefined : result.error.issues[0]?.message;
      },
    },
    email: {
      onChange: ({ value }) => {
        const result = emailFieldSchema.safeParse(value);
        return result.success ? undefined : result.error.issues[0]?.message;
      },
    },
    password: {
      onChange: ({ value }) => {
        const result = passwordFieldSchema.safeParse(value);
        return result.success ? undefined : result.error.issues[0]?.message;
      },
    },
    confirmPassword: {
      onChange: ({ value }) => {
        return validateConfirmPassword(form.state.values.password, value);
      },
    },
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      const inputElement = firstNameInputRef.current || (document.querySelector('input[name="firstName"]') as HTMLInputElement | null);
      if (inputElement) {
        inputElement.focus();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const errorMessage = signUpService.error;

  return {
    form,
    isPending: signUpService.isPending,
    error: errorMessage,
    validators,
    handleFormSubmit,
    firstNameInputRef,
  };
};

