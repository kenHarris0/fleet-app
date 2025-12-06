import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {fleetContext} from '../context/Context.jsx'
const Navbar = () => {
  const navv=useNavigate()
  const {userdata}=useContext(fleetContext)
  return (
    <div className='w-[80%] h-20 flex justify-between items-center px-10
                fixed top-0 left-1/2 -translate-x-1/2
                z-50 bg-transparent'>


      
      <h1 className='text-[32px] font-bold' onClick={()=>navv('/')}>Fleets</h1>

      <div className='flex gap-10 text-[14px]'>
        <p className='nav-item hover:text-gray-400 transition' onClick={()=>navv('/')}>Home</p>
        <p className='nav-item hover:text-gray-400 transition'>Features</p>
        <p className='nav-item hover:text-gray-400 transition'>Chats</p>
        <p className='nav-item hover:text-gray-400 transition'>Find Fleets</p>
      </div>

      <div>
        {!userdata ? (<p className='btn-elm w-[140px] h-[35px] flex items-center justify-center' onClick={()=>navv('/userauth')}>
          Login / Register
        </p>):(
          <img src={userdata?.image || "/avatar.png"} alt="profile" className='w-10 h-10 object-cover cursor-pointer' />
        )}
      </div>

    </div>
  )
}

export default Navbar
