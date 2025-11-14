import { useCreateAccountProfileMutation } from "../accountProfile.service";
import { useToast } from "@/hooks/use-toast";
import {
  CreateProfileAccountTypeInput,
  CreateProfileAccountTypeDTO,
} from "../_shared/accountProfile.schema";

interface UseCreateAccountProfileReturn {
  isPending: boolean;
  error: string | null;
  createAccountProfile: (
    data: CreateProfileAccountTypeInput
  ) => Promise<CreateProfileAccountTypeDTO | undefined>;
}

export const useCreateAccountProfile = (): UseCreateAccountProfileReturn => {
  const { isPending, error, mutateAsync } = useCreateAccountProfileMutation();
  const { toast } = useToast();

  const createAccountProfile = async (
    data: CreateProfileAccountTypeInput
  ): Promise<CreateProfileAccountTypeDTO | undefined> => {
    try {
      return await mutateAsync(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred while saving your account type.";
      
      // Check if this is the 409 "Profile already exists" error
      if (errorMessage === "Profile already exists for this account. Use update endpoint instead.") {
        // Don't show error toast for this case - throw a specific error that can be caught
        const profileExistsError = new Error(errorMessage);
        (profileExistsError as any).isProfileExists = true;
        throw profileExistsError;
      }
      
      toast({
        variant: "destructive",
        title: "Failed to save account type",
        description: errorMessage,
      });
      return undefined;
    }
  };

  const errorMessage = error instanceof Error ? error.message : null;

  return {
    isPending,
    error: errorMessage,
    createAccountProfile,
  };
};

