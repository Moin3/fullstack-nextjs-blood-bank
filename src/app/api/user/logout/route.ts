import { NextResponse } from "next/server";


export async function GET() {
  const response = NextResponse.json({
    message: "Logged out !!",
    success: true,
  });

  response.cookies.set("token", '', {
    // expires: new Date(Date.now() + 10 * 1000),
    maxAge: 0, // 2 hours
                secure: true, // set to true if you're using https
                httpOnly: true,
  });

  return response;
}
