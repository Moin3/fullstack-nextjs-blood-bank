import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectDB } from "@/config/db";
import Inventory from "@/models/inventoryModel";

connectDB()

export async function GET(request:NextRequest){

    try {
        const organisation = await getDataFromToken(request);

    /* ---------------------- Donar related to organisation --------------------- */
      const donorId = await Inventory.distinct("donar", {
        organisation,
      });

      const donars = await User.find({ _id: { $in: donorId } });
  
      return NextResponse.json({
        success: true,
        message: "Donar Record Fetched Successfully",
        donars,
      },{status: 200});

    } catch (error:any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, {status: 500});
    }

}


