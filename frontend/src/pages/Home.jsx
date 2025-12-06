import React from 'react'
import { useEffect } from 'react';
import { gsap } from "gsap";
import SplitType from "split-type";

import Chatpage from './Chatpage';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navv=useNavigate()
    
useEffect(() => {
  gsap.fromTo(
    ".floating-title",
    {
      y: 0,
      x: 0,
    },
    {
      y: -7,
      x: 2,
      duration: 2.5,
      ease: "power1.inOut", 
      yoyo: true,
      repeat: -1,
      repeatDelay: 0.3, // ✨ Smooth pause before reversing
      yoyoEase: true,   // ✨ Smooth transition both ways
      stagger: 0.08
    }
  );
}, []);

  

 
  useEffect(() => {
    const text = new SplitType(".color-train", { types: "chars" });

    gsap.fromTo(text.chars,
      { color: "#777" },      // default color
      {
        color: "#00C9A7",     // bright teal passing
        duration: 0.4,
        repeat: -1,
        yoyo: true,
        repeatDelay:2,
        stagger: 0.15,        // ← moves like a train!
        ease: "back.inOut",
      }
    );
  }, []);

  useEffect(() => {
    const text = new SplitType(".rotate-text", { types: "chars" });

    gsap.to(text.chars, {
      rotateY: 360,       // full spin animation
      duration: 1.2,
      stagger: 0.08,      // delay between letters
      repeat: -1,         // infinite
      repeatDelay: 2,   // small break before looping
      ease: "back.inOut"
        });
  }, []);


  return (
    <div className='w-[80%] m-auto h-screen pt-28'>
      
      <div>
        <h1 className=' floating-title text-[150px] font-bold leading-tight mt-5 '>
          Welcome User, to <span className='rotate-text transform-3d perspective-600'>Fleets</span>
        </h1>

        <h4 className='text-[36px] font-medium mt-8 color-train'>
          Find Friends Who Share Your Vibe
        </h4>

        <div className='flex gap-4 mt-[130px]'>
          <button className='px-6 py-3 border rounded-full hover:bg-white hover:text-black transition'>
            Find Your Fleet
          </button>
          <button className='px-6 py-3 border rounded-full hover:bg-white hover:text-black transition' onClick={()=>navv('/chat')}>
            Open Chat
          </button>
        </div>

      </div>
      

    </div>
  )
}

export default Home
