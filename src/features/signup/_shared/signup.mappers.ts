import { SignupFormData, SignupPayload } from "./signup.schema";

export const mapSignupFormData = (data: SignupFormData): SignupPayload => {
  return {
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email.trim().toLowerCase(),
    password: data.password,
  };
};