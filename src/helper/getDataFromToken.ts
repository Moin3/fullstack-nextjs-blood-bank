import { NextRequest,NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken:any = jwt.verify(token, process.env.JWT_SECRET!);
        if(!decodedToken){
            return NextResponse.json({
                success: false,
                message: "Authentication Failed",
              },{status:401});
        }else{
            return decodedToken.id;

        }
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error,
            message: "Authentication Failed",
          },{status:401});
    }

}