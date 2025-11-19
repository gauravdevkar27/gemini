import React from 'react'

const chatbox = () =>  {
  return (
    <div className='flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30
    max-md:mt-14 2xl:pr-40'>
      {/* Chat Messages */}
      <div className='flex-1 mb-5 overflow-y-scroll'>
       {messages.length === 0 && (
        <div className='h-full flex flex-col items-center justify-center gap-2
        text-primary'>
          <img src={theme==='dark' ? assets.logo_full : assets.logo_full_dark}
          alt='' className='w-full max-w-56 sm:max-w-68'/>
          <p className='mt-5 text-4xl sm:tex-6xl text-center text-gray-400
          dark:text-white'>Ask me anything</p>
        </div>
       )}

       {messages.map((message, index)=>{})}
      </div>

      {/* Prompt Input Box */}
    </div>
  )
}

export default chatbox
