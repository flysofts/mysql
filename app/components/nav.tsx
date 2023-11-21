interface userInfo {
    user:{
      name: string;
      email?: string;
      image?: string;
      level?: number;
    }
  }
  
  
  
  import { getServerSession } from 'next-auth';
  
  import Link from 'next/link';
  import { authOptions } from '../api/auth/[...nextauth]/route';
  import Logout from './logout';
  import Login from './login';
  
  export default async function Nav(){
    let session = await getServerSession(authOptions) as userInfo;
    
  
    return (
      <>
        {
           session && session.user 
          ? 
            <>
            <div className='flex justify-between bg-slate-50'>
              <p className='ml-5 font-bold mt-5'>{session && session.user?.name}님 반갑습니다.</p>
              <Logout/>
            </div>
            </>
          :
            <>
            <Link className='mr-5' href="/register">회원가입</Link>
            <Login/>
          </>
        }
        
        
      </>
    )
  }