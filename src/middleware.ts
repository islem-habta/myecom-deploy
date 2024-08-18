import { NextRequest, NextResponse } from "next/server";
// import { isValidPassword } from "./lib/isValidPassword";

// Original middleware with authentication logic (commented out)
/*
export async function middleware(req: NextRequest) {
  if ((await isAuthenticated(req)) === false) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    });
  }
}

async function isAuthenticated(req: NextRequest) {
  const authHeader =
    req.headers.get("authorization") || req.headers.get("Authorization");

  if (authHeader == null) return false;

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  return (
    username === process.env.ADMIN_USERNAME &&
    (await isValidPassword(
      password,
      process.env.HASHED_ADMIN_PASSWORD as string
    ))
  );
}
*/

// New middleware without authentication
export async function middleware(req: NextRequest) {
  // Your middleware logic here, if any, but without authentication checks
  // For example, you can log the request
  console.log(`Request made to: ${req.url}`);

  // Continue to the next middleware or the requested resource
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*", // Apply middleware to the /admin route and its subpaths
};
