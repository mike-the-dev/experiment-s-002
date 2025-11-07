import { z } from "zod";
import { LoginFormData, LoginFormErrors } from "./login.schema";

/**
 * Individual field schemas for real-time validation (without transformations)
 * Using Zod v4 API: z.email() is now a top-level function
 */
export const emailFieldSchema = z
  .email({ message: "Please enter a valid email address." })
  .refine((email) => email && email.trim().length > 0, "Email address is required.");

export const passwordFieldSchema = z
  .string()
  .min(1, "Password is required.")
  .min(6, "Password must be at least 6 characters.");

/**
 * Full form schema for submission validation (with transformations)
 */
export const loginFormSchema = z.object({
  email: emailFieldSchema.trim().toLowerCase(),
  password: passwordFieldSchema,
  rememberMe: z.boolean().default(false),
});

/**
 * Infer TypeScript type from Zod schema
 */
export type LoginFormDataZod = z.infer<typeof loginFormSchema>;

/**
 * Validates the email format using Zod
 * @param email - Email address to validate
 * @returns Error message or undefined if valid
 */
export const validateEmail = (email: string): string | undefined => {
  const result = emailFieldSchema.safeParse(email);
  if (!result.success) {
    return result.error.issues[0]?.message;
  }
  return undefined;
};

/**
 * Validates the password using Zod
 * @param password - Password to validate
 * @returns Error message or undefined if valid
 */
export const validatePassword = (password: string): string | undefined => {
  const result = passwordFieldSchema.safeParse(password);
  if (!result.success) {
    return result.error.issues[0]?.message;
  }
  return undefined;
};

/**
 * Validates all form fields using Zod schema
 * @param data - Form data to validate
 * @returns Object containing validation errors
 */
export const validateLoginForm = (data: LoginFormData): LoginFormErrors => {
  const errors: LoginFormErrors = {};
  
  const result = loginFormSchema.safeParse(data);
  
  if (!result.success) {
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      if (field && typeof field === "string") {
        errors[field] = issue.message;
      }
    });
  }
  
  return errors;
};

/**
 * Validates and parses form data using Zod
 * Returns the parsed data if valid, throws if invalid
 * @param data - Form data to validate and parse
 * @returns Parsed and validated form data
 */
export const parseLoginForm = (data: unknown): LoginFormData => {
  return loginFormSchema.parse(data);
};

/**
 * Safely validates and parses form data using Zod
 * Returns success/error result instead of throwing
 * @param data - Form data to validate and parse
 * @returns Success result with parsed data or error result
 */
export const safeParseLoginForm = (data: unknown) => {
  return loginFormSchema.safeParse(data);
};
