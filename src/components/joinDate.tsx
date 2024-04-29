import React from 'react'
import Link from 'next/link'

function JoinDate({date} : any) {
  return (
    <Link href='/contact'>
    <div className='bg-sky-400 rounded-2xl mx-2 flex flex-col'>
        <div className='p-2 text-white font-semibold max-w-28 mr-6'>{date}</div>
        <div className='bg-red-600 rounded-b-2xl '>
            <div className='font-bold p-2'>Book Now</div>
        </div>
    </div>
    </Link>
  )
}

export default JoinDate