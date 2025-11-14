import { NextRequest, NextResponse } from "next/server";

const createULID = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2);
  const timeEncoded = timestamp.padStart(10, "0");
  const randomEncoded = random.padStart(16, "0");
  return timeEncoded + randomEncoded;
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-request-pathname", pathname);
  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });

  const accessToken = request.cookies.get("sonata_access_token")?.value;
  const refreshToken = request.cookies.get("sonata_refresh_token")?.value;
  const isAuthenticated = Boolean(accessToken && refreshToken);

  // Define onboarding routes that authenticated users need to access
  const onboardingRoutes = [
    "/signup/teacher/account-type",
    "/signup/teacher/teaching-profile",
    "/signup/teacher/stripe-connect",
    "/signup/teacher/pricing-setup",
    "/signup/teacher/invite-students"
  ];
  const isOnboardingRoute = onboardingRoutes.some(route => pathname.startsWith(route));

  // Public routes (but exclude onboarding routes - authenticated users need access to those)
  const publicRoutes = ["/signin", "/signin/teacher", "/signup", "/signup/teacher"];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route)) && !isOnboardingRoute;
  const isTeacherRoute = pathname.startsWith("/teacher");

  // Don't redirect authenticated users away from onboarding routes
  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL("/teacher/dashboard", request.url));
  }

  if (!isAuthenticated && isTeacherRoute) {
    console.log("🛡️ Access Token:", accessToken);
    console.log("🔄 Refresh Token:", refreshToken);
    return NextResponse.redirect(new URL("/signin/teacher", request.url));
  }

  // if (!pathname.startsWith("/signin")) {
  //   // Guest ID logic only for routes where cart should load
  //   const guestID = request.cookies.get("sonata-guestID");
  //   if (!guestID) {
  //     console.log("🍪 Setting new guestID cookie...");
  //     const newGuestID = createULID();
  //     response.cookies.set("sonata-guestID", newGuestID, {
  //       path: "/",
  //       httpOnly: true,
  //       maxAge: 60 * 60 * 24 * 365,
  //       sameSite: "lax",
  //       secure: process.env.NODE_ENV === "production"
  //     });
  //     response.cookies.set("sonata-guestID-client", newGuestID, {
  //       path: "/",
  //       httpOnly: false,
  //       maxAge: 60 * 60 * 24 * 365,
  //       sameSite: "lax",
  //       secure: process.env.NODE_ENV === "production"
  //     });
    // }
  // }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next|static|.*\\.(?:jpg|jpeg|png|gif|webp|svg|ico|woff|woff2|ttf|otf|eot|mp4|webm|txt|xml|json|pdf)).*)"
  ]
};