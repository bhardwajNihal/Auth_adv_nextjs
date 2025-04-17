import { NextRequest, NextResponse } from "next/server";
import { User } from "@/app/models/userModel";
import { GetTokenData } from "@/app/utils/extractTokenInfo";

export async function GET(req:NextRequest) {
    
    // separating the tokenData extraction logic into a separate function make it reusable
    // extracting userId calling the function
    const userId = await GetTokenData(req);

    const foundUser = await User.findOne({_id:userId}).select("-password");//specifying the field we don't want

    if(!foundUser){
        return NextResponse.json({message : "User not found!"});
    }

    //finally 
    return NextResponse.json({user : foundUser});

}

// TS specifics for decoding jwt : 
    // jwt.verify() is returning something that's either:
    // a string, or
    // a JwtPayload (aka an object { [key: string]: any })
    // So TS is like:
    // “I can’t be sure this has .userId, what if it’s a string?”