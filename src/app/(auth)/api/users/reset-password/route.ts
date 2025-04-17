import { SendEmail } from "@/app/EmailSetup/mailer";
import { User } from "@/app/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import ConnectToDb from "@/app/Db/DBconnection";

// always make sure to connect to db, for routes talking to database
await ConnectToDb()

// route to send reset password email
export async function POST(req:NextRequest){

    try {
        const {email} = await req.json()
        console.log(email);
        
        const finduser = await User.findOne({email});
    
        if(!finduser){
            return NextResponse.json({message : "User not registered1"},{status:401})
        }
    
        const sentEmail = await SendEmail({
            email : finduser.email,
            emailType : "reset",
            userId : finduser._id
        })
    
        if(!sentEmail){
            return NextResponse.json({message : "Email can't be sent!"},{status:401});
        }
    
        return NextResponse.json({message : "Email sent successfully!"})
    } catch (error) {
        console.error("something went wrong! Error sending email!",error);
    }
}