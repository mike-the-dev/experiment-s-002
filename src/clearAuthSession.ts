

export const clearAuthSession = () => {
  localStorage.removeItem("sonata_refresh_token");
  localStorage.removeItem("sonata_profile");
  sessionStorage.removeItem("sonata_access_token");

  document.cookie = "sonata_access_token=; path=/; max-age=0; SameSite=Lax; Secure";
  document.cookie = "sonata_refresh_token=; path=/; max-age=0; SameSite=Lax; Secure";
};