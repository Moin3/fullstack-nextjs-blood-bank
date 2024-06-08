import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectDB } from "@/config/db";

connectDB();

export async function GET(request: NextRequest) {
    try {
        const users = await User.find({});
        return NextResponse.json({
            success: true,
            donarData: users
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong while fetching data",
            error: error.message
        }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const id = await request.json();
        await User.findByIdAndDelete(id);
        return NextResponse.json({
            success: true,
            message: "User Deleted successfully"
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong with Delete Api",
            error: error.message
        }, { status: 500 });
    }
}
