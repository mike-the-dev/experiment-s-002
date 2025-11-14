import { AccountTypeFormData, CreateProfileAccountTypeInput } from "./accountProfile.schema";

/**
 * Transforms form data for API submission
 * @param data - Raw form data
 * @returns Sanitized payload with usageType
 */
export const mapAccountTypeFormData = (data: AccountTypeFormData): CreateProfileAccountTypeInput => {
  return {
    usageType: data.usageType,
  };
};

