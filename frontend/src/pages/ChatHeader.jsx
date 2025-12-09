import React, { memo, useContext, useEffect, useRef, useState } from 'react';
import { fleetContext } from '../context/Context';
import { SquarePen,FilePenLine } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ChatHeader = ({ selectedUser,isGroup,setselecteduser,setIsgroup }) => {
  const {url,userdata,getUsergroup, chatBackground, setchatBackground,handleChatbg,onlineUsers,people,getallPeople,getuserdata,grpmessage,setgrpmessage,getGroupMessage} = useContext(fleetContext);
  const fileInputRef = useRef(null);
  const [showdropdown,setshowdropdown]=useState(false)
const [optionselected,setoptionselected]=useState("members")
const imageref=useRef(null)

const openImagePicker=()=>{
  imageref.current.click()
}

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const handlefilechange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = "";
    const reader = new FileReader();
     reader.readAsDataURL(file);

    reader.onloadend = async() => {
      
      try {
    const res = await handleChatbg(selectedUser._id, reader.result);

    if (res?.chatBackground) {
      setchatBackground(res.chatBackground);
    }
  } catch (err) {
    console.log(err);
  }
      
    };

   
  };
  const handleimagechange=async(e)=>{
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = "";
    const reader = new FileReader();
     reader.readAsDataURL(file);

    reader.onloadend = async() => {

      try{
        const res=await axios.post(url+'/grp/updatepic',{groupId:selectedUser._id,image:reader.result},{withCredentials:true})
        if(res.data){
          toast.success("Group profile updated")
          setselecteduser(prev=>{
            return({
              ...prev,image:reader.result
            })
          })
        }

      }
      catch (err) {
    console.log(err);
  }


    }

  }
let isOnline=false;
  if(onlineUsers.includes(selectedUser._id)){
    isOnline=true
  }


 let groupMembers = [];

if (isGroup && selectedUser?.members?.length) {
  groupMembers = selectedUser.members
    .map(memberId => people.find(p => p._id === memberId))
    .filter(Boolean); 
    if (!groupMembers.some(m => m._id === userdata._id)) {
  groupMembers.push(userdata);
}
}
let isUseranAdmin;
if(selectedUser && selectedUser?.admins){
  isUseranAdmin = selectedUser?.admins?.some(a => {
  const id = typeof a === "string" ? a : a._id;
  return id === userdata._id;
});

}
//makeadmin feature

const makeadmin=async(groupId,receiverId)=>{
  try{
    const res=await axios.post(url+`/grp/makeadmin/${receiverId}`,{groupId},{withCredentials:true})
    if(res.data){
      await getUsergroup()
      
      await getuserdata()

      setselecteduser(prev=>{
        return ({...prev,admins:[...prev.admins,receiverId]})
      })
    }

  }
  catch(err){
    console.log(err)
  }
}
//get media content in group 
let mediafiles=[]
if(grpmessage){
   mediafiles = grpmessage
  ?.filter(msg => msg.image)
  .map(msg => msg.image);

}
// leave group 

const Leavegrp=async(groupId)=>{
  try{
    const result=await axios.post(url+`/user/leavegrp/${groupId}`,{},{withCredentials:true})
    if(result.data){
       toast.success("Left group successfully");

      await getUsergroup();

      
      setselecteduser(null);
      setIsgroup(false);
    }

  }
  catch(err){
    console.log(err)
  }
}
//remove user by admin 
const removeUser=async(removeId,groupId)=>{
  try{
    const res=await axios.post(url+`/grp/removeUser/${removeId}`,{groupId},{withCredentials:true})
    if(res.data){
      setselecteduser(res.data)
    }

  }
   catch(err){
    console.log(err)
  }
}


// related to add new memebrs to a group
const [showaddmembers,setaddmembers]=useState(false)
let filteredUsers = [];

if (people && isGroup && selectedUser?.members) {
  filteredUsers = people.filter(
    (person) => !selectedUser.members.includes(person._id)
  );
}

const addNewusertogrp=async(groupId,receiverId)=>{
   try{
    const res=await axios.post(url+`/grp/addtogrp/${receiverId}`,{groupId},{withCredentials:true})
    if(res.data){
      setselecteduser(prev=>{
        return({
          ...prev,
          members:res.data.members
        })
      })
      
      toast.success("Added user to",selectedUser.name)
    }

  }
   catch(err){
    console.log(err)
  }

}


useEffect(()=>{
  getallPeople()
},[showaddmembers])
// set description 
const [description,setdescription]=useState("")
const [showdescinput,setshowdescip]=useState(false)

const handleadddescription=async(groupId)=>{
  try{
    const res=await axios.post(url+`/grp/updatedesc/${groupId}`,{description},{withCredentials:true})
    if(res.data){
      setselecteduser(prev=>{
        return({
          ...prev,
          description:res.data.description
        })
      })
      toast.success("Added description")
    }

  }
   catch(err){
    console.log(err)
  }

}

  useEffect(()=>{
    if(showdropdown) getallPeople()
      getuserdata()
    if(isGroup){
      getGroupMessage(selectedUser?._id)
    }

    
  },[showdropdown,isGroup])
  

  return (
    <div className="w-full h-full  bg-transparent backdrop-blur-md border-b border-white/20 flex items-center px-4 ">
      <div className="w-full h-full flex items-center justify-between p-5">

        {/* Left: selected user */}
       {!isGroup && (<div className="flex items-center gap-2">
          <div className={`avatar ${isOnline?"avatar-online":""}`}>
            <img
            src={selectedUser?.image || "/avatar.png"}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />

          </div>
         
          
          <h2>{selectedUser?.name}</h2>

          
        </div>)}

        {isGroup && (
         <div className="flex items-center gap-4 " >
          <div className=''>
            <img
            src={selectedUser?.image || "/avatar.png"}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />

          </div>
         
          <div className='relative'>
            <h2 className='cursor-pointer' onClick={()=>setshowdropdown(prev=>!prev)}>{selectedUser?.name}</h2>
            {showdropdown && (

              <div className='absolute w-[450px] h-[500px] flex items-center justify-center bg-black opacity-[0.9] top-10 -left-16'>
                {/* group section*/}
                <div className='flex flex-col items-center justify-start w-[25%] h-full border-r-2'>
                  <ul className='flex flex-col items-start justify-start pt-10 gap-5 h-full mr-2'>
                    <li className='text-md text-white text-center cursor-pointer w-full h-6.5 rounded-2xl' onClick={()=>setoptionselected("members")}>Members</li>
                    <li className='text-md text-white text-center cursor-pointer  w-full h-6.5' onClick={()=>setoptionselected("media")}>Media</li>
                    <li className='text-md text-white text-center cursor-pointer  w-full h-6.5' onClick={()=>setoptionselected("about")}>About/Edit</li>
                  </ul>
                  


                </div>
                

                <div className='w-[75%] h-full flex flex-col items-start p-6 justify-start '>
                  {optionselected==="members" && (
                    <div className='w-full h-full'>
                      <h1 className='text-2xl mb-10 opacity-100'>{selectedUser?.name} Member's</h1>

{groupMembers?.map(member => {
  const isAdmin = selectedUser?.admins?.includes(member._id);

  return (
    <div
      key={member._id}
      className='
        w-full
        flex items-center justify-between
        gap-3
        px-3 py-2
        mb-2
        rounded-md
        bg-gray-700/60
        hover:bg-gray-600
        transition
        cursor-pointer
        text-white
      '
    >

      {/* Left - Member Avatar + Name */}
      <div
        className='flex items-center gap-3'
        onClick={() => {
          // Switch to personal chat only when clicking avatar or name
          setselecteduser(member);
          setIsgroup(false);
        }}
      >
        <img
          src={member?.image || "/avatar.png"}
          alt=""
          className='w-9 h-9 rounded-full object-cover'
        />
        <p className='text-sm font-medium'>
          {member.name}
        </p>
      </div>

      {/* Right - Admin/Promote */}
      {isAdmin ? (
        <span className='
          text-[10px]
          px-2 py-1
          bg-blue-600
          rounded-md
          font-semibold
        '>
          Admin
        </span>
      ) : (
        isUseranAdmin && (
          <div className='flex items-center justify-between gap-2'>
          <button className='
          text-[10px]
              px-2 py-1
              bg-red-500
              rounded-md
              font-semibold
              hover:bg-red-600'
              onClick={(e)=>{
                e.stopPropagation();
                removeUser(member._id,selectedUser._id)
               } }>
            Remove

          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              makeadmin(selectedUser._id, member._id);
            }}
            className='
              text-[10px]
              px-2 py-1
              bg-green-500
              rounded-md
              font-semibold
              hover:bg-green-600
            '
          >
            Promote
          </button>
          </div>
        )
      )}

    </div>
  );
})}



                    </div>
                  )}
                  {optionselected==="media" && (
  <div className="w-full h-full overflow-y-auto grid grid-cols-3 gap-2">
    {mediafiles.length > 0 ? (
      mediafiles.map((img, i) => (
        <img
          key={i}
          src={img}
          alt="media"
          className="w-full h-24 object-cover rounded-md cursor-pointer hover:scale-105 transition"
          onClick={() => window.open(img, "_blank")}
        />
      ))
    ) : (
      <p className="text-white text-center w-full h-full flex items-center justify-center ">No media found</p>
    )}
  </div>
)}

{optionselected === "about" && (
  <div className="flex flex-col gap-3 text-white w-full h-full">
<div className='w-full h-[20%]'>
  <img
      src={selectedUser?.image || "/avatar.png"}
      alt="x"
      className="w-20 h-20 rounded-full object-cover cursor-pointer"
      onClick={() => {
        if (isUseranAdmin) openImagePicker();
      }}
    />

    <h1 className="text-lg">{selectedUser?.name}</h1>

    <input
      type="file"
      ref={imageref}
      onChange={handleimagechange}
      accept="image/*"
      className="hidden"
    />

</div>

<div className='w-full h-[80%] flex flex-col items-start justify-between relative gap-4 p-4'>

  <div className="flex flex-col items-start justify-start relative w-full">
  <div className="flex items-center justify-between w-full">
    <h1 className="text-lg">Description:</h1>

   
    {isUseranAdmin && (
      <FilePenLine
        className="w-5 h-5 text-white cursor-pointer"
        onClick={() => setshowdescip(prev => !prev)}
      />
    )}
  </div>

  {/* Show description text if present */}
  {selectedUser.description && !showdescinput && (
    <p className="mt-2 text-sm opacity-90">{selectedUser.description}</p>
  )}

  {/* Description Form */}
  {showdescinput && (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleadddescription(selectedUser._id);
        setshowdescip(false);
      }}
      className="mt-3 w-full border p-3 rounded-md bg-black/50 flex flex-col gap-3"
    >
      <textarea
        placeholder="Group description..."
        className="w-full p-2 rounded-md bg-gray-800 text-white outline-none"
        rows={4}
        value={description}
        onChange={(e) => setdescription(e.target.value)}
      />
      <button
        type="submit"
        className="self-end bg-green-500 px-3 py-1 rounded-md text-sm hover:bg-green-600"
      >
        Save
      </button>
    </form>
  )}
</div>


  <div className='flex gap-2 justify-between items-center'>
  <button onClick={()=>setaddmembers(prev=>!prev)} className='cursor-pointer w-[100px] h-[25px] text-sm bg-green-500'>Add Members</button>
  {showaddmembers && (
    <div className='absolute left-0 top-10 bg-gray-400 w-full   h-[200px] z-1000 overflow-y-auto flex flex-col p-4 gap-3 '>
      {filteredUsers?.map(user=>
      (
        <div className='w-[50%] h-5 flex '>
          <div className='flex w-[30%] items-center justify-between gap-2 '>
            <img src={user?.image || "/avatar.png"} alt='x' className='w-5 h-5 rounded-full object-cover'/>
          <h1>{user?.name}</h1>

          </div>

          <div className='w-[70%]  flex items-center justify-end'>
            <button className='w-7 h-7 bg-green-500 cursor-pointer' onClick={()=>addNewusertogrp(selectedUser._id,user._id)}>+</button>
          </div>
          

        </div>)

      
)}


      </div>
  )}

  <button className='bg-red-600 text-white text-base w-[100px] h-[25px] cursor-pointer' onClick={()=>Leavegrp(selectedUser._id)}>
    Leave Group
  </button>
   </div>

</div>
    



  </div>
)}



                </div>

            </div>
          )}




          </div>
          
        </div>
        )}

        {/* Right: change chat bg */}
        <div className="flex items-center justify-end">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handlefilechange}
            accept="image/*"
            className="hidden"
          />

          <SquarePen
            className="w-6 h-6 text-white cursor-pointer"
            onClick={openFilePicker}
          />
        </div>

      </div>
    </div>
  );
};

export default ChatHeader;
