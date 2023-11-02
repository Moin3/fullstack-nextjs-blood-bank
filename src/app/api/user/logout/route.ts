import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
  const response = NextResponse.json({
    message: "Logged out !!",
    success: true,
  });

  response.cookies.set("token", '', {
      expires: new Date(0),
  });

  return response;
}

