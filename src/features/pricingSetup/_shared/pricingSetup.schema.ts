import { useForm } from "@tanstack/react-form";

/**
 * Payment method options for pricing setup
 */
export type PaymentMethod = "sonata" | "own";

/**
 * Lesson duration options
 */
export type LessonDuration = "30" | "45" | "60";

/**
 * Payload sent to the API to create/update pricing setup
 */
export interface CreatePricingSetupInput {
  paymentMethod: PaymentMethod;
  lessonRate?: number;
  lessonDuration?: LessonDuration;
}

/**
 * Response from the API after creating/updating pricing setup
 */
export interface CreatePricingSetupDTO {
  version: number;
  updatedAt: string;
  createdAt: string;
  slug: string;
  type: "pricing_setup";
  paymentMethod: PaymentMethod;
  lessonRate?: number;
  lessonDuration?: LessonDuration;
}

/**
 * Form data structure for pricing setup
 */
export interface PricingSetupFormData {
  paymentMethod: PaymentMethod | null;
  lessonRate: string;
  lessonDuration: LessonDuration | "";
}

/**
 * Error state for pricing setup form validation
 */
export type PricingSetupFormErrors = {
  paymentMethod?: string;
  lessonRate?: string;
  lessonDuration?: string;
  [key: string]: string | undefined;
};

/**
 * Field validator type for TanStack Form
 */
export type FieldValidator<T> = {
  onChange: ({ value }: { value: T }) => string | undefined;
};

/**
 * Validators for pricing setup form fields
 */
export type PricingSetupFormValidators = {
  paymentMethod: FieldValidator<PaymentMethod | null>;
  lessonRate: FieldValidator<string>;
  lessonDuration: FieldValidator<string>;
};

/**
 * Return type for usePricingSetupForm hook
 */
export interface UsePricingSetupFormReturn {
  form: ReturnType<typeof useForm<PricingSetupFormData>>;
  isPending: boolean;
  error: string | null;
  validators: PricingSetupFormValidators;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleBack: () => void | Promise<void>;
}

