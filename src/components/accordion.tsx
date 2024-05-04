"use client"

import React, { useState } from 'react'

function Accordion({question, answer} :any) {

    const [open, setOpen] = useState(false)
  return (
    <div className='my-2 flex-col bg-amber-500 rounded-lg'>
        <button onClick={() => {setOpen(!open)}} className='flex justify-between items-center w-full px-2 py-1 font-medium'>
            <span className='text-black'>{question}</span>
            <span className='text-2xl'>{open?"-":"+"}</span>
        </button>

        <div className={`grid overflow-hidden transition-all duration-300 ease-in-out text-sm bg-amber-800 text-neutral-300 rounded-b-lg
        ${open?'grid-rows-[1fr] opacity-100 px-4 py-2':'grid-rows-[0fr] opacity-0'}`}>
            <div className='overflow-hidden '>{answer}</div>
        </div>
    </div>
  )
}

export default Accordion