import React, { useContext, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {fleetContext} from '../context/Context'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 1, title: "Fitness", image: "/images/fitness.jpg" },
  { id: 2, title: "Gaming", image: "/images/gaming.jpg" },
  { id: 3, title: "Coding", image: "/images/coding.jpg" },
  { id: 4, title: "Music", image: "/images/music.jpg" },
  { id: 5, title: "Anime", image: "/images/anime.jpg" },
  { id: 6, title: "Movies", image: "/images/movies.jpg" },
  { id: 7, title: "Sports", image: "/images/sport.jpg" },
  { id: 8, title: "Photography", image: "/images/photo.jpg" },
  { id: 9, title: "Tech Gadgets", image: "/images/gadgets.jpg" },
  { id: 10, title: "Travel", image: "/images/travel.jpg" },
];

const CategorySelector = ({ onSelect }) => {
  const [active, setActive] = useState("");
  const {url,getUserGroup,getuserdata,userdata}=useContext(fleetContext)
  const navv=useNavigate()

  const addUsertoSpecialGrp=async(groupName)=>{
    try{
        const res=await axios.post(url+'/grp/assign',{groupName},{withCredentials:true})
        if(res.data){
            navv('/chat')
            
        }

    }
    catch(err){
        console.log(err)
    }

  }

  return (
    <div className='w-full min-h-screen flex flex-col items-center mt-50 '>
        <div className='w-full h-auto flex flex-col items-center overflow-y-auto'>

        <div className='w-[80%] flex items-center justify-between '>
             <h1 className='text-4xl font-bold mb-10 text-white'>
        Select your Community
      </h1>

      {active && (
        <div className=' mb-10 flex items-center justify-center bg-green-400 w-[250px] h-[50px] gap-3 p-3'>
        <button className='text-xl' onClick={()=>addUsertoSpecialGrp(active)}>Join {active} Group </button>
        <ArrowRight className='w-7 h-7 text-white'/>

        </div>
      )}

        </div>
     

      <div className='grid  lg:grid-cols-3 gap-8'>
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => {
              setActive(cat.title);
              
            }}
            className={`
              relative w-100 h-[300px] rounded-xl overflow-hidden cursor-pointer 
              transition-all duration-300
              border-2 
              ${active === cat.title ? "border-pink-500 shadow-pink-500/50 shadow-xl scale-105" : "border-gray-700"}
            `}
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-full object-cover"
            />
            <div className='absolute bottom-0 w-full bg-black/60 py-2 text-center'>
              <p className='text-white font-semibold text-lg'>{cat.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default CategorySelector;
