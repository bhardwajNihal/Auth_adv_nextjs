import { NextRequest, NextResponse } from "next/server";
import { User } from "@/app/models/userModel";
import ConnectToDb from "@/app/Db/DBconnection";

await ConnectToDb();

export async function POST(req:NextRequest){
    try {
    // extract token from body
    const reqBody = await req.json();
    const token = reqBody.token;

    if(!token){
        return NextResponse.json({message: "token not found!"}, {status:400});
    }

    // check if the user exists for the given token

    const foundUser = await User.findOne({
        verifyToken: token, 
        verifyTokenExpiry : {$gt : Date.now()}      // make sure expiry is valid
    });

    if(!foundUser){
        return NextResponse.json({message : "Invalid Token!"}, {status:401});
    }

    // once token is verified i.e. the user is found, simply mark entry to db 

    await User.updateOne({_id : foundUser._id},{
        verifyToken : undefined,
        verifyTokenExpiry : undefined,
        isVerified  :true
    })

    return NextResponse.json({
        message : "Email verified successfully!"
    },{status:200})

    } catch (error) {
        return NextResponse.json({
            message : "Email verification failed!",
            error
        },{status:500})
    }
}