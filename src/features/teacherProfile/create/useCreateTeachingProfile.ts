import { useCreateTeachingProfileMutation } from "../teacherProfile.service";
import { useToast } from "@/hooks/use-toast";
import {
  CreateTeachingProfileDTO,
} from "../_shared/teacherProfile.schema";

interface UseCreateTeachingProfileReturn {
  isPending: boolean;
  error: string | null;
  createTeachingProfile: (
    formData: FormData
  ) => Promise<CreateTeachingProfileDTO | undefined>;
}

export const useCreateTeachingProfile = (): UseCreateTeachingProfileReturn => {
  const { isPending, error, mutateAsync } = useCreateTeachingProfileMutation();
  const { toast } = useToast();

  const createTeachingProfile = async (
    formData: FormData
  ): Promise<CreateTeachingProfileDTO | undefined> => {
    try {
      return await mutateAsync(formData);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred while saving your teaching profile.";
      toast({
        variant: "destructive",
        title: "Failed to save teaching profile",
        description: errorMessage,
      });
      return undefined;
    }
  };

  const errorMessage = error instanceof Error ? error.message : null;

  return {
    isPending,
    error: errorMessage,
    createTeachingProfile,
  };
};

