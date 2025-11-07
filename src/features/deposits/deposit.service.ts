import { useQuery, QueryClient, dehydrate, type DehydratedState } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInterceptor";
import { handleRequest } from "@/services/api";
import { QueryCacheTime } from "@/services/queryConfig";
import { DepositsResponse, FetchDepositsParams } from "./_shared/deposit.schema";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

// ============================================================================
// Client-side API Call Function (the actual fetch)
// ============================================================================
export const fetchDeposits = async ({ stripeAccount, startingAfter, endingBefore }: FetchDepositsParams): Promise<DepositsResponse> => {
  return handleRequest<DepositsResponse>(
    axiosInstance.get("/user/deposits", { 
      params: { stripeAccount, ...(startingAfter && { startingAfter }), ...(endingBefore && { endingBefore }) }
    })
  );
};

// ============================================================================
// Server-side Fetch Function
// ============================================================================
export const fetchDepositsServer = async (
  cookies: ReadonlyRequestCookies,
  stripeAccount: string
): Promise<DepositsResponse | null> => {
  const accessToken = cookies.get("instapaytient_access_token")?.value;

  if (!accessToken || !stripeAccount) {
    return null;
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/deposits?stripeAccount=${encodeURIComponent(stripeAccount)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      next: {
        revalidate: QueryCacheTime.FiveMinutes,
        tags: [`deposits-${stripeAccount}`]
      },
    });

    if (!res.ok) return null;

    const data = await res.json();
    // Return the full list response (object, data, has_more) for SSR/inspection
    return data as DepositsResponse;
  } catch (error) {
    console.error("Failed to fetch deposits via server-side fetch:", error);
    return null;
  }
};

// ============================================================================
// TanStack Query Hook (coupled with the API call)
// ============================================================================
export const useFetchDeposits = ({ stripeAccount, startingAfter, endingBefore }: FetchDepositsParams) => {
  return useQuery<DepositsResponse, Error>({
    queryKey: ["deposits", stripeAccount, startingAfter ?? "", endingBefore ?? ""],
    queryFn: () => fetchDeposits({ stripeAccount, startingAfter, endingBefore }),
    enabled: !!stripeAccount,
  });
};

// ============================================================================
// Server-side Prefetch Function
// ============================================================================
export const prefetchDeposits = async (
  cookies: ReadonlyRequestCookies,
  stripeAccount: string
): Promise<DehydratedState> => {
  const queryClient = new QueryClient();

  const startingAfter = "";
  const endingBefore = "";

  await queryClient.fetchQuery<DepositsResponse | null>({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ["deposits", stripeAccount, startingAfter, endingBefore],
    queryFn: () => fetchDepositsServer(cookies, stripeAccount),
  });

  return dehydrate(queryClient);
};

