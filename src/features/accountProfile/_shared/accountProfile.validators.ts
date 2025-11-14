import { z } from "zod";
import { AccountTypeFormData, AccountTypeFormErrors, UsageType } from "./accountProfile.schema";

/**
 * Usage type enum schema for validation
 */
export const usageTypeSchema = z.enum(["own-students", "looking-for-students"], {
  message: "Please select an account type.",
});

/**
 * Individual field schema for real-time validation
 */
export const usageTypeFieldSchema = usageTypeSchema;

/**
 * Full form schema for submission validation
 */
export const accountTypeFormSchema = z.object({
  usageType: usageTypeSchema,
});

/**
 * Infer TypeScript type from Zod schema
 */
export type AccountTypeFormDataZod = z.infer<typeof accountTypeFormSchema>;

/**
 * Validates the usage type using Zod
 * @param usageType - Usage type to validate
 * @returns Error message or undefined if valid
 */
export const validateUsageType = (usageType: string): string | undefined => {
  const result = usageTypeFieldSchema.safeParse(usageType);
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
export const validateAccountTypeForm = (data: AccountTypeFormData): AccountTypeFormErrors => {
  const errors: AccountTypeFormErrors = {};

  const result = accountTypeFormSchema.safeParse(data);

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
export const parseAccountTypeForm = (data: unknown): AccountTypeFormData => {
  return accountTypeFormSchema.parse(data);
};

/**
 * Safely validates and parses form data using Zod
 * Returns success/error result instead of throwing
 * @param data - Form data to validate and parse
 * @returns Success result with parsed data or error result
 */
export const safeParseAccountTypeForm = (data: unknown) => {
  return accountTypeFormSchema.safeParse(data);
};

