import React, { useState } from 'react'
import Sidebar from './components/sidebar'
import Chatbox from './components/chatbox'
import Credits from './pages/credits'
import { Route, Routes } from 'react-router-dom'
import Community from './pages/community'
import Login from './pages/login'
import { assets } from './assets/assets'
const App = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
    {!isMenuOpen && <img src={assets.menu_icon} className='absolute top-3 left-3
    w-8 h-8 cursor-pointer md:hidden not-dark:invert' onClick={() => setIsMenuOpen(true)}/>}
    <div className='h-screen w-screen bg-white text-gray-900 dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white'>
      <div className='flex h-full w-full'>
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
        <Routes>
          <Route path='/' element={<Chatbox/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/credits' element={<Credits/>}/>
          <Route path='/community' element={<Community/>}/>
        </Routes>
      </div>
    </div>
    </>
  )
}

export default App 
