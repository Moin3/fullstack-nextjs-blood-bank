import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import User from "@/models/userModel";



connectDB()

export async function GET(request:NextRequest){

    try {
        const donarData = await User
                .find({ role: "donar" })
                .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            Toatlcount: donarData.length,
            message: "Donar List Fetched Successfully",
            donarData,

        },{status: 200});

    } catch (error:any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, {status: 500});
    }

}