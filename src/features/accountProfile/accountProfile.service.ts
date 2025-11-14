import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/axiosInterceptor";
import { handleRequest } from "@/api";
import {
  CreateProfileAccountTypeInput,
  CreateProfileAccountTypeDTO,
  UpdateOnboardingStatusInput,
  UpdateOnboardingStatusDTO,
} from "./_shared/accountProfile.schema";

/**
 * API call to create/update account profile with usage type
 * @param data - The account profile data containing usageType
 * @returns Promise resolving to the created/updated account profile DTO
 */
export const createAccountProfile = async (
  data: CreateProfileAccountTypeInput
): Promise<CreateProfileAccountTypeDTO> => {
  return handleRequest<CreateProfileAccountTypeDTO>(
    axiosInstance.post("/profile/createProfile", data)
  );
};

/**
 * TanStack Query mutation hook for creating/updating account profile
 */
export const useCreateAccountProfileMutation = () => {
  return useMutation({
    mutationFn: (data: CreateProfileAccountTypeInput) =>
      createAccountProfile(data),
    onError: (error) => {
      console.error("Account profile creation error:", error);
    },
    onSuccess: () => {
      console.log("Account profile created successfully");
    },
  });
};

/**
 * API call to update onboarding status
 * @param data - The onboarding status update data
 * @returns Promise resolving to the updated onboarding status DTO
 */
export const updateOnboardingStatus = async (
  data: UpdateOnboardingStatusInput
): Promise<UpdateOnboardingStatusDTO> => {
  return handleRequest<UpdateOnboardingStatusDTO>(
    axiosInstance.patch("/profile/updateOnboardingStatus", data)
  );
};

/**
 * TanStack Query mutation hook for updating onboarding status
 */
export const useUpdateOnboardingStatusMutation = () => {
  return useMutation({
    mutationFn: (data: UpdateOnboardingStatusInput) =>
      updateOnboardingStatus(data),
    onError: (error) => {
      console.error("Onboarding status update error:", error);
    },
    onSuccess: () => {
      console.log("Onboarding status updated successfully");
    },
  });
};

