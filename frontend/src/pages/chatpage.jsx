import React, { useContext, useEffect, useState,useRef } from 'react'
import {fleetContext} from '../context/Context.jsx'
import { LogOut } from 'lucide-react';
import axios from 'axios';
import {toast} from 'react-toastify'
import ChatContainer from './chatContainer.jsx'
import ChatSender from '../components/ChatSender'


const Chatpage = () => {
const {url,userdata,getuserdata,logout,chats,setchats,getallChats,
  friends,setfriends,getallFriends,
  people,setpeople,getallPeople}=useContext(fleetContext)


const [selectedView,setselectedview]=useState("chats")
const [profilepic,setprofilepic]=useState(null)
const [selectedUser,setselecteduser]=useState(null)
  const fileInputRef = useRef(null);


const handleAvatarClick=()=>{
  fileInputRef.current.click()

}
const handlefilechange=(e)=>{
  const file=e.target.files[0]
  if(!file) return;
e.target.value = ""
  const reader=new FileReader()
  reader.readAsDataURL(file)

  reader.onloadend=async()=>{
    const base64=reader.result;
    setprofilepic(base64);

    try{
      const res=await axios.post(url+'/user/updatepic',{profilepic:base64},{withCredentials:true})
    if(res.data.success){
      await getuserdata()
      toast.success("profile pic updated")
      setprofilepic(null)
    }
    }


    catch(err){
    console.log(err)
  }



  }
}


useEffect(()=>{
   if (!userdata) return;
  const fetchall=async()=>{
  await getallChats()
  await getallFriends()
  await getallPeople()

  }
  fetchall()


},[userdata])


useEffect(()=>{
  const fetchdata=async()=>{
    await getuserdata()
  }
  fetchdata()

},[])

let displayuser=[];
if(selectedView==="chats"){
  displayuser=chats
}
else if(selectedView==="friends"){
  displayuser=friends
}
else if(selectedView==="fleeters"){
  displayuser=people
}

  return (
    <div className='w-full h-screen flex items-center justify-center bg-black'>



        <div className='w-[90%] h-[87vh] bg-gray-900 mt-10  flex'>

                             {/*left part*/}
          <div className='w-[28%] h-full flex flex-col items-center justify-center border-r  '>

            <div className='w-full h-[10%] flex   items-center justify-start gap-4 p-2'>
              <div className='w-[30%] flex items-center justify-center gap-2'>
                <div className='avatar avatar-online'>


                     <img src={profilepic || userdata?.image || "/avatar.png"} onClick={handleAvatarClick} alt="" className='w-[50px] h-[50px] object-fit cursor-pointer border-0 rounded-full'/>
               <input type="file" ref={fileInputRef} onChange={handlefilechange} style={{ display: "none" }} accept="image/*"
 />
               
               
                </div>
                 
              <h4 className='text-xl pt-4 font-bold'>{userdata?.name}</h4>

              </div>
              <div className='w-[60%] flex items-end justify-end p-3'>
                <LogOut className='w-10 h-10 object-cover cursor-pointer' onClick={logout}/>
              </div>


             
              
            </div>

            <div className='w-full h-[7%] flex items-center justify-center  p-4'>
              <ul className='w-full flex items-center justify-between gap-1.5 '>
                <li className={` w-[33%] h-[30px] flex items-center justify-center text-center border cursor-pointer ${selectedView==="chats"? "bg-white text-black scale-[0.97] transition-[ all 0.8s ease-in-out]" :""}`} onClick={()=>setselectedview("chats")} >Chats</li>
                <li className={` w-[33%] h-[30px] flex items-center justify-center text-center border cursor-pointer ${selectedView==="friends"? "bg-white text-black scale-[0.97] transition-[ all 0.8s ease-in-out]" :""}`} onClick={()=>setselectedview("friends")}>friends</li>
                <li className={` w-[33%] h-[30px] flex items-center justify-center text-center border cursor-pointer ${selectedView==="fleeters"? "bg-white text-black scale-[0.97] transition-[ all 0.8s ease-in-out]" :""}`} onClick={()=>setselectedview("fleeters")}>Fleeters</li>
              </ul>
            </div>


            <div className='w-full h-[83%] scroll-auto p-1 flex flex-col items-center justify-start gap-2'>
              {(displayuser ?? [])?.map((user,ind)=>{
                     
                     return(
                      <div className='w-full h-20 flex items-center justify-start border p-5 gap-3 cursor-pointer' key={ind} onClick={(e)=>setselecteduser(user)}>
                        <div className='avatar avatar-online'>
                          <img src={user?.image || "/avatar.png"} alt="" className='w-12 h-12 object-cover'/>

                        </div>
                        
                        <h3 className='text-xl'>{user?.name}</h3>


                      </div>
                     )
              })}

            </div>

          </div>


                            {/*right part*/}
          
<div className='w-[72%] h-full flex flex-col items-center justify-center   rounded-2xl '>
  <div className='w-full h-[93%] bg-gray-800 rounded-lg overflow-hidden'>
    <ChatContainer selectedUser={selectedUser} />
  </div>
  <div className='w-full h-[7%]'>
    <ChatSender selectedUser={selectedUser}/>
  </div>
</div>






          

        </div>


      
    </div>
  )
}

export default Chatpage
