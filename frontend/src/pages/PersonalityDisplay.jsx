import React, { useContext, useEffect } from 'react';
import { fleetContext } from '../context/Context';
import { useNavigate, useParams } from 'react-router-dom';
import { gsap } from 'gsap';
import SplitType from 'split-type';
import { mbdata } from '../mbtidata';
import axios from 'axios';

const PersonalityDisplay = () => {
    const { userdata,url } = useContext(fleetContext);
    const { personality } = useParams();
const navv=useNavigate()
    useEffect(() => {
        const text = new SplitType(".rotational", { types: "chars" });

        gsap.to(text.chars, {
            rotateY: 360,
            yoyo: true,
            repeat: -1,
            duration: 0.4,
            stagger: 0.15,
            repeatDelay: 2,
            ease: "back.inOut",
        });
    }, []);

    const currpers = mbdata.find(p => p.type === personality);
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
        <div className='w-full h-full flex items-center justify-center'>
            <div className='w-[80%] m-auto h-[40vh] text-center  flex flex-col items-center justify-center gap-5 mt-50'>

                <h1 className='text-4xl font-bold'>
                    Hello {userdata?.name}, your personality type is:
                </h1>

                <h2 className='text-5xl font-extrabold mt-5 rotational'>
                    {personality}
                </h2>

                <div className='flex flex-col items-center justify-center bg-gray-400 mt-10 p-6 rounded-xl shadow-md w-[60%] max-w-[500px]'>
                    <p className='text-2xl font-semibold'>{currpers?.name}</p>
                    <p className='text-gray-700 mt-2 text-base text-center'>
                        {currpers?.description}
                    </p>
                </div>

                <button className='w-[220px] h-[50px] bg-green-500 text-white text-lg rounded-md cursor-pointer hover:bg-green-600 transition' onClick={()=>addUsertoSpecialGrp(personality)}>
                    Join {personality} Group
                </button>
            </div>
        </div>
    );
};

export default PersonalityDisplay;
