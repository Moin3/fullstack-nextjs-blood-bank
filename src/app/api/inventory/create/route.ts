import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/models/userModel";
import { connectDB } from "@/config/db";
import Inventory from "@/models/inventoryModel";

connectDB()

export async function POST(request:NextRequest){

    try {
        const reqBody = await request.json();
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id:userId}).select("-password");

        if (!user) {
            throw new Error("User Not Found");
          }

        if (reqBody.inventoryType === "in" && user.role !== "donar") {
            throw new Error("You can't access doner account");
        }
        if (reqBody.inventoryType === "out" && user.role !== "hospital") {
            throw new Error("You can't access hospital account");
        }

        //   if (reqBody.inventoryType == "out") {
        //     const requestedBloodGroup = reqBody.bloodGroup;
        //     const requestedQuantityOfBlood = reqBody.quantity;
        //     const organisation = new mongoose.Types.ObjectId(userId);
        //     //calculate Blood Quanitity
        //     const totalInOfRequestedBlood = await Inventory.aggregate([
        //       {
        //         $match: {
        //           organisation,
        //           inventoryType: "in",
        //           bloodGroup: requestedBloodGroup,
        //         },
        //       },
        //       {
        //         $group: {
        //           _id: "$bloodGroup",
        //           total: { $sum: "$quantity" },
        //         },
        //       },
        //     ]);
        //     // console.log("Total In", totalInOfRequestedBlood);
        //     const totalIn = totalInOfRequestedBlood[0]?.total || 0;
        //     //calculate OUT Blood Quanitity
      
        //     const totalOutOfRequestedBloodGroup = await Inventory.aggregate([
        //       {
        //         $match: {
        //           organisation,
        //           inventoryType: "out",
        //           bloodGroup: requestedBloodGroup,
        //         },
        //       },
        //       {
        //         $group: {
        //           _id: "$bloodGroup",
        //           total: { $sum: "$quantity" },
        //         },
        //       },
        //     ]);
        //     const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;
      
        //     //in & Out Calc
        //     const availableQuanityOfBloodGroup = totalIn - totalOut;
        //     //quantity validation
        //     if (availableQuanityOfBloodGroup < requestedQuantityOfBlood) {
        //       return NextResponse.json({
        //         success: false,
        //         message: `Only ${availableQuanityOfBloodGroup} ml of ${requestedBloodGroup.toUpperCase()} is available`,
        //       },{status: 500});
        //     }
        //     reqBody.hospital = user?._id;
        //   } else {
        //     reqBody.donar = user?._id;
        //   }
        
            /* ------------------------------- save blood record ------------------------------ */
        const inventory = new Inventory(reqBody);
        await inventory.save();
        return NextResponse.json({
        success: true,
        message: "New Blood Reocrd Added",
        },{status: 201});

    } catch (error:any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, {status: 500});
    }

}