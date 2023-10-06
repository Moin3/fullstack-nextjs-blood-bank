import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import User from "@/models/userModel";



connectDB()

export async function GET(request:NextRequest){

    try {
        const orgData = await User
                .find({ role: "organisation" })
                .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            Toatlcount: orgData.length,
            message: "Donar List Fetched Successfully",
            orgData,

        },{status: 200});

    } catch (error:any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, {status: 500});
    }

}