"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'

const Profile = () => {

    const router = useRouter()

async function handleLogout(){
    
    await axios.get("http://localhost:3000/api/users/logout");

    alert("user logged out!");
    router.push("/signin");
    
}
    return (
        <>
            <div>Profile</div>

            <button onClick={handleLogout}>logout</button>
        </>
    )
}

export default Profile