import React, { useState } from 'react'
import Sidebar from './components/sidebar'
import Chatbox from './components/chatbox'
import Credits from './pages/credits'
import { Route, Routes, useLocation } from 'react-router-dom'
import Community from './pages/community'
import Login from './pages/login'
import { assets } from './assets/assets'
import Loading from './pages/loading'
import './assets/prism.css'
import { useAppContext } from './context/appContext'
const App = () => {

  const {user} = useAppContext()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {pathname} = useLocation()

  if(pathname === '/loading') return <Loading/>
  return (
    <>
    {!isMenuOpen && <img src={assets.menu_icon} className='absolute top-3 left-3
    w-8 h-8 cursor-pointer md:hidden not-dark:invert' onClick={() => setIsMenuOpen(true)}/>}

      {user ? (
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
      ) : (
       <div className='bg-gradient-to-b from-[#242124] to-[#000000] flex
       items-center justify-center h-screen w-screen'>
        <Login/>
       </div>
      )}

   
    </>
  )
}

export default App 
