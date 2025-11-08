import { z } from "zod";
import { SignupFormData, SignupFormErrors } from "./signup.schema";

export const firstNameFieldSchema = z
  .string()
  .min(1, "First name is required.")
  .max(100, "First name must be less than 100 characters.");

export const lastNameFieldSchema = z
  .string()
  .min(1, "Last name is required.")
  .max(100, "Last name must be less than 100 characters.");

export const emailFieldSchema = z
  .email({ message: "Please enter a valid email address." })
  .refine((email) => email && email.trim().length > 0, "Email address is required.");

export const passwordFieldSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(128, "Password must be less than 128 characters.");

export const confirmPasswordFieldSchema = z
  .string()
  .min(8, "Confirm password must be at least 8 characters.")
  .max(128, "Confirm password must be less than 128 characters.");

export const signupFormSchema = z
  .object({
    firstName: firstNameFieldSchema.trim(),
    lastName: lastNameFieldSchema.trim(),
    email: emailFieldSchema.trim().toLowerCase(),
    password: passwordFieldSchema,
    confirmPassword: confirmPasswordFieldSchema,
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match.",
        path: ["confirmPassword"],
      });
    }
  });

export type SignupFormDataZod = z.infer<typeof signupFormSchema>;

export const validateFirstName = (firstName: string): string | undefined => {
  const result = firstNameFieldSchema.safeParse(firstName);
  return result.success ? undefined : result.error.issues[0]?.message;
};

export const validateLastName = (lastName: string): string | undefined => {
  const result = lastNameFieldSchema.safeParse(lastName);
  return result.success ? undefined : result.error.issues[0]?.message;
};

export const validateEmail = (email: string): string | undefined => {
  const result = emailFieldSchema.safeParse(email);
  return result.success ? undefined : result.error.issues[0]?.message;
};

export const validatePassword = (password: string): string | undefined => {
  const result = passwordFieldSchema.safeParse(password);
  return result.success ? undefined : result.error.issues[0]?.message;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
): string | undefined => {
  if (!confirmPassword) {
    return "Confirm password is required.";
  }

  if (confirmPassword.length < 8) {
    return "Confirm password must be at least 8 characters.";
  }

  if (confirmPassword.length > 128) {
    return "Confirm password must be less than 128 characters.";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }

  return undefined;
};

export const validateSignupForm = (data: SignupFormData): SignupFormErrors => {
  const errors: SignupFormErrors = {};

  const result = signupFormSchema.safeParse(data);

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof SignupFormData;
      if (field) {
        errors[field] = issue.message;
      }
    });
  }

  return errors;
};

export const parseSignupForm = (data: unknown): SignupFormData => {
  return signupFormSchema.parse(data);
};

export const safeParseSignupForm = (data: unknown) => {
  return signupFormSchema.safeParse(data);
};

