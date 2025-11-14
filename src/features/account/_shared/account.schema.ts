/**
 * Onboarding state type
 * Re-exported from global types for convenience
 */
import { OnboardingState } from '@/types/onboarding';
export type { OnboardingState } from '@/types/onboarding';

/**
 * Account DTO from the backend
 * Matches the server-side AccountDTO interface
 */
export interface AccountDTO {
  id: string;
  accountType: 'Individual' | 'Organization';
  ownerUserId: string;
  stripeCustomerId: string;
  onboardingState: OnboardingState;
  createdAt: string;
  lastUpdated: string;
}

