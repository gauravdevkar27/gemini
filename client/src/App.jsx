import React from 'react'
import Sidebar from './components/sidebar'
import Chatbox from './components/chatbox'
import Credits from './pages/credits'
import { Route, Routes } from 'react-router-dom'
import Community from './pages/community'
import Login from './pages/login'
const App = () => {
  return (
    <>
    <div className='dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white'>
      
    </div>
    <div className='flex h-screen w-screen'>
      <Sidebar/>
      <Routes>
        
        <Route path='/' element={<Chatbox/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/credits' element={<Credits/>}/>
        <Route path='/community' element={<Community/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App 