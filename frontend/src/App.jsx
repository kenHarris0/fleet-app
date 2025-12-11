import React from 'react'
import Navbar from './components/Navbar'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Chatpage from "./pages/chatpage.jsx";

import Login from './pages/Login'
import {ToastContainer} from 'react-toastify'
import Creategroup from './pages/Creategroup'
import FindGroup from './pages/FindGroup'
import CommunityPage from './pages/CommunityPage'
import PerrsonalityChecker from './pages/PerrsonalityChecker'
import PersonalityDisplay from './pages/PersonalityDisplay'
import Profile from './pages/Profile'
import Viewuserprofile from './pages/Viewuserprofile'
const App = () => {
  return (
    <div className='w-[80%] min-h-screen m-auto border border-white-500  '>
      <Navbar/>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chat' element={<Chatpage/>}/>
        <Route path='/userauth' element={<Login/>}/>
         <Route path='/group' element={<Creategroup/>}/>
         <Route path='/selectgrp' element={<FindGroup/>}/>
         <Route path='/categories' element={<CommunityPage/>}/>
         <Route path='/personality' element={<PerrsonalityChecker/>}/>
         <Route path='/display/:personality' element={<PersonalityDisplay/>}/>
         <Route path='/profile/:id' element={<Profile/>}/>
         <Route path='/othersprofile/:id' element={<Viewuserprofile/>}/>

      </Routes>
      
    </div>
  )
}

export default App
