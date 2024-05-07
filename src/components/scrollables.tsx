import React from 'react'
import Link from "next/link";
import Image from 'next/image';

function  Scrollables({Name, Img} : any) {

    const default_Image = "https://res.cloudinary.com/thetrail/image/upload/v1714107209/default_trek_image.jpg"

  return (
    <div className='m-4 snap-center w-60 flex-shrink-0 rounded-3xl'>
        <Link href="/contact">
            <div className='relative  flex flex-col justify-center items-center'>

                <Image src={Img || default_Image} height={320} width={240} alt={Name} className="h-[320] w-[240] rounded-3xl gradient from-black to-slate-500" 
                sizes="(max-width: 768px) 250px, 400px"></Image>

                <h4 className='absolute top-4 text-2xl text-center px-6 font-bold'>{Name}</h4>

            </div>
        </Link>
    </div>
  )
}

export default Scrollables