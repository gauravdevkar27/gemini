import React from 'react'
import Sidebar from './components/sidebar'
import Chatbox from './components/chatbox'
import Credits from './pages/credits'
import { Route, Routes } from 'react-router-dom'
import Community from './pages/community'
import Login from './pages/login'
const App = () => {
  return (
    <div className='h-screen w-screen bg-white text-gray-900 dark:bg-gradient-to-b from-[#242124] to-[#000000] dark:text-white'>
      <div className='flex h-full w-full'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<Chatbox/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/credits' element={<Credits/>}/>
          <Route path='/community' element={<Community/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App 