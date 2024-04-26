import React from 'react'
import TTMLogo from "../../public/TTM.png"
import Image from 'next/image'

function Footer() {
  return (
    <footer className='bg-neutral-800 pb-4 pt-2 text-white'>
      <div className='flex justify-between items-center p-4'>
        <Image src={TTMLogo} alt="The Trail Makers Logo" sizes="(max-width: 768px) 100px, 100px" className='w-20' priority></Image>
        <h4 className='uppercase font-bold text-amber-400 text-right text-xl w-60'>Check Newly Explored Routes</h4>
      </div>
      <div className='text-lg flex justify-between items-start'>
        <div className='p-6'>
          <h5 className='font-bold'>Treks by Season</h5>
          <div className='font-extralight'>
            <div className='pt-1'>Summer</div>
            <div className='pt-1'>Monsoon</div>
            <div className='pt-1'>Autumn</div>
            <div className='pt-1'>Winter</div>
            <div className='pt-1'>Spring</div>
          </div>
        </div>

        <div className='p-6'>
          <h5 className='font-bold'>Treks by Months</h5>
          <div className='flex justify-between items-start font-extralight'>
            <div className='pr-4'>
              <div className='pt-1'>January</div>
              <div className='pt-1'>February</div>
              <div className='pt-1'>March</div>
              <div className='pt-1'>April</div>
              <div className='pt-1'>May</div>
              <div className='pt-1'>June</div>
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
        
      </div>

      <div className='text-lg flex justify-between items-start'>
        <div className='p-6'>
          <h5 className='font-bold'>Treks by Duration</h5>
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


        <div className='p-6'>
          <h5 className='font-bold'>Treks by Region</h5>
          <div className='font-extralight'>
            <div className='pt-1'>Himachal</div>
            <div className='pt-1'>Ladakh</div>
            <div className='pt-1'>Sikkim</div>
            <div className='pt-1'>Kashmir</div>
            <div className='pt-1'>Uttarakhand</div>
            <div className='pt-1'>West Bengal</div>
          </div>
        </div>

        
      </div>

      <div className='text-lg flex justify-between items-start'>
            
        <div className='p-6'>
          <h5 className='font-bold'>Treks by Difficulty</h5>
           <div className='font-extralight'>
            <div className='pt-1'>Grade 1</div>
            <div className='pt-1'>Grade 2</div>
            <div className='pt-1'>Grade 3</div>
            <div className='pt-1'>Grade 4</div>
            <div className='pt-1'>Grade 5</div>
            <div className='pt-1'>Grade 5+</div>
            <div className='pt-1'>Technical Treks</div>
            <div className='pt-1'>Exploratory Trek</div>
            </div>
        </div>

      </div>
        
      <div className='bottom-0 text-center text-slate-500 pt-8'>© the trail makers</div>
      <div className='text-neutral-500 text-center'>Made by Pritam Bera</div>
    </footer>
  )
}

export default Footer 