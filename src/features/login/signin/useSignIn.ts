import { useLoginUser } from "../login.service";
import { useToast } from "@/hooks/use-toast";
import { LoginPayload, LoginUserResponse } from "../_shared/login.schema";

interface UseSignInReturn {
  isPending: boolean;
  error: string | null;
  signIn: (data: LoginPayload) => Promise<LoginUserResponse | undefined>;
}

export const useSignIn = (): UseSignInReturn => {
  const { isPending, error, mutateAsync } = useLoginUser();
  const { toast } = useToast();

  const signIn = async (data: LoginPayload): Promise<LoginUserResponse | undefined> => {
    try {
      return await mutateAsync(data);
    } catch (err) {
      // Show error toast
      const errorMessage = err instanceof Error ? err.message : "An error occurred during sign in.";
      toast({
        variant: "destructive",
        title: "Sign In Failed",
        description: errorMessage,
      });
      return undefined;
    }
  };

  // When error exists, it's always an Error from handleRequest
  const errorMessage = error instanceof Error ? error.message : null;

  return {
    isPending: isPending,
    error: errorMessage,
    signIn: signIn,
  };
};

