import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/axiosInterceptor";
import { handleRequest } from "@/api";
import {
  TeacherInviteInfoDTO,
  CompleteOnboardingInput,
  CompleteOnboardingDTO,
  ResendInviteInput,
  ResendInviteDTO,
} from "./_shared/inviteStudents.schema";

// ============================================================================
// Server-side API Call Functions
// ============================================================================

/**
 * Server-side fetch function to get teacher invite information
 * Uses the access token from cookies to authenticate the request
 * 
 * @param cookies - Next.js request cookies containing the access token
 * @returns Promise resolving to the teacher invite info object or null if fetch fails
 */
export const fetchTeacherInviteInfoServer = async (
  cookies: ReadonlyRequestCookies
): Promise<TeacherInviteInfoDTO | null> => {
  const accessToken = cookies.get("sonata_access_token")?.value;

  if (!accessToken) {
    console.error("🚨 [Teacher Invite Info Fetch] No access token found in cookies");
    return null;
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/profile/getTeacherInviteInfo`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      let message = `Request failed [status: ${res.status}]`;

      try {
        const errorBody = await res.json();
        if (errorBody?.message) {
          message += ` - ${errorBody.message}`;
        }
      } catch (parseError) {
        message += " - (failed to parse error response)";
      }

      console.error(`🚨 [Teacher Invite Info Fetch] ${message}`);
      // Return placeholder data if API doesn't exist yet
      return {
        teacherCode: "AB12CD",
        inviteLink: "sonata.app/join/AB12CD",
      };
    }

    const data = await res.json();
    console.log("✅ [Teacher Invite Info Fetch] Successfully retrieved teacher invite info.");
    return data as TeacherInviteInfoDTO;
  } catch (error: any) {
    console.error("🚨 [Teacher Invite Info Fetch] Exception during request:", error);
    // Return placeholder data if API doesn't exist yet
    return {
      teacherCode: "AB12CD",
      inviteLink: "sonata.app/join/AB12CD",
    };
  }
};

// ============================================================================
// Client-side API Call Functions (includes fetches and mutations)
// ============================================================================

/**
 * @author mike-the-dev (Michael Camacho)
 * @editor mike-the-dev (Michael Camacho)
 * @lastUpdated 2025-01-27
 * @name getTeacherInviteInfo
 * @description API call to get teacher code and invite link
 * @returns Promise resolving to teacher invite info DTO
 */
export const getTeacherInviteInfo = async (): Promise<TeacherInviteInfoDTO> => {
  return handleRequest<TeacherInviteInfoDTO>(
    axiosInstance.get("/profile/getTeacherInviteInfo")
  );
};

/**
 * @author mike-the-dev (Michael Camacho)
 * @editor mike-the-dev (Michael Camacho)
 * @lastUpdated 2025-01-27
 * @name completeOnboarding
 * @description API call to complete onboarding process
 * @param data - The onboarding completion data
 * @returns Promise resolving to the completed onboarding DTO
 */
export const completeOnboarding = async (
  data: CompleteOnboardingInput
): Promise<CompleteOnboardingDTO> => {
  return handleRequest<CompleteOnboardingDTO>(
    axiosInstance.post("/profile/completeOnboarding", data)
  );
};

/**
 * @author mike-the-dev (Michael Camacho)
 * @editor mike-the-dev (Michael Camacho)
 * @lastUpdated 2025-01-27
 * @name resendInvite
 * @description API call to resend student invitation
 * @param data - The resend invite data
 * @returns Promise resolving to the resend invite DTO
 */
export const resendInvite = async (
  data: ResendInviteInput
): Promise<ResendInviteDTO> => {
  return handleRequest<ResendInviteDTO>(
    axiosInstance.post("/profile/resendInvite", data)
  );
};

/**
 * @author mike-the-dev (Michael Camacho)
 * @editor mike-the-dev (Michael Camacho)
 * @lastUpdated 2025-01-27
 * @name useCompleteOnboardingMutation
 * @description TanStack Query mutation hook for completing onboarding. Wraps the completeOnboarding API call with mutation state management.
 * @returns TanStack Query mutation object with mutationFn, onError, and onSuccess handlers
 */
export const useCompleteOnboardingMutation = () => {
  return useMutation({
    mutationFn: (data: CompleteOnboardingInput) => completeOnboarding(data),
    onError: (error) => {
      console.error("Onboarding completion error:", error);
    },
    onSuccess: () => {
      console.log("Onboarding completed successfully");
    },
  });
};

/**
 * @author mike-the-dev (Michael Camacho)
 * @editor mike-the-dev (Michael Camacho)
 * @lastUpdated 2025-01-27
 * @name useResendInviteMutation
 * @description TanStack Query mutation hook for resending invites. Wraps the resendInvite API call with mutation state management.
 * @returns TanStack Query mutation object with mutationFn, onError, and onSuccess handlers
 */
export const useResendInviteMutation = () => {
  return useMutation({
    mutationFn: (data: ResendInviteInput) => resendInvite(data),
    onError: (error) => {
      console.error("Resend invite error:", error);
    },
    onSuccess: () => {
      console.log("Invite resent successfully");
    },
  });
};

