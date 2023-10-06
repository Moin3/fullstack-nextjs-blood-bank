import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectDB } from "@/config/db";

connectDB()

export async function DELETE(request:NextRequest){
    
    try {
        const id = await request.json();
        await User.findByIdAndDelete(id);
        return NextResponse.json({
            success: true,
            message: "User Deleted successfully"
        }, {status: 200});

    } catch (error:any) {
        return NextResponse.json({
            success: false,
            message: "Something wrong with Delete Api",
            error: error.message
        }, {status: 500});
    }

}