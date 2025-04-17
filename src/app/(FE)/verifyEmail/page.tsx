
"use client"
import { useSearchParams } from "next/navigation"
import axios from "axios";
import { useEffect, useState } from "react";

export default function Verify(){

    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    // console.log("token : " , token);
    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");    

    useEffect(() => {
        async function verifyToken(){
            setLoading(true)
            try {
                // suffic NEXT_PUBLIC makes it accessible to client side code, without it can't be acessed, like only DOMAIN gave undefined
                const res = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/api/users/verify-email`,{token});
        
                if(res.status===200){
                    setMessage("Email Verified Successfully! Continue Signin In!");
                    setLoading(false);
                }
                else{
                    setMessage("Email Verification Failed! Try Again later!");
                    setLoading(false);
                }
            } catch (error) {
                setMessage(`Something Went Wrong! Email Can't be verified, ERROR: ${error}`)
            }finally{
                setLoading(false);
            }
        }
        verifyToken();
    
    },[token])

    return <div>
        {loading && <p className="text-center mt-12">Verifying Email...</p>}

        <p className="text-center mt-12">{message}</p>

        <br />
        <p className="text-center mt-4">Continue logging In! <br /><a className="text-blue-600 hover-underline" href="http://localhost:3000/signin">Sign In</a></p>

    </div>



}