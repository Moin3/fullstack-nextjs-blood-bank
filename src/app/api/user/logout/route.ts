import { NextResponse } from "next/server";


export async function GET() {
  const response = NextResponse.json({
    message: "Logged out !!",
    success: true,
  });

  response.cookies.set("token", '', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  return response;
}
