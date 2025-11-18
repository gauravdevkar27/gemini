import React, { useState } from 'react'
import { useAppContext } from '../context/appContext.jsx'
import { assets } from '../assets/assets.js'
const Sidebar = () => {

  const { chats, setSelectedChat, theme, setTheme, user } = useAppContext()
  const [search, setSearch] = useState('')

  return (
    <div className="flex flex-col h-screen min-w-72 p-5 bg-white/90 
    border-r border-gray-200 backdrop-blur-3xl transition-all duration-500 
    max-md:absolute left-0 z-1">

      {/* Logo */}
      <img src={theme === 'dark' ? assets.logo_full_dark : assets.logo_full} alt="Gemini Clone logo" className='w-40' />

      {/*new chat button*/}
      <button className='flex justify-center items-center w-full py-2 mt-10
        text-white bg-gradient-to-r from-[#A456f7] to-[#3D81F6] text-sm rounded-md
        cursor-pointer'>
        <span className='mr-2 text-xl'>+</span> New Chat
      </button>

      {/* Search conversations */}
      <div className='flex items-center gap-2 p-3 mt-4 border border-gray-200
        dark:border-white/20 rounded-md bg-gray-100 dark:bg-gray-800'>
        <img src={assets.search_icon} className='w-4 not-dark:invert' alt='Search icon' />
        <input onChange={(e) => setSearch(e.target.value)} value={search} type="text"
          placeholder='Search conversations' className='w-full text-xs text-gray-900 dark:text-white 
          placeholder:text-gray-400 outline-none bg-transparent' />
      </div>

      {/* Recent chats */}
      {chats.length > 0 && <p className='mt-4 text-sm'>Recent Chats</p>}
      <div className='flex-1 overflow-y-scroll mt-3 text-sm space-y-3'>
        {
          chats.filter((chat) => chat.messages[0] ? chat.messages[0]?.content.toLowerCase().includes(search.toLowerCase()) : chat.name.
              toLowerCase().includes(search.toLowerCase())).map((chat) => (
                <div key={chat._id} className='p-2 px-4 dark:bg-[#57317C]/10 border
            border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer
            flex justify-between group'>
                  <div>
                    <p className='truncate w-full'>
                      {
                        chat.messages.length > 0 ? chat.messages[0].content.slice(0, 32) : chat.name
                      }
                    </p>
                    <p className='text-xs text-gray-500 dark:text-[#B1A6C0]'>
                      {chat.updatedAt}
                    </p>
                  </div>
                  <img 
                    src={assets.bin_icon} 
                    className='hidden group-hover:block w-4 h-4 cursor-pointer dark:invert opacity-70 hover:opacity-100 transition-opacity' 
                    alt='Delete chat' 
                  />
                </div>
              ))
        }
      </div>

     


    </div>
  )
}

export default Sidebar
