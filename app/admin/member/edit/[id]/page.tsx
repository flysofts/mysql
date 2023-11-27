'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

interface userType {
    email: string;
    password?: string;
    name : string;
    nickname: string;
    level: number;
    type: string;
    id: number;
}

export default function MemberEdit({ params }: { params: { id: number } }) {
    const [userData, setUserData] = useState<userType>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/admin', {
                    cache: 'no-cache',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        pathUrl: 'edit',
                        id: params.id
                    })
                })
                if(res.ok){
                    const result = await res.json();
                    const data = result.data;
                    if(data.length < 1){
                        alert("데이터가 없습니다.");
                        window.location.href="/admin/member"
                    }
                    setUserData(data[0]);
                }
            } catch (error) {
                alert(error);
            }
        }
        fetchData()
    }, [params.id])

    const [formData, setFormData] = useState<userType>({
        email : userData ? userData.email : '',
        password : userData ? userData.password : '',
        name: userData ? userData.name : '',
        nickname: userData ? userData.nickname : '',
        level : userData ? userData.level : 2,
        type : 'edit',
        id: params.id
    })

    useEffect(()=>{
        setFormData({
        email : userData ? userData.email : '',
        password : userData ? userData.password : '',
        name: userData ? userData.name : '',
        nickname: userData ? userData.nickname : '',
        level : userData ? userData.level : 2,
        type : 'edit',
        id: params.id
        })
    },[userData, params.id])

    const changeEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
        setFormData({
            ...formData, [e.target.name] : e.target.value
        })
    }

    const sumbitEvent = async ()=>{
        try{
            const res = await fetch('http://localhost:3000/api/auth/signup', {
                    cache: 'no-cache',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                if(res.ok){
                    const result = await res.json();
                    const data = result.data;
                    if(result.message === '성공'){
                        alert(data + "님의 정보를 수정하였습니다.");
                        window.location.href= "/admin/member"
                    }
                }
        }catch(error){
            alert(error)
        }
    }
    console.log(formData)
    return (
        <>
            <div className="widget w-full overflow-hidden mb-5 p-4">회원 수정</div>
            <div className="widget w-full overflow-hidden mb-5 p-4">
                <div className="flex mb-4 items-center">
                    <label htmlFor="email" className="basis-3/12 text-xs sm:text-sm">이메일 : </label>
                    <input onChange={changeEvent} defaultValue={userData && userData.email} type="text" name="email" className="border text-sm p-2 rounded-md" />
                </div>
            </div>
            <div className="widget w-full overflow-hidden mb-5 p-4">
                <div className="flex mb-4 items-center">
                    <label htmlFor="email" className="basis-3/12 text-xs sm:text-sm">패스워드 : </label>
                    <input onChange={changeEvent} defaultValue={userData && userData.password} type="password" name="password" className="border text-sm p-2 rounded-md" />
                </div>
            </div>
            <div className="widget w-full overflow-hidden mb-5 p-4">
                <div className="flex mb-4 items-center">
                    <label htmlFor="email" className="basis-3/12 text-xs sm:text-sm">이름 : </label>
                    <input onChange={changeEvent} defaultValue={userData && userData.name} type="text" name="name" className="border text-sm p-2 rounded-md" />
                </div>
            </div>
            <div className="widget w-full overflow-hidden mb-5 p-4">
                <div className="flex mb-4 items-center">
                    <label htmlFor="email" className="basis-3/12 text-xs sm:text-sm">닉네임 : </label>
                    <input onChange={changeEvent} defaultValue={userData && userData.nickname} type="text" name="nickname" className="border text-sm p-2 rounded-md" />
                </div>
            </div>
            <div className="widget w-full overflow-hidden mb-5 p-4">
                <div className="flex mb-4 items-center">
                    <label htmlFor="email" className="basis-3/12 text-xs sm:text-sm">레벨 : </label>
                    <select onChange={changeEvent} name="level" value={userData && userData.level} className="border text-sm px-5 py-2 rounded-md">
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-end gap-x-5">
                <Link href="/admin/member" className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600">취소</Link>
                <button onClick={sumbitEvent} className="bg-orange-500 text-white px-4 py-2 rounded shadow-md hover:bg-orange-600">수정</button>
            </div>
        </>
    )

    return (
        <p>{params.id}</p>
    )
}