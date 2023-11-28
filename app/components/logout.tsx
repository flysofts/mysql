'use client';

import {signOut} from "next-auth/react";

export default function Logout(){
    return(
        <>
        <div className=" mr-5 font-bold my-1">
            <button onClick={()=>{signOut()}}>로그아웃</button>
        </div>
        </>
        
    )
}