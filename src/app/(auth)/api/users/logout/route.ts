import { NextResponse } from "next/server";

export async function GET() {
    
    try {
        const response = NextResponse.json({
            message : "user logged out!"
        },{status:200});
    
        response.cookies.set("token","",{
            httpOnly:true, 
            expires:new Date(0)   //new Date(0) creates a Date object representing the Unix epoch 
            // setting a past date(here 1970), tells the browser that this cookie is expired, delete it.
        })
    
        return response;
    } catch (error) {
        console.error("Error logging out!",error);
    }

}