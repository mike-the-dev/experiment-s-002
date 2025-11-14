import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { HydrationBoundary } from "@tanstack/react-query";
import { TeachingProfileForm } from "@/components/pages/TeachingProfile/TeachingProfileForm";
import { getAccount } from "@/features/account/detail/useGetAccount";
import { getOnboardingRoute } from "@/features/account/_shared/account.helpers";
import { prefetchTeachingProfile } from "@/features/teacherProfile/teacherProfile.service";
import { OnboardingState } from "@/types/onboarding";

interface TeachingProfilePageProps {
  searchParams: Promise<{
    type?: string;
  }> | {
    type?: string;
  };
}

export default async function TeachingProfilePage({ searchParams }: TeachingProfilePageProps) {
  // Fetch account information from the backend
  const account = await getAccount();

  // If account fetch fails, redirect to signin (user may not be authenticated)
  if (!account) {
    console.error("🚨 [Teaching Profile] Failed to fetch account. Redirecting to signin.");
    redirect("/signin/teacher");
  }

  // Check onboarding state and redirect if incomplete or not at the right step
  const onboardingState = account.onboardingState;
  
  // If onboarding is not started or invalid, redirect to account-type
  if (onboardingState === OnboardingState.NOT_STARTED || !onboardingState) {
    console.log("🔄 [Teaching Profile] Onboarding not started. Redirecting to account-type.");
    redirect("/signup/teacher/account-type");
  }
  
  // If onboarding is completed, redirect to dashboard
  if (onboardingState === OnboardingState.COMPLETED) {
    console.log("🔄 [Teaching Profile] Onboarding already completed. Redirecting to dashboard.");
    redirect("/teacher/dashboard");
  }

  // If onboarding is at an earlier step, redirect back
  if (onboardingState === OnboardingState.ACCOUNT_TYPE) {
    console.log("🔄 [Teaching Profile] Onboarding at earlier step (account_type). Redirecting to account-type.");
    redirect("/signup/teacher/account-type");
  }

  // If onboarding is at a later step, redirect to that step
  // Teaching-profile page should only be shown for 'teaching_profile' state
  const laterSteps: OnboardingState[] = [
    OnboardingState.STRIPE_CONNECT,
    OnboardingState.PRICING_SETUP,
    OnboardingState.INVITE_STUDENTS,
  ];

  if (laterSteps.includes(onboardingState)) {
    const onboardingRoute = getOnboardingRoute(onboardingState);
    if (onboardingRoute) {
      console.log(`🔄 [Teaching Profile] Onboarding at later step (${onboardingState}). Redirecting to ${onboardingRoute}`);
      redirect(onboardingRoute);
    }
  }

  // Parse search params
  const params = searchParams instanceof Promise ? await searchParams : searchParams;
  const accountType = params.type || "teacher";

  // Prefetch teaching profile data for form hydration
  const cookieStore = await cookies();
  const dehydratedState = await prefetchTeachingProfile(cookieStore);

  // Render the teaching profile form (for 'teaching_profile' state)
  return (
    <HydrationBoundary state={dehydratedState}>
      <TeachingProfileForm accountType={accountType} />
    </HydrationBoundary>
  );
}

