import { useRegisterUser } from "../signup.service";
import { useToast } from "@/hooks/use-toast";
import { SignupPayload, SignupResponse } from "../_shared/signup.schema";

interface UseSignUpReturn {
  isPending: boolean;
  error: string | null;
  signUp: (data: SignupPayload) => Promise<SignupResponse | undefined>;
}

export const useSignUp = (): UseSignUpReturn => {
  const { isPending, error, mutateAsync } = useRegisterUser();
  const { toast } = useToast();

  const signUp = async (data: SignupPayload): Promise<SignupResponse | undefined> => {
    try {
      return await mutateAsync(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred during sign up.";
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: errorMessage,
      });
      throw err;
    }
  };

  const errorMessage = error instanceof Error ? error.message : null;

  return {
    isPending,
    error: errorMessage,
    signUp,
  };
};