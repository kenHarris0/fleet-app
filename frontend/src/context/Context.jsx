import React, { createContext, useEffect, useState } from 'react'
export const fleetContext=createContext()
import axios from 'axios'
import { toast } from 'react-toastify'
import {io} from 'socket.io-client'

const Context = ({children}) => {
const url="http://localhost:5000"
  const [userdata,setuserdata]=useState(null)
const [loggedin,setloggedin]=useState(false)

const [chats,setchats]=useState([])
const [people,setpeople]=useState([])
const [friends,setfriends]=useState([])
const [socket,setsocket]=useState(null)
const [onlineUsers,setOnlineusers]=useState([])
const [messages,setmessages]=useState([])




  const authuser=async()=>{
    try{
      const res=await axios.post(url+'/user/check',{},{withCredentials:true})
      if(res.data.success){
        await getuserdata()
        setloggedin(true)

      }

    }
    catch(err){
      console.log(err)
    }

  }

  const getuserdata=async()=>{
      try{
      const res=await axios.get(url+'/user/getuserdata',{withCredentials:true})
      if(res.data.success){
        setuserdata(res.data.payload)
        

      }

    }
    catch(err){
      console.log(err)
    }

  }

//logout feature

const logout=async()=>{
  try{
       const res=await axios.post(url+'/user/logout',{},{withCredentials:true})
       if(res.data.success){
        toast.success("logged out successfully")
        setuserdata(null)
        setloggedin(false)
        await getuserdata()
        setchats([])
setfriends([])
setpeople([])

       }
  }
   catch(err){
      console.log(err)
    }
}

//sidebars 

const getallChats=async()=>{
  try{
     const res=await axios.get(url+'/msg/chats',{withCredentials:true})
     if(res.data){
      setchats(res.data)
     }

  }
    catch(err){
      console.log(err)
    }

}

const getallPeople=async()=>{
  try{
     const res=await axios.get(url+'/msg/people',{withCredentials:true})
     if(res.data){
      setpeople(res.data)
     }

  }
    catch(err){
      console.log(err)
    }

}

const getallFriends=async()=>{
   try{
     const res=await axios.get(url+'/msg/friends',{withCredentials:true})
     if(res.data){
      setfriends(res.data)
     }

  }
    catch(err){
      console.log(err)
    }

}

//sockets for individaul chats

const connectSocket=async()=>{
  if(!userdata) return;
  try{
    if(socket){
      socket.disconnect();
      setsocket(null)
    }
    const skt= io("http://localhost:5000",{
      withCredentials:true
    })
    setsocket(skt)
   

    skt.on("getOnlineUsers",(Onlineusers)=>{
      setOnlineusers(Onlineusers)
    })

    skt.on("Getmessages",(message)=>{
     setmessages((prev) => [...prev, message]);
    })

  }
  catch(err){
      console.log(err)
    }

}


const disconnectSocket=async()=>{
  if(!userdata || !socket) return;

  try{
    socket.disconnect()
    setsocket(null)

  }
   catch(err){
      console.log(err)
    }
}

//get message per user
const getMessagebyid=async(id)=>{
  try{
    const res=await axios.get(url+`/msg/getmsg/${id}`,{withCredentials:true})
    if(res.data){
      setmessages(res.data)
      console.log(res.data)

    }

  }
  catch(err){
      console.log(err)
    }
}


const value={url,
  userdata,setuserdata,loggedin,setloggedin,
  authuser,getuserdata,logout,
  chats,setchats,getallChats,
  friends,setfriends,getallFriends,
  people,setpeople,getallPeople,
  //msg related fetching and all
  getMessagebyid,socket,onlineUsers,messages,setmessages

}
useEffect(()=>{
  if(!userdata) return;
  connectSocket()
},[userdata])
useEffect(()=>{
  authuser()
},[])

  return (
    <div>
        <fleetContext.Provider value={value}>
              {children}
        </fleetContext.Provider>
      
    </div>
  )
}

export default Context
