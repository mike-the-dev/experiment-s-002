import { NextRequest, NextResponse } from "next/server";

// const createULID = (): string => {
//   const timestamp = Date.now().toString(36);
//   const random = Math.random().toString(36).substring(2);
//   const timeEncoded = timestamp.padStart(10, "0");
//   const randomEncoded = random.padStart(16, "0");
//   return timeEncoded + randomEncoded;
// };

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const requestHeaders = new Headers(request.headers);
  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });

  // 🔐 Gatekeep /desk routes
  // if (pathname.startsWith("/desk")) {
  //   const accessToken = request.cookies.get("sonata_access_token");
  //   const refreshToken = request.cookies.get("sonata_refresh_token");

  //   console.log("🛡️ Access Token:", accessToken?.value);
  //   console.log("🔄 Refresh Token:", refreshToken?.value);

  //   if (!accessToken?.value && !refreshToken?.value) {
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }
  //   return response;
  // }

  // if (!pathname.startsWith("/login")) {
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
  //   }
  // }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next|static|.*\\.(?:jpg|jpeg|png|gif|webp|svg|ico|woff|woff2|ttf|otf|eot|mp4|webm|txt|xml|json|pdf)).*)"
  ]
};