import { useForm } from "@tanstack/react-form";

export type SignupFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignupPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type SignupFormErrors = Partial<Record<keyof SignupFormData, string>>;

export interface SignupResponse {
  authorization?: {
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
  message?: string;
}

export type FieldValidator = {
  onChange: ({ value }: { value: string }) => string | undefined;
};

export type SignupFormValidators = {
  firstName: FieldValidator;
  lastName: FieldValidator;
  email: FieldValidator;
  password: FieldValidator;
  confirmPassword: FieldValidator;
};

export type UseSignUpFormReturn = {
  form: ReturnType<typeof useForm<SignupFormData>>;
  isPending: boolean;
  error: string | null;
  validators: SignupFormValidators;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  firstNameInputRef: React.RefObject<HTMLInputElement | null>;
};

