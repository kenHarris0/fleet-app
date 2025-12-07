import React from 'react'
import Navbar from './components/Navbar'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Chatpage from './pages/Chatpage'
import Login from './pages/Login'
import {ToastContainer} from 'react-toastify'
import Creategroup from './pages/Creategroup'
const App = () => {
  return (
    <div className='w-[80%] h-screen m-auto border border-white-500  '>
      <Navbar/>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chat' element={<Chatpage/>}/>
        <Route path='/userauth' element={<Login/>}/>
         <Route path='/group' element={<Creategroup/>}/>

      </Routes>
      
    </div>
  )
}

export default App
