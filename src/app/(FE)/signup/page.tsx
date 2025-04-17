"use client"
import axios from 'axios';
import React, { useState } from 'react'

const SignUp = () => {

    const [isSignedUp, setIsSignedUp] = useState(false)
    const [loading, setLoading] = useState(false);
    const [formdata, setformdata] = useState({
        username : "",
        email : "",
        password : ""
    })

    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        const {name,value} = e.target;
        setformdata((prevData) => ({...prevData, [name]:value}));
    }

    async function handleSubmit(){
        // console.log(formdata);
        setIsSignedUp(false);
        setLoading(true);
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/api/users/signup`,formdata);
            // console.log(res.data.message);
            alert(res.data.message);
            setIsSignedUp(true);
            setLoading(false)
        } catch (error) {
            console.error("Error signing Up!" + error);
            alert("Error signing up!")
            setLoading(false)
        }


    }

  return (
    <div className='h-80 w-64 p-4 m-8 border rounded flex flex-col gap-4'>
    <input className='border rounded border-gray-700 p-2' type="text"
    name="username"
    value={formdata.username}
    onChange={handleChange}
    placeholder='username'
    />
    <input className='border rounded border-gray-700 p-2' type="text"
    name="email"
    value={formdata.email}
    onChange={handleChange}
    placeholder='email'
    />
    <input className='border rounded border-gray-700 p-2' type="password"
    name="password"
    value={formdata.password}
    onChange={handleChange}
    placeholder='password'
    />

    <button disabled={loading} className={`${(loading) ? "bg-gray-500" : "bg-blue-600"} rounded p-2`} onClick={handleSubmit}>SignUp</button>

    {isSignedUp && <p>Verification email has been sent. Verify Your Email!</p>}
    </div>
  )
}

export default SignUp