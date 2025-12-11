import React, { useState, useEffect } from 'react'
import { gsap } from "gsap";
import SplitType from "split-type";
import { useNavigate } from 'react-router-dom';

const FindGroup = () => {
  const [selectedOption, setselectedOption] = useState(null);
const navv=useNavigate()
  useEffect(() => {
    const text = new SplitType(".color-train", { types: "chars" });

    gsap.fromTo(
      text.chars,
      { color: "#a0a0a0" },
      {
        color: "#ec4899",
        duration: 0.4,
        repeat: -1,
        yoyo: true,
        repeatDelay: 2,
        stagger: 0.05,
        ease: "back.inOut",
      }
    );
  }, []);

  return (
    <div className='w-full h-full flex flex-col items-center'>
      <h1 className='text-4xl mt-24 font-bold color-train drop-shadow-lg'>
        Select a Category to find your fleet
      </h1>

      <div className='w-full md:w-[70%] h-[70vh] flex items-center justify-center gap-10 flex-wrap mt-10'>

        {/* Personality Button */}
        <div
          onClick={() => {setselectedOption("myers");
            navv('/personality')}
          }
          className='
          w-[300px] h-[220px] bg-linear-to-br from-gray-700 to-gray-900 rounded-2xl
          flex items-center justify-center cursor-pointer
          border border-gray-600 shadow-xl
          hover:scale-110 hover:shadow-pink-500/50 hover:border-pink-500
          transition-all duration-300
          '
        >
          <h1 className='text-2xl text-white font-semibold'>Personality Based</h1>
        </div>

        {/* Community Button */}
        <div
          onClick={() => {setselectedOption("community");
            navv('/categories');
          }}
          
          className='
          w-[300px] h-[220px] bg-linear-to-br from-gray-700 to-gray-900 rounded-2xl
          flex items-center justify-center cursor-pointer
          border border-gray-600 shadow-xl
          hover:scale-110 hover:shadow-cyan-500/50 hover:border-cyan-500
          transition-all duration-300
          '
          
        >
          <h1 className='text-2xl text-white font-semibold'>Community Based</h1>
        </div>
      </div>
    </div>
  )
}

export default FindGroup
