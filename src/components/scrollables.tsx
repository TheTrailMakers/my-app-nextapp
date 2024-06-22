import React from 'react'
import Link from "next/link";
import Image from 'next/image';

function  Scrollables({Name, Img} : any) {

    const default_Image = "https://res.cloudinary.com/thetrail/image/upload/v1714107209/default_trek_image.jpg"

  return (
    <div className='my-4 mx-2 snap-center w-32 h-40 flex-shrink-0 object-fit'>
        <Link href="/contact">
            <div className='relative  flex flex-col justify-center items-center'>

                <Image src={Img || default_Image} height={320} width={240} alt={Name} className="h-full w-full rounded-xl" 
                sizes="(max-width: 768px) 250px, 400px"></Image>
                <div className='absolute w-full h-full z-10 bg-gradient-to-b from-black to-transparent to-50% border-t-2 border-t-blue-600 border-e-blue-600 rounded-xl'></div>

                <h4 className='absolute z-20 top-2 text-base font-mono uppercase text-center leading-5 px-2 font-bold'>{Name}</h4>

            </div>
        </Link>
    </div>
  )
}

export default Scrollables