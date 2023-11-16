import db from '@/db';

import {RowDataPacket} from 'mysql2/promise';
import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]/route';
export default async function Home() {

interface userInfo{
  user:{
    name: string;
    email?: string;
    image?: string;
    level?: number;
  }
}

    const page = 1;
    const perPage = 15;
    const offset = (page - 1) * perPage;

    
      const [results] = await db.query<RowDataPacket[]>('SELECT * FROM parkjihawn.board order by date DESC limit ? offset ?', [perPage, offset]);
      const [countResult] = await db.query<RowDataPacket[]>('select count(*) as cnt from parkjihawn.board');
      const totalCnt = countResult[0].cnt;
      console.log(results)

      
  let sessions = await getServerSession(authOptions) as userInfo;
  console.log(sessions)

  return (
    <>
    <div className="mx-auto max-w-7xl p-6 mt-32 bg-sky-300 rounded">
        <div className="flex justify-between items-center mb-16 ">
          <h1 className="text-xl font-bold bg-white rounded py-2 px-28 m-auto">게시판</h1>
          {
            sessions &&
          <Link href="/write" className='bg-white px-4 py-2 rounded shadow-md hover:bg-slate-200 font-bold'>글쓰기</Link>
          }
        </div>
        <div className="bg-white shadow-md rounded-lg">
          <div className="min-w-full">
            <ul className="bg-sky-500 flex justify-between">
              <li className="px-6 basis-2/12 py-3 text-center">번호</li>
              <li className="px-6 basis-6/12 py-3 text-center">제목</li>
              <li className="px-6 basis-2/12 py-3 text-center">작성자</li>
              <li className="px-6 basis-2/12 py-3 text-center">작성일</li>
            </ul>
            {
        results && results.map((e,i)=>{
          const date =new Date(e.date);
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const day = date.getDate().toString().padStart(2, '0');
          const formatDate = `${year}-${month}-${day}`
          return(
            <ul key={i} className='flex justify-between'>
              <li className="px-6 basis-2/12 py-3 text-center">{results.length - i}</li>
              <Link href={`post/${e.id}`}   className="px-6 basis-6/12 py-3 text-center">{e.title}</Link>
              <li className="px-6 basis-2/12 py-3 text-center">{e.author}</li>
              <li className="px-6 basis-2/12 py-3 text-center">{formatDate}</li>                    
            </ul>
          )
        })
      }
          </div>
        </div>
      </div></>

  )
}
