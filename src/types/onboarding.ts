/**
 * Onboarding state enum
 * Represents the current step in the teacher onboarding process
 * Matches the backend OnboardingState enum
 */
export enum OnboardingState {
  NOT_STARTED = 'not_started',
  ACCOUNT_TYPE = 'account_type',
  TEACHING_PROFILE = 'teaching_profile',
  PRICING_SETUP = 'pricing_setup',
  STRIPE_CONNECT = 'stripe_connect',
  INVITE_STUDENTS = 'invite_students',
  COMPLETED = 'completed',
}

