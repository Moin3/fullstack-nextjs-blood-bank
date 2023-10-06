import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import User from "@/models/userModel";



connectDB()

export async function GET(request:NextRequest){

    try {
        const hospitalData = await User
                .find({ role: "hospital" })
                .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            Toatlcount: hospitalData.length,
            message: "Donar List Fetched Successfully",
            hospitalData,

        },{status: 200});

    } catch (error:any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, {status: 500});
    }

}