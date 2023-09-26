import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import Inventory from "@/models/inventoryModel";

connectDB()

export async function GET(request:NextRequest){

    try {

        const organisationId = await getDataFromToken(request);
        const inventory = await Inventory.find({organisation:organisationId})
                            .populate({
                                path: "donar",
                                select: "-password",
                              })
                            .populate("hospital")
                            .sort({ createdAt: -1 });

        if (inventory.length === 0) {
            throw new Error("Only authorized user can fetch all blood info.");
          }


        return NextResponse.json({
            success: true,
            messaage: "get all records successfully",
            inventory,
        },{status: 200});

    } catch (error:any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, {status: 500});
    }

}