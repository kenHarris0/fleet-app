import React, { useContext, useRef, useState } from 'react';
import { fleetContext } from '../context/Context';
import { SquarePen } from 'lucide-react';

const ChatHeader = ({ selectedUser }) => {
  const { chatBackground, setchatBackground,handleChatbg,onlineUsers } = useContext(fleetContext);
  const fileInputRef = useRef(null);

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
let isOnline=false;
  if(onlineUsers.includes(selectedUser._id)){
    isOnline=true
  }
  return (
    <div className="w-full h-full  bg-transparent backdrop-blur-md border-b border-white/20 flex items-center px-4 ">
      <div className="w-full h-full flex items-center justify-between p-5">

        {/* Left: selected user */}
        <div className="flex items-center gap-2">
          <div className={`avatar ${isOnline?"avatar-online":""}`}>
            <img
            src={selectedUser?.image || "/avatar.png"}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />

          </div>
          
          <h2>{selectedUser?.name}</h2>
        </div>

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
