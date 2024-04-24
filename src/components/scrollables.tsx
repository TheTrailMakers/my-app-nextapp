import React from 'react'
import Link from "next/link";
import Image from "next/image";

import BandarpunchhImg from "../../public/Bandarpunchh-Black Peak.jpg"

function Scrollables({trekName, trekState} : any) {
  return (
    <div className='m-4 snap-center text-center w-40 flex-shrink-0 rounded-3xl '>
        <Link href="/Coming_Soon">
            <h4 className=''>{trekName}</h4>
            <Image src={BandarpunchhImg} alt={trekName} className="object-cover rounded-3xl" sizes="(max-width: 768px) 250px, 800px" placeholder="blur"></Image>
        </Link>
    </div>
  )
}

export default Scrollables