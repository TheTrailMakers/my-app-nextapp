"use client"

import React from 'react'
import Link from 'next/link';

import { FaWhatsapp } from 'react-icons/fa';
import { FaInstagram } from "react-icons/fa6";

function Contact() {

  return (
    <div className='bg-gradient-to-b from-black via-sky-900 to-neutral-800 min-h-screen text-white text-center pt-40'>

      <div className='font-bold text-5xl mb-4 mx-1 uppercase below-xs:text-2xl'>Contact Now</div>
      <div className='mx-20'> For now contact on <strong className='text-amber-500 font-bold text-2xl'>7980426832</strong> for any trek details</div>

      
      <div className='py-8 flex justify-center gap-2'>
        <Link href="https://wa.me/7980426832">
          <div className='bg-amber-400 p-2 rounded-xl'><FaWhatsapp className='size-20 mx-auto' /></div>
        </Link>

        <div className='w-[3px] bg-white'></div>

        <Link href="https://www.instagram.com/the_trail_makers">
          <div className='bg-red-500 p-2 rounded-xl'><FaInstagram className='size-20'/></div>
        </Link>
        <div className=''/>
      </div>

    </div>
  )
}

export default Contact