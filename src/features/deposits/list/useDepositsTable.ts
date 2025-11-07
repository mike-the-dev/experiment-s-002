import React from "react";
import { useDeposits } from "./useDeposits";
import { Deposit } from "../_shared/deposit.schema";

interface UseDepositsTableArgs {
  stripeAccount: string;
}

interface UseDepositsTable {
  rows: Deposit[];
  isLoading: boolean;
  error: string | null;
  page: number;
  canGoBack: boolean;
  canGoForward: boolean;
  handleNext: () => void;
  handlePrev: () => void;
  rangeText: string;
}

export const useDepositsTable = (args: UseDepositsTableArgs): UseDepositsTable => {
  const { stripeAccount } = args;

  const [startingAfter, setStartingAfter] = React.useState<string | undefined>(undefined);
  const [endingBefore, setEndingBefore] = React.useState<string | undefined>(undefined);
  const [backHistory, setBackHistory] = React.useState<string[]>([]);
  const [page, setPage] = React.useState<number>(1);

  const { deposits, hasMore, isLoading, error } = useDeposits({
    stripeAccount: stripeAccount,
    startingAfter: startingAfter,
    endingBefore: endingBefore,
  });

  const rows = deposits ?? [];
  const firstId = rows[0]?.id;
  const lastId = rows[rows.length - 1]?.id;

  const canGoBack = backHistory.length > 0;
  const canGoForward = Boolean(hasMore || endingBefore);

  const handleNext = (): void => {
    if (!lastId) return;
    if (!hasMore && !endingBefore) return;
    if (firstId) {
      setBackHistory((prev) => [...prev, firstId]);
    }
    setStartingAfter(lastId);
    setEndingBefore(undefined);
    setPage((p) => p + 1);
  };

  const handlePrev = (): void => {
    if (!firstId) return;
    setEndingBefore(firstId);
    setStartingAfter(undefined);
    setPage((p) => Math.max(1, p - 1));
    setBackHistory((prev) => (prev.length > 0 ? prev.slice(0, -1) : prev));
  };

  const rangeText = rows.length > 0 ? `1-${rows.length} of ${rows.length}` : "0 items";

  return {
    rows: rows,
    isLoading: isLoading,
    error: error || null,
    page: page,
    canGoBack: canGoBack,
    canGoForward: canGoForward,
    handleNext: handleNext,
    handlePrev: handlePrev,
    rangeText: rangeText,
  };
};

