/**
 * Usage type for account profile
 * Represents how the teacher will use the platform
 */
export type UsageType = "own-students" | "looking-for-students";

/**
 * Payload sent to the API to create/update account profile
 */
export interface CreateProfileAccountTypeInput {
  usageType: UsageType;
}

/**
 * Response from the API after creating/updating account profile
 */
export interface CreateProfileAccountTypeDTO {
  version: number;
  updatedAt: string;
  createdAt: string;
  slug: string;
  type: "account_profile";
  usageType: UsageType;
}

/**
 * Form data structure for account type selection
 */
export type AccountTypeFormData = {
  usageType: UsageType;
};

/**
 * Error state for account type form validation
 */
export type AccountTypeFormErrors = {
  usageType?: string;
  [key: string]: string | undefined;
};

/**
 * Return type for useAccountTypeForm hook
 */
export interface UseAccountTypeFormReturn {
  selectedType: UsageType | "";
  setSelectedType: (type: UsageType) => void;
  isPending: boolean;
  error: string | null;
  handleContinue: () => Promise<void>;
  handleBack: () => void;
}

/**
 * Input for updating onboarding status
 */
export interface UpdateOnboardingStatusInput {
  onboardingState: string;
}

/**
 * Response DTO from updating onboarding status
 */
export interface UpdateOnboardingStatusDTO {
  onboardingState: string;
  updatedAt: string;
}
