import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/axiosInterceptor";
import { handleRequest } from "@/api";
import {
  CreatePricingSetupDTO,
  CreatePricingSetupInput,
} from "./_shared/pricingSetup.schema";

// ============================================================================
// Client-side API Call Functions (includes fetches and mutations)
// ============================================================================
/**
 * @author mike-the-dev (Michael Camacho)
 * @editor mike-the-dev (Michael Camacho)
 * @lastUpdated 2025-01-27
 * @name createPricingSetup
 * @description API call to create/update pricing setup. Sends pricing setup information including payment method, lesson rate, and lesson duration.
 * @param data - The pricing setup data
 * @returns Promise resolving to the created/updated pricing setup DTO
 */
export const createPricingSetup = async (
  data: CreatePricingSetupInput
): Promise<CreatePricingSetupDTO> => {
  return handleRequest<CreatePricingSetupDTO>(
    axiosInstance.post("/profile/updatePricingSetupProfile", data)
  );
};

/**
 * @author mike-the-dev (Michael Camacho)
 * @editor mike-the-dev (Michael Camacho)
 * @lastUpdated 2025-01-27
 * @name useCreatePricingSetupMutation
 * @description TanStack Query mutation hook for creating/updating pricing setup. Wraps the createPricingSetup API call with mutation state management.
 * @returns TanStack Query mutation object with mutationFn, onError, and onSuccess handlers
 */
export const useCreatePricingSetupMutation = () => {
  return useMutation({
    mutationFn: (data: CreatePricingSetupInput) =>
      createPricingSetup(data),
    onError: (error) => {
      console.error("Pricing setup creation error:", error);
    },
    onSuccess: () => {
      console.log("Pricing setup created successfully");
    },
  });
};

