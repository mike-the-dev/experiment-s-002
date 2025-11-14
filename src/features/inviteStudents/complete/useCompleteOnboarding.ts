import { useCompleteOnboardingMutation } from "../inviteStudents.service";
import { useToast } from "@/hooks/use-toast";
import {
  CompleteOnboardingDTO,
  CompleteOnboardingInput,
} from "../_shared/inviteStudents.schema";

interface UseCompleteOnboardingReturn {
  isPending: boolean;
  error: string | null;
  completeOnboarding: (
    data: CompleteOnboardingInput
  ) => Promise<CompleteOnboardingDTO | undefined>;
}

export const useCompleteOnboarding = (): UseCompleteOnboardingReturn => {
  const { isPending, error, mutateAsync } = useCompleteOnboardingMutation();
  const { toast } = useToast();

  const completeOnboarding = async (
    data: CompleteOnboardingInput
  ): Promise<CompleteOnboardingDTO | undefined> => {
    try {
      return await mutateAsync(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred while completing onboarding.";
      toast({
        variant: "destructive",
        title: "Failed to complete onboarding",
        description: errorMessage,
      });
      return undefined;
    }
  };

  const errorMessage = error instanceof Error ? error.message : null;

  return {
    isPending,
    error: errorMessage,
    completeOnboarding,
  };
};

