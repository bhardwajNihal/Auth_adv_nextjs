"use client"
import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

// FE page to send request to reset password and update entry to db
const Reset = () => {

  // extract token from params
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [cfmPassword, setCfmPassword] = useState("")
  const [loading, setLoading] = useState(false);

  // send axios post request with both the token and new password in its body,
  async function handleSubmit() {

    if(password!==cfmPassword){
      alert("Passwords must match!");
      return;
    }

    try {
      setLoading(true)
      const res = await axios.post("api/users/DbPwdUpdate",{
        token,
        newPassword:password,
      })
      setLoading(false);
      alert(res.data.message);
    } catch (error) {
      console.error("Error Resetting Password!",error);
      alert("Error reseting Password!")
      setLoading(false);
  }
}

  return (
    <>
      <div>reset password</div>

      <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <input type="password" placeholder="Confirm New Password" value={cfmPassword} onChange={(e) => setCfmPassword(e.target.value)}/>
      <br />
      <button disabled={loading} className={`${(loading) ? "bg-gray-500" : "bg-blue-600"} rounded p-2`}  onClick={()=>handleSubmit()}>{loading ? "Submitting..." : "Submit"}</button>
    </>
  )
}

export default Reset