"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const SignIn = () => {

    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [formdata, setformdata] = useState({
        email : "",
        password : ""
    })

    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        const {name,value} = e.target;
        setformdata((prevData) => ({...prevData, [name]:value}));
    }

    async function handleSubmit(){
        console.log(formdata);
        setLoading(true);
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/api/users/signin`,formdata);
            // console.log(res.data.message);
            console.log(res);
            alert(res.data.message);
            setLoading(false)
            router.push("/profile");
        } catch (error) {
            console.error("Error signing Up!" + error);
            alert("Error signing In!")
            setLoading(false)
        }


    }

  return (
    <div className='h-60 w-64 p-4 m-8 border rounded flex flex-col gap-4'>
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

    <button disabled={loading} className={`${(loading) ? "bg-gray-500" : "bg-blue-600"} rounded p-2`} onClick={handleSubmit}>SignIn</button>
    </div>
  )
}

export default SignIn