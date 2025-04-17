import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken"

export async function GetTokenData(req:NextRequest) {
    
    const token = req.cookies.get("token")?.value;
    
        if(!token){
            return NextResponse.json({message : "Invalid session! token not provided."});
        }
    
        const decoded = jwt.verify(token.toString(),process.env.JWT_SECRET as string) as JwtPayload; //casting it to jwtpayload, so that ts can be assured
    
        if(!decoded){
            return NextResponse.json({message : "Invalid token!"});
        }
    
        // finally once the token is verified, extract the userId, give back the user creds
    
        return decoded.userId;
}