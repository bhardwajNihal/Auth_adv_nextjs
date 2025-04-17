

// actual route to reset password by checking if token is valid and finally update Db entry

import { NextRequest, NextResponse } from "next/server";
import ConnectToDb from "@/app/Db/DBconnection";
import { User } from "@/app/models/userModel";
import bcrypt from "bcrypt"
await ConnectToDb();
// fetch token from req body

// verify the token
// finally once verified take the new password and make an entry to db

export async function POST(req:NextRequest) {
    
    const {token, newPassword} = await req.json();

    if(!token){
        return NextResponse.json({message : "token not provided!"},{status:400});
    }    

    // find if the user with the token is there in the db
    const verifiedUser = await User.findOne({
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: {$gt : Date.now()},
    });

    if(!verifiedUser){
        return NextResponse.json({message : "Invalid token! Resend Email."},{status:400});
    }

    //finally once the user is verified, update the password entry in db
    const NewHashedPassword = await bcrypt.hash(newPassword,10);
    await User.findByIdAndUpdate({_id : verifiedUser._id},{
        password : NewHashedPassword
    })

    return NextResponse.json({message : "Password Updated successfully! Continue Signin In!"},{status:200});
}