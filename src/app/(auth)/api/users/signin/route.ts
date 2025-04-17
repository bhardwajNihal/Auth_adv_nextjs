import ConnectToDb from "@/app/Db/DBconnection";
import { User } from "@/app/models/userModel";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

await ConnectToDb();

export async function POST(req:NextRequest) {
    
   try {
     // get user from body
     const {email, password} = await req.json();
 
     if(!email || !password){
         return NextResponse.json({message:"All fields are required!"}, {status:400});
     }
 
     // check if email exists 
     const foundUser = await User.findOne({email});
 
     if(!foundUser){
         return NextResponse.json({message:"user not found, Please register!"},{status:401});
     }
 
     // check if password is correct 
     const checkPassword = await bcrypt.compare(password, foundUser.password);
 
     if(!checkPassword){
         return NextResponse.json({message:"Invalid password!"},{status:401});
     }
 
     //finally once verified, sign a jwt token and set it to cookies
 
     const token = jwt.sign({
         userId : foundUser._id.toString()
     },process.env.JWT_SECRET as string);
 
     // to attach cookies to the NextResponse object, we have to take different approach
     // 1st get the response instance, later attach cookies to it
 
     const response = NextResponse.json({message: "user signed In!"}, {status:200});
 
     response.cookies.set("token",token, {httpOnly:true});
 
     return response;
   } catch (error) {
    return NextResponse.json({message : "Error Signing up!", error},{status:500})
   }
}