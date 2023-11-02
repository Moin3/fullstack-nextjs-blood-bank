import { connectDB } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import jwt from 'jsonwebtoken'


connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody
    const user = await User.findOne({ email });

    /* ----------------------------- user validation ---------------------------- */
    if(!user){
        return NextResponse.json(
             {
                success: false,
                message: "Invalid Credentials",
              },
             {status: 201})
    }

    /* ------------------------------- check role ------------------------------- */
    if (user.role !== reqBody.role) {
        return NextResponse.json({
          success: false,
          message: "role dosent match",
        },{status: 201});
      }


       /* ---------------------------- compare password ---------------------------- */
    const comparePassword = await bcrypt.compare(
        reqBody.password,
        user.password
      );

      if (!comparePassword) {
        return NextResponse.json(
            {
            success: false,
            message: "Invalid Credentials",
            },
            {status: 201});
      }


      /* ------------------------------ create token ------------------------------ */
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "1d",
      });

      /* --------------------------- return success msg --------------------------- */
      const response = NextResponse.json({
        success: true,
        message: "Login Successfully",
        token,
        user,
      },
      {status: 200});

      response.cookies.set("token", token, {
        httpOnly: true,
    })
    return response;

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong in your Login API",
        error,
      },
      { status: 500 }
    );
  }
}
