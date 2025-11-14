import { useCreatePricingSetupMutation } from "../pricingSetup.service";
import { useToast } from "@/hooks/use-toast";
import {
  CreatePricingSetupDTO,
  CreatePricingSetupInput,
} from "../_shared/pricingSetup.schema";

interface UseCreatePricingSetupReturn {
  isPending: boolean;
  error: string | null;
  createPricingSetup: (
    data: CreatePricingSetupInput
  ) => Promise<CreatePricingSetupDTO | undefined>;
}

export const useCreatePricingSetup = (): UseCreatePricingSetupReturn => {
  const { isPending, error, mutateAsync } = useCreatePricingSetupMutation();
  const { toast } = useToast();

  const createPricingSetup = async (
    data: CreatePricingSetupInput
  ): Promise<CreatePricingSetupDTO | undefined> => {
    try {
      return await mutateAsync(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred while saving your pricing setup.";
      toast({
        variant: "destructive",
        title: "Failed to save pricing setup",
        description: errorMessage,
      });
      return undefined;
    }
  };

  const errorMessage = error instanceof Error ? error.message : null;

  return {
    isPending,
    error: errorMessage,
    createPricingSetup,
  };
};

