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
        const donar = await getDataFromToken(request);
        const organisation = await Inventory.distinct("organisation", {
            donar,
          });


         
          const totalInBloodQuantityByDonar: TotalBloodByOrganizationAndBloodGroup = {};

          for (const organizationId of organisation) {
            // Find all blood transactions with 'inventoryType' as 'out' and matching organization ID

            const bloodInTransactions = await Inventory.find({
              inventoryType: 'in',
              organisation: organizationId,
            });
      
            // Calculate the total quantity of blood out for each blood group for this organization
            bloodInTransactions.forEach((transaction) => {
              const { bloodGroup, quantity } = transaction;

              if (!totalInBloodQuantityByDonar[organizationId]) {
                totalInBloodQuantityByDonar[organizationId] = {};
              }

              if (!totalInBloodQuantityByDonar[organizationId][bloodGroup]) {
                totalInBloodQuantityByDonar[organizationId][bloodGroup] = 0;
              }

              totalInBloodQuantityByDonar[organizationId][bloodGroup] += quantity;
            });
          }
      
      
     
    
        const organisations = await User.find({ _id: { $in: organisation } });
   



        return NextResponse.json({
            success: true,
            messaage: "get all records successfully",
            organisations,
            totalInBloodQuantityByDonar

        },{status: 200});

    } catch (error:any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, {status: 500});
    }

}

