
"use client"
import axios from 'axios';
import React, { useState } from 'react'

// route to send password reset email
const ResetPassword = () => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false)

    async function handleReset() {
        setLoading(true)
       const res = await axios.post("http://localhost:3000/api/users/reset-password",{email:email})

       if(res.status===200){
        alert("email sent Successfully! reset password visiting it.")
       }
       else{
        alert("Email can't be sent!")
       }
       setLoading(false)
    }

  return (
    <div className='text-center'>
       <div>Reset Password</div>
    <p>Type in email, you will recieve email with reset link!</p>

    <input className='border p-2 border-gray-700' type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
    <br /> 
    <button disabled={loading} className={`${(loading) ? "bg-gray-500" : "bg-blue-600"} rounded p-2`} onClick={handleReset}>Reset</button>
    </div>
  )
}

export default ResetPassword