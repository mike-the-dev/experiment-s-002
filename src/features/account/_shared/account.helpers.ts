import { OnboardingState } from "@/types/onboarding";

/**
 * Maps onboarding state to the corresponding route
 * @param onboardingState - The current onboarding state
 * @returns The route path for the onboarding step, or null if completed
 */
export const getOnboardingRoute = (onboardingState: OnboardingState): string | null => {
  const routeMap: Record<OnboardingState, string | null> = {
    [OnboardingState.NOT_STARTED]: '/signup/teacher/account-type',
    [OnboardingState.ACCOUNT_TYPE]: '/signup/teacher/account-type',
    [OnboardingState.TEACHING_PROFILE]: '/signup/teacher/teaching-profile',
    [OnboardingState.STRIPE_CONNECT]: '/signup/teacher/stripe-connect',
    [OnboardingState.PRICING_SETUP]: '/signup/teacher/pricing-setup',
    [OnboardingState.INVITE_STUDENTS]: '/signup/teacher/invite-students',
    [OnboardingState.COMPLETED]: null, // No redirect needed if completed
  };

  return routeMap[onboardingState] || '/signup/teacher/account-type';
};

