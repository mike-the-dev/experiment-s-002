/**
 * Type definitions for login feature
 */

/**
 * Form data structure for login
 */
export type LoginFormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

/**
 * Payload sent to the API for login
 */
export type LoginPayload = {
  email: string;
  password: string;
};

/**
 * Error state for login form validation
 */
export type LoginFormErrors = {
  email?: string;
  password?: string;
  [key: string]: string | undefined;
};

/**
 * API response after successful login
 */
export interface LoginUserResponse {
  authorization: {
    user: {
      account: {
        id: string;
        company: string;
        payout?: {
          stripeId?: string;
        };
      };
    };
    tokens: {
      access: string;
      refresh: string;
    };
  };
}

import { useForm } from "@tanstack/react-form";

/**
 * Field validator structure for TanStack React Form
 */
export type FieldValidator = {
  onChange: ({ value }: { value: string }) => string | undefined;
};

/**
 * Validators object for login form fields
 */
export type LoginFormValidators = {
  email: FieldValidator;
  password: FieldValidator;
};

/**
 * Return type for useSignInForm hook
 */
export type UseSignInFormReturn = {
  form: ReturnType<typeof useForm<LoginFormData>>;
  isPending: boolean;
  error: string | null;
  validators: LoginFormValidators;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  emailInputRef: React.RefObject<HTMLInputElement | null>;
};

