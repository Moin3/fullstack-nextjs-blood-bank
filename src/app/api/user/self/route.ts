import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectDB } from "@/config/db";

connectDB()

export async function GET(request:NextRequest){

    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password");
        return NextResponse.json({
            success:true,
            message: "User fetched Successfully",
            user
        })
    } catch (error:any) {
        return NextResponse.json({
            success: false,
            message: "unable to get current user",
            error: error.message
        }, {status: 500});
    }

}