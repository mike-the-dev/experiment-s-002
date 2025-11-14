/**
 * @author mike-the-dev (Michael Camacho)
 * @editor mike-the-dev (Michael Camacho)
 * @lastUpdated 2024-06-09
 * @name storeAuthSession
 * @description Stores authentication session data in client-side storage (localStorage/sessionStorage).
 * Note: Cookies are now set server-side via server actions for security (httpOnly cookies).
 * This function only handles client-side storage needed for axios interceptor.
 * 
 * @param user any - the authenticated user object containing account info
 * @param tokens { access: string; refresh: string } - the access and refresh tokens
 * @returns void
 */

export const storeAuthSession = (user: any, tokens: { access: string; refresh: string }) => {
  // Save refresh token persistently (for axios interceptor)
  localStorage.setItem("sonata_refresh_token", tokens.refresh);

  // Save access token for session usage (for axios interceptor)
  sessionStorage.setItem("sonata_access_token", tokens.access);

  // Save user profile data (optional)
  localStorage.setItem("sonata_profile", JSON.stringify({
    user: { ...user }
  }));

  // Note: Cookies are now set server-side via setAuthCookiesAndRedirect server action
  // This ensures httpOnly cookies are used for server-side access, which is more secure
};