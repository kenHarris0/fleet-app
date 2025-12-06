import React, { useContext, useEffect, useRef } from 'react'
import { fleetContext } from '../context/Context'


const ChatContainer = ({selectedUser}) => {
    const {url,messages,getMessagebyid,userdata}=useContext(fleetContext)
const lastref=useRef()




    useEffect(()=>{
        if(!selectedUser) return;
        const fetchdata=async()=>{
        getMessagebyid(selectedUser._id)
        }
        fetchdata()

    },[selectedUser])

useEffect(()=>{
lastref.current?.scrollIntoView({behaviour:"smooth"})
},[messages])
  

  return (
    <div className='w-full h-[90%] flex flex-col p-7 gap-2 overflow-y-auto bg-black-300 ml-1 text-white'>
        {messages?.map((message,ind)=>{
           const isSender = message?.senderId === userdata?._id;


            return(
            <div className='w-full' key={ind}>
                {isSender ? (
                    <div >
                        <div className="chat chat-end">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src={userdata?.image}
      />
    </div>
  </div>
  <div className="chat-bubble bg-blue-400 p-2 max-w-max">

    {message?.text && <p>{message.text}</p>}
    {message.image && <img src={message.image} alt='xx' className='rounded-lg max-w-[250px] max-h-[200px] object-cover'/>}
    <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {new Date(message.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                      
                    })}
                  </p>
    </div>
  
</div>


                        
                        
                    </div>
                ):(
                    <div >
                        <div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src={selectedUser?.image}
      />
    </div>
  </div>
  <div className="chat-bubble">
    {message?.text && <p>{message.text}</p>}
    {message.image && <img src={message.image} alt='xx' className='w-[200px] h-[90px] object-cover'/>}
     <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {new Date(message.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                      
                    })}
                  </p>
    
    </div>
  
</div>


                        
                        
                    </div>
                )}
            </div>
            )

             
        })}

      <div ref={lastref}></div>
    </div>
  )
}

export default ChatContainer
