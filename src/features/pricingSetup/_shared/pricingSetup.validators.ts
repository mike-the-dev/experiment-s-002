import { z } from "zod";
import {
  PricingSetupFormData,
  PricingSetupFormErrors,
  PaymentMethod,
  LessonDuration,
} from "./pricingSetup.schema";

/**
 * Payment method enum schema for validation
 */
export const paymentMethodSchema = z.enum(["sonata", "own"], {
  message: "Please select a payment method.",
});

/**
 * Lesson duration enum schema for validation
 */
export const lessonDurationSchema = z.enum(["30", "45", "60"], {
  message: "Please select a lesson duration.",
});

/**
 * Individual field schemas for real-time validation
 */
export const paymentMethodFieldSchema = paymentMethodSchema;

export const lessonRateFieldSchema = z
  .string()
  .min(1, "Lesson rate is required when using Sonata payments.")
  .refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    },
    {
      message: "Lesson rate must be a positive number.",
    }
  )
  .refine(
    (val) => {
      const num = parseFloat(val);
      return num >= 1 && num <= 10000;
    },
    {
      message: "Lesson rate must be between $1 and $10,000.",
    }
  )
  .optional();

export const lessonDurationFieldSchema = lessonDurationSchema.optional();

/**
 * Full form schema for submission validation
 */
export const pricingSetupFormSchema = z
  .object({
    paymentMethod: paymentMethodFieldSchema,
    lessonRate: lessonRateFieldSchema,
    lessonDuration: lessonDurationFieldSchema,
  })
  .refine(
    (data) => {
      // If payment method is "sonata", lessonRate and lessonDuration are required
      if (data.paymentMethod === "sonata") {
        return (
          data.lessonRate !== undefined &&
          data.lessonRate !== "" &&
          data.lessonDuration !== undefined
        );
      }
      return true;
    },
    {
      message: "Lesson rate and duration are required when using Sonata payments.",
      path: ["lessonRate"],
    }
  );

/**
 * Infer TypeScript type from Zod schema
 */
export type PricingSetupFormDataZod = z.infer<typeof pricingSetupFormSchema>;

/**
 * Validates the payment method using Zod
 * @param paymentMethod - Payment method to validate
 * @returns Error message or undefined if valid
 */
export const validatePaymentMethod = (
  paymentMethod: PaymentMethod | null
): string | undefined => {
  if (!paymentMethod) {
    return "Please select a payment method.";
  }
  const result = paymentMethodFieldSchema.safeParse(paymentMethod);
  if (!result.success) {
    return result.error.issues[0]?.message;
  }
  return undefined;
};

/**
 * Validates the lesson rate using Zod
 * @param lessonRate - Lesson rate to validate
 * @param paymentMethod - Current payment method to determine if rate is required
 * @returns Error message or undefined if valid
 */
export const validateLessonRate = (
  lessonRate: string,
  paymentMethod: PaymentMethod | null
): string | undefined => {
  // If payment method is not "sonata", rate is optional
  if (paymentMethod !== "sonata") {
    return undefined;
  }

  // If payment method is "sonata", rate is required
  if (!lessonRate || lessonRate.trim() === "") {
    return "Lesson rate is required when using Sonata payments.";
  }

  const result = lessonRateFieldSchema.safeParse(lessonRate);
  if (!result.success) {
    return result.error.issues[0]?.message;
  }
  return undefined;
};

/**
 * Validates the lesson duration using Zod
 * @param lessonDuration - Lesson duration to validate
 * @param paymentMethod - Current payment method to determine if duration is required
 * @returns Error message or undefined if valid
 */
export const validateLessonDuration = (
  lessonDuration: string,
  paymentMethod: PaymentMethod | null
): string | undefined => {
  // If payment method is not "sonata", duration is optional
  if (paymentMethod !== "sonata") {
    return undefined;
  }

  // If payment method is "sonata", duration is required
  if (!lessonDuration || lessonDuration.trim() === "") {
    return "Lesson duration is required when using Sonata payments.";
  }

  const result = lessonDurationFieldSchema.safeParse(lessonDuration);
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
export const validatePricingSetupForm = (
  data: PricingSetupFormData
): PricingSetupFormErrors => {
  const errors: PricingSetupFormErrors = {};

  // Convert form data to a format that matches the schema
  const schemaData = {
    paymentMethod: data.paymentMethod || undefined,
    lessonRate: data.paymentMethod === "sonata" ? data.lessonRate : undefined,
    lessonDuration:
      data.paymentMethod === "sonata" ? data.lessonDuration : undefined,
  };

  const result = pricingSetupFormSchema.safeParse(schemaData);

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
export const parsePricingSetupForm = (data: unknown): PricingSetupFormData => {
  const parsed = pricingSetupFormSchema.parse(data);
  return {
    paymentMethod: parsed.paymentMethod as PaymentMethod,
    lessonRate: parsed.lessonRate || "",
    lessonDuration: (parsed.lessonDuration as LessonDuration) || "",
  };
};

/**
 * Safely validates and parses form data using Zod
 * Returns success/error result instead of throwing
 * @param data - Form data to validate and parse
 * @returns Success result with parsed data or error result
 */
export const safeParsePricingSetupForm = (data: unknown) => {
  return pricingSetupFormSchema.safeParse(data);
};

