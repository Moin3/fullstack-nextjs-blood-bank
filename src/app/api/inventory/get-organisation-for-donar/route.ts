import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectDB } from "@/config/db";
import Inventory from "@/models/inventoryModel";

connectDB()

export async function GET(request:NextRequest){

    try {
        const donar = await getDataFromToken(request);

    /* ---------------------- Donar related to organisation --------------------- */
      const orgId = await Inventory.distinct("organisation", {
        donar,
      });

      const organisations = await User.find({ _id: { $in: orgId } });
  
      return NextResponse.json({
        success: true,
        message: "Organisation Record Fetched Successfully",
        organisations,
      },{status: 200});

    } catch (error:any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, {status: 500});
    }

}


