import React from 'react'
import Link from "next/link";
import Image from "next/image";

import BandarpunchhImg from "../../public/Bandarpunchh-Black Peak.jpg"

function Scrollables({trekName, trekImg} : any) {
  return (
    <div className='m-4 snap-center w-60 flex-shrink-0 rounded-3xl'>
        <Link href="/Coming_Soon">
            <div className='relative  flex flex-col justify-center items-center'>
            <Image src={BandarpunchhImg} alt={trekName} className=" rounded-3xl" sizes="(max-width: 768px) 250px, 800px" placeholder="blur"></Image>
            <h4 className='absolute top-2 text-2xl text-center px-4 font-extrabold'>{trekName}</h4>
            </div>
        </Link>
    </div>
  )
}

export default Scrollables