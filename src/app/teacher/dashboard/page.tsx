import { redirect } from "next/navigation";
import { TeacherDashboard } from "@/components/pages/TeacherProfile/TeacherDashboard";
import { getAccount } from "@/features/account/detail/useGetAccount";
import { getOnboardingRoute } from "@/features/account/_shared/account.helpers";
import { OnboardingState } from "@/types/onboarding";

export default async function TeacherDashboardPage() {
  // Fetch account information from the backend
  const account = await getAccount();

  // If account fetch fails, redirect to signin (user may not be authenticated)
  if (!account) {
    console.error("🚨 [Teacher Dashboard] Failed to fetch account. Redirecting to signin.");
    redirect("/signin/teacher");
  };

  // Check onboarding state and redirect if incomplete
  const onboardingState = account.onboardingState;
  if (onboardingState !== OnboardingState.COMPLETED) {
    const onboardingRoute = getOnboardingRoute(onboardingState);
    if (onboardingRoute) {
      console.log(`🔄 [Teacher Dashboard] Onboarding incomplete (${onboardingState}). Redirecting to ${onboardingRoute}`);
      redirect(onboardingRoute);
    };
  };

  // Onboarding is complete, render the dashboard
  return <TeacherDashboard />;
}
