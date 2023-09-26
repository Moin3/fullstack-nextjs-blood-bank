import { connectDB } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password} = reqBody
    const exisitingUser = await User.findOne({ email });

    /* ----------------------------- user validation ---------------------------- */
    if(exisitingUser){
        return NextResponse.json({message: "User already exists"}, {status: 200})
    }

    /* ------------------------------ hash password ----------------------------- */
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        reqBody.password = hashedPassword;

    /* ----------------------------- save user to DB ---------------------------- */
    const user = new User(reqBody);
    await user.save();

    return NextResponse.json(
      {
        success: true,
        message: "User Registerd Successfully",
        user,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "something went wrong in your Register API",
        error,
      },
      { status: 500 }
    );
  }
}
