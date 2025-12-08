  import React, { useContext, useEffect, useState } from 'react'
  import { useNavigate } from 'react-router-dom'
  import {fleetContext} from '../context/Context.jsx'
  import { toast } from 'react-toastify'
  import { Bell } from 'lucide-react';
  import axios from 'axios';



  const Navbar = () => {
    const navv=useNavigate()
    const {userdata,socket,getuserdata,getallFriends,url}=useContext(fleetContext)

    const [acceptreq,setacceptreq]=useState(false)
    const [showdropdown,setshowdropdown]=useState(false)
    const [noticount,setnoticount]=useState(0)

  useEffect(() => {
    if (!socket) return;

    socket.on("friendRequestNotification", ({ senderId }) => {
      toast.info("New Friend Request Received!");
      getuserdata(); // refresh pending requests
    });

    socket.on("friendAccepted", ({ receiverId }) => {
      toast.success("Your friend request was accepted 🎉");
      getuserdata()
      getallFriends(); // refresh friend list
    });
  socket.on("friendRejected", ({ receiverId }) => {
      toast.error("Your friend request was Rejected");
      getuserdata()
      getallFriends(); 
    });

    return () => {
      socket.off("friendRequestNotification");
      socket.off("friendAccepted");
      socket.off("friendRejected")
    };
  }, [socket]);


  const acceptRequest=async(senderId)=>{
    try{
      const res=await axios.post(url+`/user/acceptfriend/${senderId}`,{},{withCredentials:true})
      if(res.data.success){
        toast.success("friend req accepted")
        setshowdropdown((prev)=>!prev)
        getuserdata()
    getallFriends()
      }

    }
    catch(err){
      console.log(err)
    }
  }

  const rejectRequest=async(senderId)=>{
    try{
      const res=await axios.post(url+`/user/rejectfriend/${senderId}`,{},{withCredentials:true})
      if(res.data.success){
        toast.error("friend req rejected")
        setshowdropdown((prev)=>!prev)
        getuserdata()
    getallFriends()
      }

    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    if(!userdata) return;
  const count= userdata?.requestpending.length
  setnoticount(count)
  },[userdata])



    return (
      <div className='w-[80%] h-20 flex justify-between items-center px-10
                  fixed top-0 left-1/2 -translate-x-1/2
                  z-5000 bg-transparent'>


        
        <h1 className='text-[32px] font-bold' onClick={()=>navv('/')}>Fleets</h1>

        <div className='flex gap-10 text-[14px]'>
          <p className='nav-item hover:text-gray-400 transition' onClick={()=>navv('/')}>Home</p>
          <p className='nav-item hover:text-gray-400 transition'>Features</p>
          <p className='nav-item hover:text-gray-400 transition'>Chats</p>
          <p className='nav-item hover:text-gray-400 transition'>Find Fleets</p>
        </div>

        <div className='flex items-center justify-between gap-10 '>
        <div className='relative'>
    <Bell
      className='w-6 h-6 cursor-pointer'
      onClick={() => setshowdropdown((prev) => !prev)}
    />
    <p className='text-black text-[10px] bg-white rounded full w-3 h-3  absolute -top-2 -right-2 flex items-center justify-center'>{noticount}</p>

    {showdropdown && (
      <div className='absolute right-0 top-8 w-[450px] bg-gray-800 text-white 
                      rounded-lg shadow-lg p-3 z-50'>
        <h3 className='font-bold mb-2'>Friend Requests</h3>

        {userdata?.requestpending?.length === 0 ? (
          <p className='text-gray-400 text-sm'>No new requests</p>
        ) : (
          userdata.requestpending.map((senderId) => (
            <div
              key={senderId}
              className='w-full flex items-center justify-between p-2 
                        bg-gray-700 rounded-md mb-2'
            >
              <p className='text-sm'>User: {senderId}</p>

              <button
                className='bg-green-500 px-2 py-1 rounded text-xs text-black cursor-pointer'
                onClick={() => acceptRequest(senderId)}
              >
                Accept
              </button>
              <button
                className='bg-red-500 px-2 py-1 rounded text-xs text-black cursor-pointer'
                onClick={() => rejectRequest(senderId)}
              >
                Reject
              </button>

            </div>
          ))
        )}
      </div>
    )}
  </div>
        
          {!userdata ? (<p className='btn-elm w-[140px] h-[35px] flex items-center justify-center' onClick={()=>navv('/userauth')}>
            Login / Register
          </p>):(
            <img src={userdata?.image || "/avatar.png"} alt="profile" className='w-10 h-10 object-cover rounded-full cursor-pointer' />
          )}
        </div>

      </div>
    )
  }

  export default Navbar
