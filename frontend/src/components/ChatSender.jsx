import React, { useContext, useState, useRef } from 'react'
import { Paperclip, Send } from 'lucide-react';
import { fleetContext } from '../context/Context';
import axios from 'axios';

const ChatSender = ({selectedUser,isGroup}) => {
  const { url,grpmessage,setgrpmessage,getGroupMessage } = useContext(fleetContext);

  const [text, settext] = useState("");
  const [file, setfile] = useState(null);
const [previewUrl, setPreviewUrl] = useState(null)
const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const openFilePicker = () => {
    fileInputRef.current.click(); 
  };

  const handleFile = (e) => {
  const selectedFile = e.target.files[0];
  if (!selectedFile) return;

 
  if (selectedFile.type.startsWith("image/")) {
    setPreviewUrl(URL.createObjectURL(selectedFile));
  } else {
    setPreviewUrl(null);
  }

  
  const reader = new FileReader();
  reader.readAsDataURL(selectedFile);
  reader.onloadend = () => {
    setfile(reader.result);
  };
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = selectedUser?._id;
setLoading(true)
    try {
      if(!isGroup){
      const res= await axios.post(
        url + `/msg/send/${id}`,
        { text, image: file },
        { withCredentials: true }
      );
      if(res.data){
        

        settext("");
setfile(null);
setPreviewUrl(null);
fileInputRef.current.value = "";


      }}
      else{
        const res= await axios.post(
        url + `/grpmsg/send/${id}`,
        { text, image: file },
        { withCredentials: true }
      );
      if(res.data){
       
        settext("");
setfile(null);
setPreviewUrl(null);
fileInputRef.current.value = "";


      }
        
      }
      
      
    } catch (err) {
      console.log(err);
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <div className='w-full h-full p-4 flex items-center gap-3 relative'>
        
  
  
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFile}
      />

      <div className='flex-1 bg-gray-500 rounded-full'>
        <input
          type="text"
          placeholder="Message..."
          className='w-full px-4 py-2 bg-transparent outline-none text-white'
          value={text}
          onChange={(e) => settext(e.target.value)}
        />
      </div>

     <div className="relative inline-block">
  <Paperclip
    className="w-7 h-7 text-white cursor-pointer"
    onClick={openFilePicker}
  />

  {previewUrl && (
    <p
      onClick={() => {
        setPreviewUrl(null);
        setfile(null);
      }}
      className="absolute -top-2 -right-2 bg-red-600 text-[10px] text-white 
                 w-3 h-3 flex items-center justify-center
                 rounded-full cursor-pointer"
    >
      X
    </p>
  )}
</div>

    {  loading ?(
      <span className='loading loading-spinner text-blue-400 w-7 h-7'></span>
    ):(
      <Send
        className='w-7 h-7 text-blue-400 cursor-pointer'
        onClick={handleSubmit}
      />
    )}
    </div>
  );
};

export default ChatSender;
