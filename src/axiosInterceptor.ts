import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { refreshAccessToken } from "@/api";
import { storeAuthSession } from "@/storeAuthSession";
import { clearAuthSession } from "@/clearAuthSession";

/**
 * @author mike-the-dev (Michael Camacho)
 * @editor mike-the-dev (Michael Camacho)
 * @lastUpdated 2024-06-09
 * @name axiosInterceptor
 * @description Axios instance with request interceptor for injecting access token from sessionStorage into Authorization header.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

const axiosInstance = axios.create({
  baseURL: BASE_URL
});

// Attach access token to all outgoing requests
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("sonata_access_token");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors and refresh token
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const isDashboardRoute =
      typeof window !== "undefined" && window.location.pathname.startsWith("/desk");

    if (error.response?.status === 401 && !originalRequest._retry && isDashboardRoute) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("sonata_refresh_token");
        if (!refreshToken) throw new Error("Missing refresh token.");

        const data = await refreshAccessToken({ refreshToken });

        storeAuthSession(data.authorization.user, {
          access: data.authorization.tokens.access,
          refresh: data.authorization.tokens.refresh
        });

        originalRequest.headers["Authorization"] = `Bearer ${data.authorization.tokens.access}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("❌ Token refresh failed. Redirecting to login.");
        toast({
          title: "Session expired",
          description: "Your session has expired. Please log in again.",
          variant: "destructive",
        });
        // Clear all session and auth data before redirecting
        clearAuthSession();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;