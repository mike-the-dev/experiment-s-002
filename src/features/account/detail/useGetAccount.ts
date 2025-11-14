import { cookies } from "next/headers";
import { fetchAccountServer } from "../account.service";
import { AccountDTO } from "../_shared/account.schema";

/**
 * Server-side hook to get account information
 * This should be used in Next.js server components
 * 
 * @returns Promise resolving to the account object or null if fetch fails
 */
export const getAccount = async (): Promise<AccountDTO | null> => {
  const cookieStore = await cookies();
  return fetchAccountServer(cookieStore);
};

