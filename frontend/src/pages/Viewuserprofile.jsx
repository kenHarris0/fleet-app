import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {fleetContext} from '../context/Context'

const Viewuserprofile = () => {
    const {id}=useParams()
    const [userprofiledata,setprofildata]=useState(null)
const {url}=useContext(fleetContext)

    const getuserdata=async(id)=>{
         try{
        const res=await axios.get(url+`/user/getuserbyid/${id}`,{withCredentials:true})
        if(res.data){
            setprofildata(res.data)


        }
     
    }
    catch(err){
        console.log(err)
    }
    }

    useEffect(()=>{
        if(id){
            getuserdata(id)
        }
    },[id])

    if (!userprofiledata) {
  return <div>Loading...</div>;
}


    
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-10">
      <div className="w-[60%] bg-gray-100 text-black shadow-md rounded-lg p-8 mt-10">

        {/* PROFILE HEADER */}
        <div className="flex items-center gap-6">
          <img
            src={userprofiledata?.image || "/avatar.png"}
            alt="profile"
            className="w-32 h-32 rounded-full border"
          />
          <div>
            <h1 className="text-3xl font-bold">{userprofiledata?.name}</h1>
            <p className="text-gray-500">{userprofiledata?.email}</p>
           
          </div>
        </div>

        {/* ABOUT ME */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">About Me</h2>
          <p className="text-gray-700 mt-2">{userprofiledata.aboutme}</p>

        {/* HOBBIES */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Hobbies</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            <div>{userprofiledata.hobbies?.length > 0 ? (
              userprofiledata.hobbies.map((hobby, i) => (
                <span key={i} className="px-3 py-1 bg-gray-200 rounded-full">
                  {hobby}
                </span>
              ))
            ) : (
              <p className="text-gray-500">No hobbies added.</p>
            )}
            </div>
          </div>
        </div>

        {/* PERSONALITY */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Personality Type</h2>
          <p className="text-lg font-bold mt-2">
            {userprofiledata?.personality}
          </p>
        </div>

        {/* TAG */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Tag</h2>
         <p className="mt-2">{userprofiledata.tag}</p>
            

        
        </div>

        {/* VIBE */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Vibe</h2>
          <p className="mt-2">{userprofiledata.vibe}</p>
           

          
        </div>

        {/* FRIEND COUNT */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Friends</h2>
          <p className="mt-2">{userprofiledata.friends?.length || 0} friends</p>
        </div>

        {/* PENDING REQUEST COUNT */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Pending Requests</h2>
          <p className="mt-2">{userprofiledata.requestpending?.length || 0} pending</p>
        </div>

       

      </div>
    </div>
    </div>
  )
}

export default Viewuserprofile
