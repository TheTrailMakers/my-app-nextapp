import React from 'react'
import Link from 'next/link'

function JoinDate({date} : any) {
  return (
    <Link href='/contact'>
    <div className='bg-white  rounded-2xl mx-2 flex flex-col'>
        <div className='pl-2 p-1 text-lg text-black font-bold w-28 mr-6'>{date}</div>
        <div className='bg-red-600 rounded-b-2xl '>
            <div className='font-bold p-2'>Book Now</div>
        </div>
    </div>
    </Link>
  )
}

export default JoinDate