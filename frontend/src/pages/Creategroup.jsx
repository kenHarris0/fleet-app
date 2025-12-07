import React, { useContext, useEffect, useState } from "react";
import { fleetContext } from "../context/Context";
import axios from "axios";
import { toast } from "react-toastify";
const Creategroup = () => {
  const { people, userdata,getallPeople,url,socket } = useContext(fleetContext);

  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const handleSelect = (userId) => {
    setSelectedMembers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId) 
        : [...prev, userId] 
    );
  };

   const createGroup=async(name,members)=>{
    try{
     const res=await axios.post(url + "/grp/create", {
  name: groupName,
  members: [...selectedMembers, userdata._id]
}, { withCredentials: true })

      if(res.data){
        toast.success("group created")
        setSelectedMembers([])
        setGroupName("");

        socket.emit("JoinGroup",res.data._id)

      }

    }
     catch(err){
        console.log(err)
        
      }
  }

  useEffect(()=>{
    getallPeople()
  },[])

  return (
    <div className="w-[50%] m-auto h-[70%] mt-[10%] bg-gray-900 flex flex-col p-6 text-white">

      {/* Group Name */}
      <input
        type="text"
        className="w-full p-2 mb-4 rounded bg-gray-800"
        placeholder="Enter group name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />

      {/* People List */}
      <div className="flex-1 overflow-y-auto bg-gray-800 rounded p-3">
        <p className="text-sm text-gray-400 mb-3">Select Members</p>

        {people
          .filter((user) => user._id !== userdata?._id) 
          .map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between p-2 bg-gray-700 rounded mb-2 cursor-pointer hover:bg-gray-600"
              onClick={() => handleSelect(user._id)}
            >
              <div className="flex items-center gap-3">
                <img
                  src={user.image || "/avatar.png"}
                  className="w-10 h-10 rounded-full"
                  alt="profile"
                />
                <span className="text-sm font-medium">{user.name}</span>
              </div>

              <input
                type="checkbox"
                checked={selectedMembers.includes(user._id)}
                onChange={() => handleSelect(user._id)}
                className="cursor-pointer"
              />
            </div>
          ))}
      </div>

      {/* Create Button */}
      <button
        className="mt-4 w-full py-2 bg-blue-500 rounded hover:bg-blue-600"
        onClick={() => createGroup(groupName,selectedMembers)}
      >
        Create Group
      </button>
    </div>
  );
};

export default Creategroup;
