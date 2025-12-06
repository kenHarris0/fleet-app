
import React, { useContext, useEffect, useRef, useState } from "react";
import CLOUDS from "vanta/dist/vanta.clouds.min.js";
import {toast} from 'react-toastify'
import * as THREE from "three";
import {gsap} from 'gsap'
import SplitType from 'split-type'
import { User,Mail,LockKeyhole  } from 'lucide-react';
import axios from "axios";
import {fleetContext} from '../context/Context.jsx'

import {useNavigate} from 'react-router-dom'


const Login = () => {
     const vantaRef = useRef(null);

  useEffect(() => {
    const effect = CLOUDS({
      el: vantaRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      minHeight: 200.0,
      minWidth: 200.0,
    });

    return () => effect.destroy();
  }, []);


useEffect(()=>{
    const text=new SplitType('.split-text',{types:"chars"})

    gsap.to(text.chars,{
        rotateY:360,
        yoyo:true,
        repeat:-1,
        stagger:0.08,
        repeatDelay: 2,   // small break before looping
      ease: "back.inOut"
    })

},[])

//actions
const {url,loggedin,setloggedin,authuser,getuserdata,setuserdata}=useContext(fleetContext)

const [ipdata,setipdata]=useState({
    name:"",
    email:"",
    password:""
})
const [logintype,setlogintype]=useState("signup")
const navigator=useNavigate()
const handleChange=(e)=>{
    const {name,value}=e.target
    setipdata(item=>({...item,[name]:value}))
}

const handleSubmit=async(e)=>{
    e.preventDefault();

    try{
        if(logintype==="signup"){
            const res=await axios.post(url+'/user/signup',ipdata,{withCredentials:true})
            if(res.data.success){
                setuserdata(res.data.payload)
                setloggedin(true)
                toast.success("signed up ")
                setipdata({
                     name:"",
    email:"",
    password:""

                })
                setTimeout(() => {
                    navigator('/')
                }, 1000);

            }
        }
        else{
            const res=await axios.post(url+'/user/login',{email:ipdata.email,password:ipdata.password},{withCredentials:true})
            if(res.data.success){
                setuserdata(res.data.payload)
                setloggedin(true)
                toast.success("logged in ")
                setipdata({
                     name:"",
    email:"",
    password:""

                })
                setTimeout(() => {
                    navigator('/')
                }, 1000);

            }

        }

    }
    catch(err){
        console.log(err)
    }

}




  return (
    <div className='w-full h-screen flex items-center justify-center'>

        <div className='w-[80%] h-[80vh] bg-gray-200 mt-10    flex '>
            <div ref={vantaRef} className='w-[70%] h-full  flex flex-col items-center justify-center gap-4'>
                <h1 className="z-10 text-[80px] text-white split-text"> Welcome to Fleet </h1>
                <h1 className="z-10 text-[30px] text-white ">Please {logintype==="signup"?"Signup":"Login"}</h1>

            </div>

             <div className='w-[40%] h-full flex flex-col items-center justify-center bg-gray-700 '>

                <form onSubmit={handleSubmit} className="w-full h-[60%] flex flex-col items-center justify-center gap-4   ">

                 

                    {logintype==="signup" && <div className="flex items-center gap-2  px-4 py-3 rounded-full w-[80%] z-100 border">
  <User className="text-white-600" />
  <input 
    type="text" 
    name="name"
    placeholder="Username"
    className="bg-transparent outline-none text-white w-full"
    value={ipdata.name}
    onChange={handleChange}
  />
</div>}

 <div className="flex items-center gap-2  px-4 py-3 rounded-full w-[80%] border">
  <Mail className="text-white-600" />
  <input 
    type="email" 
    name="email"
    placeholder="Email"
    className="bg-transparent outline-none text-white w-full"
    value={ipdata.email}
    onChange={handleChange}
  />
</div>

 <div className="flex items-center gap-2  px-4 py-3 rounded-full w-[80%] border">
  <LockKeyhole  className="text-white-600" />
  <input 
    type="password" 
    name="password"
    placeholder="Password"
    className="bg-transparent outline-none text-white w-full"
    value={ipdata.password}
    onChange={handleChange}
  />
</div>

<button className=" btn-elm w-[150px] h-12  cursor-pointer mt-[30px] border rounded-4xl">{logintype==="signup"?"Signup":"Login"}</button>




                </form>
               {logintype==="signup"?<p className="text-base font-bold text-white cursor-pointer" onClick={()=>setlogintype("login")}>Already have an account? Login</p>:<p className="text-base cursor-pointer font-bold text-white" onClick={()=>setlogintype("signup")}>New to fleet, create an account now</p>}

            </div>



        </div>
      
    </div>
  )
}

export default Login
