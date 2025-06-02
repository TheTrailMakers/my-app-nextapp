import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Footer() {
  return (
    <footer className='bg-neutral-800 pb-4 pt-2 text-white'>
      <div className='flex justify-between flex-wrap items-center p-4 lg:mx-28'>
        <Image  src="/TTM.png" alt="The Trail Makers Logo" 
                width={100} height={100}
                sizes="(max-width: 768px) 100px, 100px" 
                className='w-20 lg:w-40' 
                priority></Image>
        <h4 className='uppercase font-bold bg-amber-500 text-xl text-white
         p-2 px-6 rounded-2xl text-right flex-shrink max-w-40 mr-2 leading-5'>Newly Explored Routes</h4>
      </div>

      {/* <div className='flex flex-wrap justify-between lg:justify-center gap-8 text-sm'> */}

        <div className=' text-sm font-light grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:px-[calc((100vw-1280px)/2)] mx-4'>
          <div className='p-4 px-2'>
            <h5 className='font-medium text-base'>Treks by Season</h5>
            <div className='font-extralight'>
              <div className='pt-1'>Summer</div>
              <div className='pt-1'>Monsoon</div>
              <div className='pt-1'>Autumn</div>
              <div className='pt-1'>Winter</div>
              <div className='pt-1'>Spring</div>
            </div>
          </div>

          <div className='p-4 px-2'>
            <h5 className='font-medium text-base'>Treks by Months</h5>
            <div className='font-extralight flex flex-wrap gap-4'>
              <div className=''>
                <p className='pt-1'>January</p>
                <p className='pt-1'>February</p>
                <p className='pt-1'>March</p>
                <p className='pt-1'>April</p>
                <p className='pt-1'>May</p>
                <p className='pt-1'>June</p>
              </div>
              <div >
                <div className='pt-1'>July</div>
                <div className='pt-1'>August</div>
                <div className='pt-1'>September</div>
                <div className='pt-1'>October</div>
                <div className='pt-1'>November</div>
                <div className='pt-1'>December</div>
              </div>
            </div>
          </div>
          


          <div className='p-4 px-2'>
            <h5 className='font-medium text-base'>Treks by Duration</h5>
            <div className='font-extralight'>
            <div className='pt-1'>2 Days</div>
            <div className='pt-1'>3 Days</div>
            <div className='pt-1'>4 Days</div>
            <div className='pt-1'>5 Days</div>
            <div className='pt-1'>6 Days</div>
            <div className='pt-1'>7 Days</div>
            <div className='pt-1'>+7 Days</div>
            </div>
          </div>


          <div className='p-4 px-2'>
            <h5 className='font-medium text-base'>Treks by Region</h5>
            <div className='font-extralight'>
              <div className='pt-1'>Himachal</div>
              <div className='pt-1'>Ladakh</div>
              <div className='pt-1'>Sikkim</div>
              <div className='pt-1'>Kashmir</div>
              <div className='pt-1'>Uttarakhand</div>
              <div className='pt-1'>West Bengal</div>
            </div>
          </div>



              
          <div className='p-4 px-2'>
            <h5 className='font-medium text-base'>Treks by Difficulty</h5>
            <div className='font-extralight'>
              <div className='pt-1'>First Timers</div>
              <div className='pt-1'>Beginners</div>
              <div className='pt-1'>Learners 1</div>
              <div className='pt-1'>Learners 2</div>
              <div className='pt-1'>Skilled</div>
              <div className='pt-1'>Expert</div>
              <div className='pt-1'>Technical Treks</div>
              <div className='pt-1'>Exploratory Trek</div>
            </div>
          </div>
              
          <div className='p-4 px-2'>
            <h5 className='font-medium text-base'>Popular Articles</h5>
            <div className='font-extralight'>
              <Link href={"/blog/The-Only-Difference-Between-Trekking-And-Hiking"} className='text-sky-300'><div className='pt-1'>The-Only-Difference-Between-Trekking-And-Hiking</div></Link>
              <Link href={"/blog/Understanding-The-Layering-System"} className='text-sky-300'><div className='pt-1'>Understanding-The-Layering-System</div></Link>
              <Link href={"/blog/10-Best-Treks-in-Himachal-Pradesh"} className='text-sky-300'><div className='pt-1'>10-Best-Treks-in-Himachal-Pradesh</div></Link>
            </div>
          </div>

      </div>
        
      <div className='bottom-0 text-center text-slate-500 pt-8'>© the trail makers</div>
      <div className='text-neutral-500 text-center'>Made by Pritam Bera</div>
    </footer>
  )
}

export default Footer 