import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectDB } from "@/config/db";
import Inventory from "@/models/inventoryModel";


interface TotalBloodByOrganizationAndBloodGroup {
    [organizationId: string]: {
      [bloodGroup: string]: number;
    };
  }
  

connectDB()

export async function GET(request:NextRequest){

    try {
        const hospital = await getDataFromToken(request);
        const organisation = await Inventory.distinct("organisation", {
            hospital,
          });


         
          const totalBloodQuantityByOrg: TotalBloodByOrganizationAndBloodGroup = {};

          for (const organizationId of organisation) {
            // Find all blood transactions with 'inventoryType' as 'out' and matching organization ID

            const bloodOutTransactions = await Inventory.find({
              inventoryType: 'out',
              organisation: organizationId,
            });
      
            // Calculate the total quantity of blood out for each blood group for this organization
            bloodOutTransactions.forEach((transaction) => {
              const { bloodGroup, quantity } = transaction;

              if (!totalBloodQuantityByOrg[organizationId]) {
                totalBloodQuantityByOrg[organizationId] = {};
              }

              if (!totalBloodQuantityByOrg[organizationId][bloodGroup]) {
                totalBloodQuantityByOrg[organizationId][bloodGroup] = 0;
              }

              totalBloodQuantityByOrg[organizationId][bloodGroup] += quantity;
            });
          }
      
      
     
    
        const organisations = await User.find({ _id: { $in: organisation } });
   



        return NextResponse.json({
            success: true,
            messaage: "get all records successfully",
            organisations,
            totalBloodQuantityByOrg

        },{status: 200});

    } catch (error:any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, {status: 500});
    }

}

