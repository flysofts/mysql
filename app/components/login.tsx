'use client';
export default function Login(){
  const redirectTo = ()=>{
    sessionStorage.setItem('preUrl', window.location.href);
    window.location.href="/login";
  }
  return (
    <div className="font-bold ml-5">
      <button onClick={redirectTo}>로그인</button>
    </div>
  )
}