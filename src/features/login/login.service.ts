import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/axiosInterceptor";
import { handleRequest } from "@/api";
import { LoginPayload, LoginUserResponse } from "./_shared/login.schema";

// ============================================================================
// Utility function for x-client-domain header
// ============================================================================
const getClientDomainHeader = () => ({
  "x-client-domain": process.env.NODE_ENV === "development"
    ? "localhost"
    : (typeof window !== "undefined" ? window.location.hostname : ""),
});

// ============================================================================
// Client-side API Call Functions
// ============================================================================
export const loginUser = async (data: LoginPayload): Promise<LoginUserResponse> => {
  return handleRequest<LoginUserResponse>(
    axiosInstance.post("/loginUser", data, { withCredentials: true, headers: getClientDomainHeader() })
  );
};

// ============================================================================
// TanStack Query Mutation Hook
// ============================================================================
export const useLoginUser = () => {
  return useMutation({
    mutationFn: (data: LoginPayload) => loginUser(data),
    onError: (error) => {
      console.error("Login error:", error);
    },
    onSuccess: (data) => {
      console.log("Login successful");
    },
  });
};

