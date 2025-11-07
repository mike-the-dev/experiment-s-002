import { LoginFormData, LoginPayload } from "./login.schema";

/**
 * Transforms form data for API submission
 * @param data - Raw form data
 * @returns Sanitized payload with email and password
 */
export const mapLoginFormData = (data: LoginFormData): LoginPayload => {
  return {
    email: data.email.trim().toLowerCase(),
    password: data.password,
  };
};

