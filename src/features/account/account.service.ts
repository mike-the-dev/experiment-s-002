import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { AccountDTO } from "./_shared/account.schema";

/**
 * Server-side fetch function to get account information
 * Uses the access token from cookies to authenticate the request
 * The backend extracts the accountId from the access token automatically
 * 
 * @param cookies - Next.js request cookies containing the access token
 * @returns Promise resolving to the account object or null if fetch fails
 */
export const fetchAccountServer = async (
  cookies: ReadonlyRequestCookies
): Promise<AccountDTO | null> => {
  const accessToken = cookies.get("sonata_access_token")?.value;

  if (!accessToken) {
    console.error("🚨 [Account Fetch] No access token found in cookies");
    return null;
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/account/getAccount`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        // Disable caching for account data to ensure fresh state
        cache: "no-store",
      }
    );

    if (!res.ok) {
      let message = `Request failed [status: ${res.status}]`;

      try {
        const errorBody = await res.json();
        if (errorBody?.message) {
          message += ` - ${errorBody.message}`;
        }
      } catch (parseError) {
        message += " - (failed to parse error response)";
      }

      console.error(`🚨 [Account Fetch] ${message}`);
      return null;
    }

    const data = await res.json();
    console.log("✅ [Account Fetch] Successfully retrieved account data.");
    return data as AccountDTO;
  } catch (error: any) {
    console.error("🚨 [Account Fetch] Exception during request:", error);
    return null;
  }
};

