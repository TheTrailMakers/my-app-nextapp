import React from 'react'
import Link from 'next/link'

type Batch = { day: string; batchSize: number; available: number };
type DateObj = { month: string; batches: Batch[] };

function JoinDate({ date, trekSlug }: { date: string | DateObj; trekSlug?: string }) {
  // Default link for backwards compatibility
  const href = trekSlug ? `/treks/${trekSlug}` : '/contact'
  const label = typeof date === 'string' ? date : date.month

  return (
    <Link href={href}>
      <div className='bg-white hover:bg-gray-100 transition-colors rounded-2xl mx-2 flex flex-col cursor-pointer'>
        <div className='pl-2 p-1 text-lg text-black font-bold w-28 mr-6'>{label}</div>
        <div className='bg-red-600 hover:bg-red-700 transition-colors rounded-b-2xl '>
          <div className='font-bold p-2'>Book Now</div>
        </div>
      </div>
    </Link>
  )
}

export default JoinDate