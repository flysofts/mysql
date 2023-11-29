
import ChartCom from "../components/admin/chart/chart";
import NewMember from "../components/admin/chart/newmember";
import NewPost from "../components/admin/chart/newpost";
import TotalCount from "../components/admin/chart/totalcnt";



export default async function Admin() {
    

   
    return (
        <>
        <div className='max-w-7xl mx-auto'>
                <p className='text-sm text-center font-bold mb-5'>관리자 페이지</p>                 
                <TotalCount />
                <div className="w-full my-5 flex flex-wrap justify-between">
                    <NewMember/>
                    <NewPost />
                </div>
            </div>
            <ChartCom/>
        </>
    )
}