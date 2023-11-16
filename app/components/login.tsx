
interface userInfo{
  user:{
    name: string;
    email?: string;
    image?: string;
    level?: number;
  }
}

interface PropsData {
    session?: userInfo | null
}

import { signIn, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import Link from 'next/link';
import { authOptions } from "../api/auth/[...nextauth]/route";
// import { useCustomSession } from '../sessions';

export default async function Login(){
  let session = await getServerSession(authOptions) as userInfo;
    // const {data: session, status} = useCustomSession();
    const redirectTo = ()=>{
        sessionStorage.setItem('preUrl', window.location.href);
        window.location.href="/login"
    }

    return (
        <>
        {
        session && session.user
        ?
          <>
          <div className="flex justify-end bg-red-100  font-bold pr-11 py-5">
          <p className="pr-52">{session && session.user?.name}님 반갑습니다.</p>
            <button className="" >로그아웃</button> 
          </div>       
          </>
        :
          <>
          <div className="border-2 bg-slate-300 flex justify-end">
          <Link className="pr-10 font-bold" href="/register">-회원가입-</Link>
          <button className="pr-10 font-bold" >-로그인-</button>
          </div>
        </>
      }
        
        </>
    )
}