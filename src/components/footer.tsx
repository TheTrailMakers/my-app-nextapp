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
      <div className='text-lg flex justify-start items-start'>
        <div className='p-6'>
          <h5 className='font-bold'>Treks by Season</h5>
          <div >Summer</div>
          <div >Monsoon</div>
          <div >Autumn</div>
          <div >Winter</div>
          <div >Spring</div>
        </div>

        <div className='p-6'>
          <h5 className='font-bold'>Treks by Months</h5>
          <div className='flex justify-between items-start'>
            <div className='pr-4'>
              <div>January</div>
              <div>February</div>
              <div>March</div>
              <div>April</div>
              <div>May</div>
              <div>June</div>
            </div>
            <div>
              <div>July</div>
              <div>August</div>
              <div>September</div>
              <div>October</div>
              <div>November</div>
              <div>December</div>
            </div>
          </div>
        </div>
        
      </div>

      <div className='text-lg flex justify-start items-start'>
        <div className='p-6'>
          <h5 className='font-bold'>Treks by Duration</h5>
          <div >2 Days</div>
          <div >3 Days</div>
          <div >4 Days</div>
          <div >5 Days</div>
          <div >6 Days</div>
          <div >7 Days</div>
          <div >+7 Days</div>
        </div>
        <div className='p-6'>
          <h5 className='font-bold'>Treks by Difficulty</h5>
          <div>Grade 1</div>
          <div>Grade 2</div>
          <div>Grade 3</div>
          <div>Grade 4</div>
          <div>Grade 5</div>
          <div>Grade 5+</div>
          <div>Technical Treks</div>
          <div>Exploratory Trek</div>
        </div>
      </div>
      <div className='bottom-0 text-center text-slate-500'>© the trail makers</div>
      <div className='text-neutral-500 text-center'>Made by Pritam Bera</div>
    </footer>
  )
}

export default Footer 