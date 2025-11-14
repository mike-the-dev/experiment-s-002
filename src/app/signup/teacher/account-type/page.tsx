import { redirect } from "next/navigation";
import { AccountTypeForm } from "@/components/pages/AccountType/AccountTypeForm";
import { getAccount } from "@/features/account/detail/useGetAccount";
import { getOnboardingRoute } from "@/features/account/_shared/account.helpers";
import { OnboardingState } from "@/types/onboarding";

interface AccountTypePageProps {
  searchParams: Promise<{
    type?: string;
  }> | {
    type?: string;
  };
}

export default async function AccountTypePage({ searchParams }: AccountTypePageProps) {
  // Fetch account information from the backend
  const account = await getAccount();

  // If account fetch fails, redirect to signin (user may not be authenticated)
  if (!account) {
    console.error("🚨 [Account Type] Failed to fetch account. Redirecting to signin.");
    redirect("/signin/teacher");
  }

  // Check onboarding state and redirect if incomplete or not at the right step
  const onboardingState = account.onboardingState;

  // If onboarding is completed, redirect to dashboard
  if (onboardingState === OnboardingState.COMPLETED) {
    console.log("🔄 [Account Type] Onboarding already completed. Redirecting to dashboard.");
    redirect("/teacher/dashboard");
  }

  // If onboarding is at a later step, redirect to that step
  // Account-type page should only be shown for 'not_started' or 'account_type'
  const laterSteps: OnboardingState[] = [
    OnboardingState.TEACHING_PROFILE,
    OnboardingState.STRIPE_CONNECT,
    OnboardingState.PRICING_SETUP,
    OnboardingState.INVITE_STUDENTS,
  ];

  if (laterSteps.includes(onboardingState)) {
    const onboardingRoute = getOnboardingRoute(onboardingState);
    if (onboardingRoute) {
      console.log(`🔄 [Account Type] Onboarding at later step (${onboardingState}). Redirecting to ${onboardingRoute}`);
      redirect(onboardingRoute);
    }
  }

  // Parse search params
  const params = searchParams instanceof Promise ? await searchParams : searchParams;
  const accountType = params.type || "teacher";

  // Render the account type form (for 'not_started' or 'account_type' states)
  return <AccountTypeForm accountType={accountType} />;
}