/**
 * @author mike-the-dev (Michael Camacho)
 * @editor mike-the-dev (Michael Camacho)
 * @lastUpdated 2024-06-09
 * @name storeAuthSession
 * @description Stores authentication session data including access token, refresh token, and user profile.
 * @param user any - the authenticated user object containing account info
 * @param tokens { access: string; refresh: string } - the access and refresh tokens
 * @returns void
 */

export const storeAuthSession = (user: any, tokens: { access: string; refresh: string }) => {
  // Save refresh token persistently
  localStorage.setItem("sonata_refresh_token", tokens.refresh);

  // Save access token for session usage
  sessionStorage.setItem("sonata_access_token", tokens.access);

  // Also set as a cookie for middleware to read
  document.cookie = `sonata_access_token=${tokens.access}; path=/; max-age=900; SameSite=Lax; Secure`;
  document.cookie = `sonata_refresh_token=${tokens.refresh}; path=/; max-age=604800; SameSite=Lax; Secure`;

  // Save user profile data (optional)
  localStorage.setItem("sonata_profile", JSON.stringify({
    user: { ...user }
  }));
};