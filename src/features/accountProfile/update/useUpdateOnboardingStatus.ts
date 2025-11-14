import { useUpdateOnboardingStatusMutation } from "../accountProfile.service";
import { useToast } from "@/hooks/use-toast";
import {
  UpdateOnboardingStatusInput,
  UpdateOnboardingStatusDTO,
} from "../_shared/accountProfile.schema";

interface UseUpdateOnboardingStatusReturn {
  isPending: boolean;
  error: string | null;
  updateOnboardingStatus: (
    data: UpdateOnboardingStatusInput
  ) => Promise<UpdateOnboardingStatusDTO | undefined>;
}

export const useUpdateOnboardingStatus = (): UseUpdateOnboardingStatusReturn => {
  const { isPending, error, mutateAsync } = useUpdateOnboardingStatusMutation();
  const { toast } = useToast();

  const updateOnboardingStatus = async (
    data: UpdateOnboardingStatusInput
  ): Promise<UpdateOnboardingStatusDTO | undefined> => {
    try {
      return await mutateAsync(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred while updating onboarding status.";
      toast({
        variant: "destructive",
        title: "Failed to update onboarding status",
        description: errorMessage,
      });
      return undefined;
    }
  };

  const errorMessage = error instanceof Error ? error.message : null;

  return {
    isPending,
    error: errorMessage,
    updateOnboardingStatus,
  };
};

