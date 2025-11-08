import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/axiosInterceptor";
import { handleRequest } from "@/api";
import { SignupPayload, SignupResponse } from "./_shared/signup.schema";

const getClientDomainHeader = () => ({
  "x-client-domain": process.env.NODE_ENV === "development"
    ? "localhost"
    : (typeof window !== "undefined" ? window.location.hostname : ""),
});

export const registerUser = async (data: SignupPayload): Promise<SignupResponse> => {
  return handleRequest<SignupResponse>(
    axiosInstance.post("/createTeacher", data, { withCredentials: true, headers: getClientDomainHeader() })
  );
};

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (data: SignupPayload) => registerUser(data),
    onError: (error) => {
      console.error("Signup error:", error);
    },
    onSuccess: () => {
      console.log("Signup successful");
    },
  });
};