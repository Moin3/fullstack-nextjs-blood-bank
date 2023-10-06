import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/config/db";
import Inventory from "@/models/inventoryModel";
import mongoose from "mongoose";


connectDB()

export async function GET(request:NextRequest){

    try {
        const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
        const bloodGroupData = [] as any;
        const orgId = await getDataFromToken(request);
        const organisation = new mongoose.Types.ObjectId(orgId);
        await Promise.all(
        bloodGroups.map(async (bloodGroup) => {
           /* -------------------------------- total in -------------------------------- */
            const totalIn = await Inventory.aggregate([
              {
                $match: {
                  bloodGroup: bloodGroup,
                  inventoryType: "in",
                  organisation,
                },
              },
              {
                $group: {
                  _id: null,
                  total: { $sum: "$quantity" },
                },
              },
            ]);
    /* -------------------------------- total out ------------------------------- */
            const totalOut = await Inventory.aggregate([
              {
                $match: {
                  bloodGroup: bloodGroup,
                  inventoryType: "out",
                  organisation,
                },
              },
              {
                $group: {
                  _id: null,
                  total: { $sum: "$quantity" },
                },
              },
            ]);

            /* ----------------------------- CALCULATE TOTAL ---------------------------- */
            const availabeBlood =
              (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);
    
            //PUSH DATA
            bloodGroupData.push({
              bloodGroup,
              totalIn: totalIn[0]?.total || 0,
              totalOut: totalOut[0]?.total || 0,
              availabeBlood,
            });
          })
          );

        return NextResponse.json({
            success: true,
            messaage: "get blood group data records successfully",
            bloodGroupData

        },{status: 200});

    } catch (error:any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, {status: 500});
    }

}

