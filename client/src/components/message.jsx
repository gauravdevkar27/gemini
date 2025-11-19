import React from 'react'

const message = () => {
  return (
    <div>
      {message.role === "user" ? (
        <div className='flex items-start justify-end my-4 gap-2'>
          <div className='flex flex-col gap-2 p-2 px-4 bg-slate-50 dark:bg-
          [#57317C]/30 border border-[#80609F]/30 rounded-md max-w-2xl'>
            <p className='text-sm dark:text-primary'>{message.content}</p>
            <span className='text-xs text-gray-400 dark:text-[#B1A6C0]'>{message.timestamp}</span>
          </div>
          <img src={assets.user_icon} alt='' className='w-8 rounded-full'/>
          </div>
          ): (
          <div></div>
       )}
        </div>
  )
}

export default message; 
