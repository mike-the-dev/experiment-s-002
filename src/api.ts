import axios from "axios";
import axiosInstance from "./axiosInterceptor";
import { Login, LoginUserResponse } from "./types/login";

export const handleRequest = async <T>(request: Promise<any>): Promise<T> => {
  try {
    const response = await request;

    return response.data as T;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios Error:", error.response?.data || error.message);
      if (!error.response) throw new Error("Network error: Could not reach the server or CORS rejection.");

      const status = error.response?.status;
      const serverMessage = error.response?.data?.message;

      if (serverMessage) {
        throw new Error(serverMessage);
      }

      if (status === 400) throw new Error("Invalid request. Please check your inputs.");
      if (status === 401) throw new Error("Unauthorized. Please log in again.");
      if (status === 404) throw new Error("Resource not found.");
      if (status === 500) throw new Error("Server error. Please try again later.");
    }

    throw new Error((error as Error).message || "An unexpected error occurred.");
  }
};

// Utility function for x-client-domain header
const getClientDomainHeader = () => ({
  "x-client-domain": process.env.NODE_ENV === "development"
    ? "localhost"
    : window.location.hostname
});

export const refreshAccessToken = async ({ refreshToken }: { refreshToken: string }): Promise<LoginUserResponse> => handleRequest<LoginUserResponse>(
  axiosInstance.post("refreshAccessToken", { refreshToken: refreshToken })
);

export const loginUser = async (data: Login): Promise<LoginUserResponse> => handleRequest<LoginUserResponse>(
    axiosInstance.post("loginUser", data, { withCredentials: true, headers: getClientDomainHeader() })
  );