  import React, { useContext, useEffect, useState,useRef } from 'react'
  import {fleetContext} from '../context/Context.jsx'
  import { LogOut } from 'lucide-react';
  import axios from 'axios';
  import {toast} from 'react-toastify'
  import ChatContainer from './ChatContainer.jsx'
  import ChatSender from '../components/ChatSender'
  import ChatHeader from './ChatHeader.jsx'
  import { UserPlus,Timer,Users   } from 'lucide-react';
import { useNavigate } from 'react-router-dom';





  const Chatpage = () => {
  const {url,userdata,getuserdata,logout,chats,setchats,getallChats,
    friends,setfriends,getallFriends,onlineUsers,socket,
    people,setpeople,getallPeople,chatBackground, setchatBackground,handleChatbg,
  groups,setgroups,getUsergroup}=useContext(fleetContext)


  const [selectedView,setselectedview]=useState("chats")
  const [profilepic,setprofilepic]=useState(null)
  const [selectedUser,setselecteduser]=useState(null)
    const fileInputRef = useRef(null);
  const [chatdata,setchatdata]=useState([])
  const [acceptedid,setacceptedid]=useState(null)

  //to handle the icon
  const [iconclicked,seticonclicked]=useState(false)

  const [isGroup,setIsgroup]=useState(false)

const navigator=useNavigate()
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
    await  getUsergroup()

    }
    fetchall()


  },[userdata,selectedUser,])

  //to fetch bg 

  useEffect(() => {
    if (!selectedUser || !userdata) return;

    const fetchbgimg = async () => {
      try {
        const res = await axios.get(url + "/chat/getallchat", { withCredentials: true });
        if (!res.data) return;

        const currChat = res.data.find(chat =>
          chat.members.includes(userdata._id) &&
          chat.members.includes(selectedUser._id)
        );

        setchatBackground(currChat?.chatBackground || null);
      } catch (err) {
        console.log(err);
      }
    };

    fetchbgimg();
  }, [selectedUser,userdata]);



  useEffect(()=>{
    const fetchdata=async()=>{
      await getuserdata()
    }
    fetchdata()

  },[])

  let displayuser=[];
  if(selectedView==="chats"){
    displayuser=[...chats, ...groups]
  }
  else if(selectedView==="friends"){
    displayuser=friends
  }
  else if(selectedView==="fleeters"){
    displayuser=people
  }


  //send friend request 
  const sendRequest=async(id)=>{
    try{
      socket.emit("sendFriendRequest",{
        senderId:userdata?._id,
        receiverId:selectedUser?._id
      })
  toast.info("Friend request sent!");
    getuserdata();


      
    

    }
    catch(err){
      console.log(err)
    }
  }

 


    return (
      <div
    className="w-full h-screen flex items-center justify-center bg-black"
    
  >





          <div className='w-[90%] h-[87vh] bg-gray-900 mt-10  flex'>

                              {/*left part*/}
            <div className='w-[28%] h-full flex flex-col items-center justify-center border-r overflow-y-auto '>

              <div className='w-full h-[10%] flex   items-center justify-start gap-4 p-2'>
                <div className='w-[30%] flex items-center justify-center gap-2'>
                  <div className='avatar avatar-online'>


                      <img src={profilepic || userdata?.image || "/avatar.png"} onClick={handleAvatarClick} alt="" className='w-[50px] h-[50px] object-fit cursor-pointer border-0 rounded-full'/>
                <input type="file" ref={fileInputRef} onChange={handlefilechange} style={{ display: "none" }} accept="image/*"
  />
                
                
                  </div>
                  
                <h4 className='text-xl pt-4 font-bold'>{userdata?.name}</h4>

                </div>
                <div className='w-[60%] gap-7 flex items-end justify-end p-3'>
                  <Users className='w-7 h-7 object-cover cursor-pointer' onClick={()=>navigator('/group')}/>

                  <LogOut className='w-7 h-7 object-cover cursor-pointer' onClick={logout}/>
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
                  let isOnline=false
                  if(onlineUsers.includes(user._id)){
                    isOnline=true
                  }
                  let isUsersFriend=false;
                  if(userdata.friends.includes(user._id)){
                    isUsersFriend=true
                  }
                  const isPending = userdata?.requestpending?.includes(user._id);
                  const isGrp = user?.members ;

                      
                      return(
                        <div className='w-full h-20 flex items-center justify-start border p-5 gap-3 cursor-pointer' key={ind} onClick={(e)=>{setselecteduser(user);
                         if (isGrp) {
    setIsgroup(true);
  } else {
    setIsgroup(false);
  }

  
  
                        }}>
                          <div className='w-[80%] h-full flex items-center justify-start gap-3'>
  {isGrp ? (
    <>
      <img src={user?.image || "/avatar.png"} alt="group" className="w-12 h-12 object-cover rounded-full" />
      <h3 className="text-xl">{user?.name} (Group)</h3>
    </>
  ) : (
    <>
      <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
        <img src={user?.image || "/avatar.png"} alt="profile" className="w-12 h-12 object-cover rounded-full" />
      </div>
      <h3 className="text-xl">{user?.name}</h3>
    </>
  )}
</div>

  {!isGrp ? (
    <div className='w-[20%] h-full flex items-center justify-end'>
    
  {!isUsersFriend && !isPending && 
    <UserPlus
      className='w-7 h-7 cursor-pointer text-blue-400'
      onClick={() => sendRequest(user._id)}
    />
  }

  {isPending  &&  (
    <Timer className='w-7 h-7 text-yellow-400'/>
  )}
                

  </div>):(
    <div>
      </div>
  )}

  <div>

  </div>

                        </div>
                      )
                })}

              </div>

            </div>


                              {/*right part*/}
            
  <div className='w-[72%] h-full flex flex-col items-center justify-center rounded-2xl'>
    {selectedUser ? (
      <>
        <div className='w-full h-[7%] rounded-6sxl relative z-50'>
          <ChatHeader selectedUser={selectedUser} isGroup={isGroup} setselecteduser={setselecteduser} setIsgroup={setIsgroup}/>
        </div>

        <div className='w-full h-[86%] bg-gray-800  '
        style={{
      backgroundImage: chatBackground ? `url(${chatBackground})` : "none",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
          <ChatContainer selectedUser={selectedUser} isGroup={isGroup} />
        </div>

        <div className='w-full h-[7%]'>
          <ChatSender selectedUser={selectedUser} isGroup={isGroup}/>
        </div>
      </>
    ) : (
      <div className='w-full h-full flex items-center justify-center text-white'>
        Select a conversation to start chatting
      </div>
    )}
  </div>







            

          </div>


        
      </div>
    )
  }

  export default Chatpage
