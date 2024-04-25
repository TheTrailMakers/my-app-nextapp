import React from 'react'
import TTMLogo from "../../public/TTM.png"
import Image from 'next/image'

function Footer() {
  return (
    <footer className='bg-neutral-800 pb-4 pt-2 text-white'>
      <div className='flex justify-between items-center p-4'>
        <Image src={TTMLogo} alt="The Trail Makers Logo" sizes="(max-width: 768px) 50px, 100px" className='w-24' priority></Image>
        <h4 className='uppercase font-bold text-amber-400 text-right text-xl w-60'>Check Newly Explored Routes</h4>
      </div>
      <div className='h-36 text-center text-4xl font-bold align-middle'> coming soon....</div>
      <div className='bottom-0 text-center text-slate-500'>© the trail makers</div>
      <div className='text-neutral-500 text-center'>Made by Pritam Bera</div>
    </footer>
  )
}

export default Footer