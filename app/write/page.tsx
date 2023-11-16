'use client';

interface formType {
  userid: string;
  username: string;
  title: string;
  content: string;
}
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCustomSession } from "../sessions";

export default function Write(){
  const {data: session} =useCustomSession();
  const [formData, setFormData] = useState<formType>({
    userid: session?.user?.email ??'',
    username : session?.user?.name ??'',

    title: '',
    content: ''
  })
  useEffect(()=>{
    setFormData({
      userid: session?.user.email ?? '',
    username: session?.user.name ?? '',
    title: '',
    content: ''
    })
  },[session?.user.name, session?.user.email])



  const changeEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    setFormData({...formData, [e.target.name] : e.target.value});
    console.log(formData)
  }
  const submitEvent = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try{
      const res = await fetch('/api/write',{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if(res.ok){
        const data = await res.json();
        console.log(data.message);
        // alert('정상적으로 등록 하였습니다.');
        // window.location.href= "/"
      }else{
        const errorData = await res.json();
        console.log(errorData.error);
      }

    }catch(error){
      console.log(error);
    }
  }
  if(!session){
    return <p className="text-center font-bold bg-red-400 py-5">로그인 이후 사용해주세요.</p>
  }

  return (
    <>
    <div className="flex justify-center mt-64">
      <form className="flex flex-col max-w-7xl" method="post" onSubmit={submitEvent}>
        <div className="font-bold mb-5"> 글 작성자:
        <input type="text" name="name" defaultValue={session && session.user.name} onChange={changeEvent} className="w-full shadow text-gray-700 text-sm mb-2 border "/>
        </div>
        <div className="font-bold mb-5"> 글 제목:
        <input type="text" className="w-full shadow text-gray-700 text-sm mb-2 border" name="title" onChange={changeEvent} defaultValue={formData.title} />
        </div>
        <div className="font-bold"> 글 내용:
        <textarea name="content" className="w-full shadow text-gray-700 text-lg mb-2 border p-10" onChange={changeEvent} defaultValue={formData.content}></textarea>
        </div>
        <div className="">
        <button className="bg-sky-500 text-white px-4 py-2 rounded shadow-md hover:bg-sky-600 focus:outline-none">등록</button>
        <Link href="/" className="bg-red-500 text-white ml-60 px-4 py-2 rounded shadow-md hover:bg-red-600 focus:outline-none text-center">취소</Link>
        </div>
      </form>
      </div>
    </>
  )
}