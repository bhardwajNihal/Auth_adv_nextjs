//signup api route

import { User } from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

// in nextjs every function needs its separate db connection instance
import ConnectToDb from "@/app/Db/DBconnection";
import { SendEmail } from "@/app/EmailSetup/mailer";
await ConnectToDb();

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    if(!username || !email || !password){
        return NextResponse.json({message : "All fields are required!"}, {status : 400})
    }

    console.log(username, email, password);
    
    // ideally should validate input here, zod or yup would suffice

    const checkIfUserExists = await User.findOne({ email: email });

    if (checkIfUserExists) {
      return NextResponse.json(
        { message: "User already exists!" },
        { status: 400 }
      );
    }

    // hashpassword
    const hashedPassword = await bcrypt.hash(password, 10);

    const savedUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log(savedUser);
    
    // sending verification email
    await SendEmail({email, emailType:"Verify", userId:savedUser._id})

    // finally
    return NextResponse.json({
        success : true,
        message : "user signed up successfully!",
        User : savedUser
    })

  } catch (error) {
    console.error("Error signing up!", error);
    return NextResponse.json(
      { success: false, message: "Internal server error", error: error },
      { status: 500 }
    );
  }
}
