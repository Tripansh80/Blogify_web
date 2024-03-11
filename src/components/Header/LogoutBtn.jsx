import React from "react";

import {useDispatch } from "react-redux";
import authservice from "../../Appwrite/auth";

import { logout } from "../../store/Authslice";

function LogoutBtn () {
    const dispath=useDispatch()
    const logoutHandler=()=>{
        authservice.logout().then(()=>{
            dispath(logout())
        })
    }
return (
    <>
    <div>
        <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full" onClick={logoutHandler}type="button">Log-out</button>
    </div>
    </>
)
}
export default LogoutBtn