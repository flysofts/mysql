'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

interface postType {
    id : number;
    parentid ? : number;
    title ? : string;
    content : string;
    userid : string;
    username : string;
    count ? : number;
    date : string;
}

export default function NewPost() {
    const [postData, setPostData] = useState<postType[]>();
    const [commentData, setCommentData] = useState<postType[]>();

    useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await fetch('/api/admin', {
                    cache : 'no-cache',
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({
                        pathUrl : 'mainPost'
                    })
                });
                const data = await res.json();
                setPostData(data.data.newPost);
                setCommentData(data.data.newComment);
            } catch(error) {
                alert(error);
            }
        }
        fetchData();
    }, []);

    return(
        <>
            <div className="mt-5 md:mt-0 basis-full md:basis-[49.3%]">
                <div className="widget mb-5">
                    <div className="font-bold p-5 py-3 flex justify-between items-center">
                        <h3>신규 게시글 {postData && postData.length}개</h3>
                        <Link href='/admin/member' className="focus:outline-none bg-green-300 hover:bg-green-400  focus:ring-4 focus:ring-green-100 font-bold rounded-lg text-sm p-5 py-2.5">게시글 전체</Link>
                    </div>
                    <div className="w-full">
                        <ul className="flex py-4 text-sm justify-between border-b bg-[#f6f9fc]">
                            <li className="basis-[33%] text-[#6f809a] font-bold text-center text-xs sm:text-xs">닉네임</li>
                            <li className="basis-2/5 text-[#6f809a] font-bold text-center text-xs sm:text-xs">제목</li>
                            <li className="basis-1/5 text-[#6f809a] font-bold text-center text-xs sm:text-xs">작성일</li>
                        </ul>
                        {
                            postData && postData.map((e, i) => {
                                const date = new Date(e.date);
                                const hour = (date.getHours() + 9).toString().padStart(2, '0');
                                const minutes = date.getMinutes().toString().padStart(2, '0');
                                const seconds = date.getSeconds().toString().padStart(2, '0');
                                const formatDate = `${hour}:${minutes}:${seconds}`;
                                return (
                                    <ul key={i} className="flex justify-between border-b last:border-0 items-center">
                                        <li className="basis-[33%] text-[#6f809a] font-bold text-center text-xs sm:text-xs py-2.5">{e.username}</li>
                                        <li className="basis-2/5 text-[#6f809a] font-bold text-center text-xs sm:text-xs py-2.5">{e.title}</li>
                                        <li className="basis-1/5 text-[#6f809a] font-bold text-center text-xs sm:text-xs py-2.5">{formatDate}</li>
                                    </ul>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="widget md:mb-5">
                    <div className="font-bold p-5 py-3 flex justify-between items-center">
                        <h3>신규 댓글 {commentData && commentData.length}개</h3>
                        <Link href='/admin/member' className="focus:outline-none bg-green-300  hover:bg-green-400  focus:ring-4 focus:ring-green-100 font-bold rounded-lg text-sm p-5 py-2.5">댓글 전체</Link>
                    </div>
                    <div className="w-full">
                        <ul className="flex py-4 text-sm justify-between border-b bg-[#f6f9fc]">
                            <li className="basis-[33%] text-[#6f809a] font-bold text-center text-xs sm:text-xs">닉네임</li>
                            <li className="basis-2/5 text-[#6f809a] font-bold text-center text-xs sm:text-xs">댓글 내용</li>
                            <li className="basis-1/5 text-[#6f809a] font-bold text-center text-xs sm:text-xs">작성일</li>
                        </ul>
                        {
                            commentData && commentData.map((e, i) => {
                                const date = new Date(e.date);
                                const hour = (date.getHours() + 9).toString().padStart(2, '0');
                                const minutes = date.getMinutes().toString().padStart(2, '0');
                                const seconds = date.getSeconds().toString().padStart(2, '0');
                                const formatDate = `${hour}:${minutes}:${seconds}`;
                                return (
                                    <ul key={i} className="flex justify-between border-b last:border-0 items-center">
                                        <li className="basis-[33%] text-[#6f809a] font-bold text-center text-xs sm:text-xs py-2.5">{e.username}</li>
                                        <li className="basis-2/5 text-[#6f809a] font-bold text-center text-xs sm:text-xs py-2.5">{e.content}</li>
                                        <li className="basis-1/5 text-[#6f809a] font-bold text-center text-xs sm:text-xs py-2.5">{formatDate}</li>
                                    </ul>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}