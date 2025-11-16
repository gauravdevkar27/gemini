import React, { useState } from 'react'
import { useAppContext } from '../context/appContext'
import { assets } from '../assets/assets.js'
const sidebar = () => {

  const {chats, setSelectedChat, theme, setTheme, user} = useAppContext()
  const [search, setSearch] = useState()

  return (
    <div className="flex flex-col h-screen min-w-72 p-5 dark:bg-gradient-to-b from-
    [#242124]/30 to-[#000000]/30 border-r border-[#80609F]/30 backdrop-blur-3xl
    trasition-all duration-500 max-md:absolute left-0 z-1">

        <img src={theme === 'dark' ? assets.logo_full_dark : assets.logo_full} alt="" className=''/>
    </div>
  )
}

export default sidebar
