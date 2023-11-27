import db from '@/db';
import { RowDataPacket } from 'mysql2';
import React from 'react';
import Link from "next/link";

export default async function SearchResult({
    params
} : {
    params?: {keyword?: string}
}){
    const keywords = params?. keyword !== undefined ? params.keyword : "";
    const [results] = await db.query<RowDataPacket[]>('select * from parkjihawn.board where title Like ?', [`%${decodeURIComponent(keywords)}%`])
    console.log(results)
    return(
        <div>
            <p className='font-bold'>입력값: {decodeURIComponent(keywords)}</p>
            {results.length === 0 && <p>입력하신 검색내용은 없습니다.</p>}
            {results && results.length > 0 && results.map((e,i)=>{
                return(
                    <div key={i}>
                        <Link href={`/post/${e.id}`}>
                        <p>제목:{e.title}</p>
                        </Link>
                        <p>내용:{e.content}</p>
                        <p>유저 id:{e.userid}</p>
                    </div>
                )
            })}
        </div>
    )
}