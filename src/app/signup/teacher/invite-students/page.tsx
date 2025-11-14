import { redirect } from "next/navigation";
import { InviteStudentsForm } from "@/components/pages/InviteStudents/InviteStudentsForm";
import { getAccount } from "@/features/account/detail/useGetAccount";
import { getOnboardingRoute } from "@/features/account/_shared/account.helpers";
import { getTeacherInviteInfo } from "@/features/inviteStudents/detail/useGetTeacherInviteInfo";
import { OnboardingState } from "@/types/onboarding";

export default async function InviteStudentsPage() {
  // Fetch account information from the backend
  const account = await getAccount();

  // If account fetch fails, redirect to signin (user may not be authenticated)
  if (!account) {
    console.error("🚨 [Invite Students] Failed to fetch account. Redirecting to signin.");
    redirect("/signin/teacher");
  }

  // Check onboarding state and redirect if incomplete or not at the right step
  const onboardingState = account.onboardingState;

  // If onboarding is not started or invalid, redirect to account-type
  if (onboardingState === OnboardingState.NOT_STARTED || !onboardingState) {
    console.log("🔄 [Invite Students] Onboarding not started. Redirecting to account-type.");
    redirect("/signup/teacher/account-type");
  }

  // If onboarding is completed, redirect to dashboard
  if (onboardingState === OnboardingState.COMPLETED) {
    console.log("🔄 [Invite Students] Onboarding already completed. Redirecting to dashboard.");
    redirect("/teacher/dashboard");
  }

  // If onboarding is at an earlier step, redirect back
  const earlierSteps: OnboardingState[] = [
    OnboardingState.ACCOUNT_TYPE,
    OnboardingState.TEACHING_PROFILE,
    OnboardingState.PRICING_SETUP,
    OnboardingState.STRIPE_CONNECT,
  ];

  if (earlierSteps.includes(onboardingState)) {
    const onboardingRoute = getOnboardingRoute(onboardingState);
    if (onboardingRoute) {
      console.log(
        `🔄 [Invite Students] Onboarding at earlier step (${onboardingState}). Redirecting to ${onboardingRoute}`
      );
      redirect(onboardingRoute);
    }
  }

  // Fetch teacher invite info
  const teacherInviteInfo = await getTeacherInviteInfo();

  if (!teacherInviteInfo) {
    console.error("🚨 [Invite Students] Failed to fetch teacher invite info. Using placeholder data.");
  }

  // Placeholder data for students (can be fetched from API later)
  const pendingStudents = [
    { id: 1, name: "Invite sent", status: "pending" as const },
  ];

  const connectedStudents = [
    { id: 2, name: "Sarah Johnson", status: "connected" as const },
  ];

  // Render the invite students form
  return (
    <InviteStudentsForm
      teacherInviteInfo={
        teacherInviteInfo || {
          teacherCode: "AB12CD",
          inviteLink: "sonata.app/join/AB12CD",
        }
      }
      pendingStudents={pendingStudents}
      connectedStudents={connectedStudents}
    />
  );
}

