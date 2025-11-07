import { useFetchDeposits } from "../deposit.service";
import { Deposit, DepositsResponse, FetchDepositsParams } from "../_shared/deposit.schema";
import { mapDeposits } from "../_shared/deposit.mappers";

interface UseDepositsReturn {
  deposits: Deposit[];
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useDeposits = ({ stripeAccount, startingAfter, endingBefore }: FetchDepositsParams): UseDepositsReturn => {
  const { data, isLoading, error, refetch: refetchQuery } = useFetchDeposits({ stripeAccount, startingAfter, endingBefore });

  const refetch = async (): Promise<void> => {
    await refetchQuery();
  };

  // When error exists, it's always an Error from handleRequest
  const errorMessage = error?.message || null;

  const list = data as DepositsResponse | undefined;

  return {
    deposits: mapDeposits(list || []),
    hasMore: list?.has_more ?? false,
    isLoading: isLoading,
    error: errorMessage,
    refetch: refetch,
  };
};

