import { useMutation, useQuery, QueryClient, dehydrate, type DehydratedState } from "@tanstack/react-query";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import axiosInstance from "@/axiosInterceptor";
import { handleRequest } from "@/api";
import {
  CreateTeachingProfileDTO,
} from "./_shared/teacherProfile.schema";

// ============================================================================
// Client-side API Call Functions (includes fetches and mutations)
// ============================================================================
/**
 * @author mike-the-dev (Michael Camacho)
 * @editor mike-the-dev (Michael Camacho)
 * @lastUpdated 2025-01-27
 * @name createTeachingProfile
 * @description API call to create/update teaching profile. Sends FormData with profile information including instruments, lesson format, experience, location, bio, and optional profile picture.
 * @param formData - The teaching profile data as FormData (multipart/form-data)
 * @returns Promise resolving to the created/updated teaching profile DTO
 */
export const createTeachingProfile = async (
  formData: FormData
): Promise<CreateTeachingProfileDTO> => {
  return handleRequest<CreateTeachingProfileDTO>(
    axiosInstance.post("/profile/updateTeachingProfile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  );
};

/**
 * @author mike-the-dev (Michael Camacho)
 * @editor mike-the-dev (Michael Camacho)
 * @lastUpdated 2025-01-27
 * @name fetchTeachingProfile
 * @description Client-side API call to fetch the teaching profile for the current authenticated user.
 * @returns Promise resolving to the teaching profile DTO
 */
export const fetchTeachingProfile = async (): Promise<CreateTeachingProfileDTO> => {
  return handleRequest<CreateTeachingProfileDTO>(
    axiosInstance.get("/profile/getTeachingProfile")
  );
};

/**
 * @author mike-the-dev (Michael Camacho)
 * @editor mike-the-dev (Michael Camacho)
 * @lastUpdated 2025-01-27
 * @name useCreateTeachingProfileMutation
 * @description TanStack Query mutation hook for creating/updating teaching profile. Wraps the createTeachingProfile API call with mutation state management.
 * @returns TanStack Query mutation object with mutationFn, onError, and onSuccess handlers
 */
export const useCreateTeachingProfileMutation = () => {
  return useMutation({
    mutationFn: (formData: FormData) =>
      createTeachingProfile(formData),
    onError: (error) => {
      console.error("Teaching profile creation error:", error);
    },
    onSuccess: () => {
      console.log("Teaching profile created successfully");
    },
  });
};

// ============================================================================
// TanStack Query Hook for fetching teaching profile
// ============================================================================
/**
 * @author mike-the-dev (Michael Camacho)
 * @editor mike-the-dev (Michael Camacho)
 * @lastUpdated 2025-01-27
 * @name useFetchTeachingProfile
 * @description TanStack Query hook for fetching the teaching profile. Uses the same queryKey as the server-side prefetch, allowing it to read from the dehydrated cache.
 * @returns TanStack Query object with teaching profile data, loading state, and error state
 */
export const useFetchTeachingProfile = () => {
  return useQuery<CreateTeachingProfileDTO, Error>({
    queryKey: ["teaching-profile"],
    queryFn: () => fetchTeachingProfile(),
  });
};

// ============================================================================
// Server-side Fetch Function
// ============================================================================
/**
 * @author mike-the-dev (Michael Camacho)
 * @editor mike-the-dev (Michael Camacho)
 * @lastUpdated 2025-01-27
 * @name fetchTeachingProfileServer
 * @description Fetches the teaching profile for the current user from the server-side.
 * Uses the access token from cookies to authenticate the request.
 * @param cookies - Next.js request cookies containing the access token
 * @returns Promise resolving to the teaching profile object or null if fetch fails
 */
export const fetchTeachingProfileServer = async (
  cookies: ReadonlyRequestCookies
): Promise<CreateTeachingProfileDTO | null> => {
  const accessToken = cookies.get("sonata_access_token")?.value;

  if (!accessToken) {
    console.error("🚨 [Teaching Profile Fetch] No access token found in cookies");
    return null;
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/profile/getTeachingProfile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        next: {
          revalidate: 300, // 5 minutes
          tags: ["teaching-profile"]
        },
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

      console.error(`🚨 [Teaching Profile Fetch] ${message}`);
      return null;
    }

    const data = await res.json();
    console.log("✅ [Teaching Profile Fetch] Successfully retrieved teaching profile data.", data);
    return data as CreateTeachingProfileDTO;
  } catch (error: any) {
    console.error("🚨 [Teaching Profile Fetch] Exception during request:", error);
    return null;
  }
};

// ============================================================================
// Server-side Prefetch Function
// ============================================================================
/**
 * @author mike-the-dev (Michael Camacho)
 * @editor mike-the-dev (Michael Camacho)
 * @lastUpdated 2025-01-27
 * @name prefetchTeachingProfile
 * @description Prefetches the teaching profile for the current user on the server-side.
 * Uses TanStack Query to cache the data for client-side hydration.
 * @param cookies - Next.js request cookies containing the access token
 * @returns Promise resolving to dehydrated state for TanStack Query hydration
 */
export const prefetchTeachingProfile = async (
  cookies: ReadonlyRequestCookies
): Promise<DehydratedState> => {
  const queryClient = new QueryClient();

  await queryClient.fetchQuery<CreateTeachingProfileDTO | null>({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ["teaching-profile"],
    queryFn: () => fetchTeachingProfileServer(cookies),
  });

  return dehydrate(queryClient);
};

