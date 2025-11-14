import { redirect } from "next/navigation";
import { PricingSetupForm } from "@/components/pages/PricingSetup/PricingSetupForm";
import { getAccount } from "@/features/account/detail/useGetAccount";
import { getOnboardingRoute } from "@/features/account/_shared/account.helpers";
import { OnboardingState } from "@/types/onboarding";

interface PricingSetupPageProps {
  searchParams: Promise<{
    type?: string;
  }> | {
    type?: string;
  };
}

export default async function PricingSetupPage({ searchParams }: PricingSetupPageProps) {
  // Fetch account information from the backend
  const account = await getAccount();

  // If account fetch fails, redirect to signin (user may not be authenticated)
  if (!account) {
    console.error("🚨 [Pricing Setup] Failed to fetch account. Redirecting to signin.");
    redirect("/signin/teacher");
  }

  // Check onboarding state and redirect if incomplete or not at the right step
  const onboardingState = account.onboardingState;
  
  // If onboarding is not started or invalid, redirect to account-type
  if (onboardingState === OnboardingState.NOT_STARTED || !onboardingState) {
    console.log("🔄 [Pricing Setup] Onboarding not started. Redirecting to account-type.");
    redirect("/signup/teacher/account-type");
  }
  
  // If onboarding is completed, redirect to dashboard
  if (onboardingState === OnboardingState.COMPLETED) {
    console.log("🔄 [Pricing Setup] Onboarding already completed. Redirecting to dashboard.");
    redirect("/teacher/dashboard");
  }

  // If onboarding is at an earlier step, redirect back
  if (onboardingState === OnboardingState.ACCOUNT_TYPE) {
    console.log("🔄 [Pricing Setup] Onboarding at earlier step (account_type). Redirecting to account-type.");
    redirect("/signup/teacher/account-type");
  }

  if (onboardingState === OnboardingState.TEACHING_PROFILE) {
    console.log("🔄 [Pricing Setup] Onboarding at earlier step (teaching_profile). Redirecting to teaching-profile.");
    redirect("/signup/teacher/teaching-profile");
  }

  // If onboarding is at a later step, redirect to that step
  // Pricing-setup page should only be shown for 'pricing_setup' state
  const laterSteps: OnboardingState[] = [
    OnboardingState.STRIPE_CONNECT,
    OnboardingState.INVITE_STUDENTS,
  ];

  if (laterSteps.includes(onboardingState)) {
    const onboardingRoute = getOnboardingRoute(onboardingState);
    if (onboardingRoute) {
      console.log(`🔄 [Pricing Setup] Onboarding at later step (${onboardingState}). Redirecting to ${onboardingRoute}`);
      redirect(onboardingRoute);
    }
  }

  // Parse search params
  const params = searchParams instanceof Promise ? await searchParams : searchParams;
  const accountType = params.type || "teacher";

  // Render the pricing setup form (for 'pricing_setup' state)
  return <PricingSetupForm accountType={accountType} />;
}