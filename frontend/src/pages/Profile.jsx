import React, { useContext, useEffect, useState } from 'react';
import { fleetContext } from '../context/Context';
import {Pen} from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';



const Profile = () => {
  const { userdata,url,getuserdata,setuserdata } = useContext(fleetContext);


  if (!userdata) {
    return <div className="text-center mt-20">Loading profile...</div>;
  }
  const [editmodeon,seteditmode]=useState(false)

  const [formdata,setformdata]=useState({
    aboutme:"",
    hobbies:"",
    tag:"",
    vibe:""
  })

  console.log(formdata)
  const navv=useNavigate()

  const handlechange=async(e)=>{
    const {name,value}=e.target
    setformdata(prev=>({...prev,[name]:value}))
  }

  const handlesubmit=async(e)=>{
    e.preventDefault()
    try{
        const res=await axios.post(url+'/user/updateProfile',formdata,{withCredentials:true})
        if(res.data){
            setuserdata(prev => ({ 
    ...prev, 
    ...res.data 
}));

            setformdata({
                 aboutme:"",
    hobbies:"",
    tag:"",
    vibe:""

            })
            seteditmode(false)
            

            toast.success("profile updated")


        }
    }
    catch(err){
        console.log(err)
    }
  }
  

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-10">
      <div className="w-[60%] bg-gray-100 text-black shadow-md rounded-lg p-8 mt-10">

        {/* PROFILE HEADER */}
        <div className="flex items-center gap-6">
          <img
            src={userdata.image || "/default.png"}
            alt="profile"
            className="w-32 h-32 rounded-full border"
          />
          <div>
            <h1 className="text-3xl font-bold">{userdata.name}</h1>
            <p className="text-gray-500">{userdata.email}</p>
            <Pen className='w-5 h-5 mt-4 cursor-pointer' onClick={()=>seteditmode(prev=>!prev)}/>
          </div>
        </div>

        {/* ABOUT ME */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">About Me</h2>
          {!editmodeon ?<p className="text-gray-700 mt-2">{userdata.aboutme}</p>:(

            <input type='text' name='aboutme' value={formdata?.aboutme} onChange={handlechange} className='text-black'/>

          )}

        {/* HOBBIES */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Hobbies</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {!editmodeon ?
           (<div>{userdata.hobbies?.length > 0 ? (
              userdata.hobbies.map((hobby, i) => (
                <span key={i} className="px-3 py-1 bg-gray-200 rounded-full">
                  {hobby}
                </span>
              ))
            ) : (
              <p className="text-gray-500">No hobbies added.</p>
            )}
            </div>):
            (
                <div>
                   <input type='text' name='hobbies' value={formdata?.hobbies} onChange={handlechange} className='text-black'/>


                </div>
            )}
          </div>
        </div>

        {/* PERSONALITY */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Personality Type</h2>
          <p className="text-lg font-bold mt-2">
            {userdata?.personality? userdata.personality :(
                <button className='bg-green-400 w-fit h-fit p-2 text-xs cursor-pointer' onClick={()=>navv('/personality')}>Take personality test</button>
            )}
          </p>
        </div>

        {/* TAG */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Tag</h2>
          {!editmodeon ?<p className="mt-2">{userdata.tag}</p>:(
            <div>
                   <input type='text' name='tag' value={formdata?.tag} onChange={handlechange} className='text-black'/>


                </div>

          )}
        </div>

        {/* VIBE */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Vibe</h2>
           {!editmodeon ?<p className="mt-2">{userdata.vibe}</p>:(
            <div>
                   <input type='text' name='vibe' value={formdata?.vibe} onChange={handlechange} className='text-black'/>


                </div>

          )}
        </div>

        {/* FRIEND COUNT */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Friends</h2>
          <p className="mt-2">{userdata.friends?.length || 0} friends</p>
        </div>

        {/* PENDING REQUEST COUNT */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Pending Requests</h2>
          <p className="mt-2">{userdata.requestpending?.length || 0} pending</p>
        </div>

        {editmodeon &&
        <button onClick={handlesubmit} className='bg-green-400 w-fit h-fit text-base  p-3 mt-10 cursor-pointer'>Submit</button>}

      </div>
    </div>
    </div>
  );
};

export default Profile;
