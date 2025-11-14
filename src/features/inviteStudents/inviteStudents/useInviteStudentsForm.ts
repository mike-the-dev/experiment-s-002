"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useCompleteOnboarding } from "../complete/useCompleteOnboarding";
import { useResendInviteMutation } from "../inviteStudents.service";
import {
  UseInviteStudentsFormReturn,
  PendingStudent,
  ConnectedStudent,
  TeacherInviteInfo,
} from "../_shared/inviteStudents.schema";
import { mapTeacherInviteInfo } from "../_shared/inviteStudents.mappers";

interface UseInviteStudentsFormProps {
  teacherInviteInfo: TeacherInviteInfo;
  pendingStudents?: PendingStudent[];
  connectedStudents?: ConnectedStudent[];
}

export const useInviteStudentsForm = ({
  teacherInviteInfo,
  pendingStudents = [],
  connectedStudents = [],
}: UseInviteStudentsFormProps): UseInviteStudentsFormReturn => {
  const router = useRouter();
  const { toast } = useToast();
  const { isPending: isCompleting, completeOnboarding } =
    useCompleteOnboarding();
  const { isPending: isResending, mutateAsync: resendInvite } =
    useResendInviteMutation();
  const [showQR, setShowQR] = useState(false);

  const mappedInfo = mapTeacherInviteInfo({
    teacherCode: teacherInviteInfo.teacherCode,
    inviteLink: teacherInviteInfo.inviteLink,
  });

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    });
  };

  const handleResend = async (studentId: number) => {
    try {
      await resendInvite({ studentId });
      toast({
        title: "Invite resent",
        description: "The invitation has been sent again",
      });
    } catch (error) {
      console.error("Failed to resend invite:", error);
      toast({
        variant: "destructive",
        title: "Failed to resend invite",
        description: "An error occurred while resending the invitation.",
      });
    }
  };

  const handleContinue = async () => {
    try {
      const response = await completeOnboarding({
        onboardingState: "completed",
      });

      if (response) {
        toast({
          title: "Onboarding completed!",
          description: "Welcome to Sonata! Redirecting to your dashboard...",
        });
        router.push("/teacher/dashboard");
      }
    } catch (error) {
      console.error("Failed to complete onboarding:", error);
    }
  };

  const isPending = isCompleting || isResending;
  const error = null; // Can be extended if needed

  return {
    teacherCode: mappedInfo.teacherCode,
    inviteLink: mappedInfo.inviteLink,
    pendingStudents,
    connectedStudents,
    isPending,
    error,
    handleCopy,
    handleResend,
    handleContinue,
    showQR,
    setShowQR,
  };
};

