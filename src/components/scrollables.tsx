import React from 'react'
import Link from "next/link";
import { CldImage } from 'next-cloudinary';

function  Scrollables({Name, Img} : any) {

    const default_Image = "https://res.cloudinary.com/thetrail/image/upload/v1714107209/default_trek_image.jpg"

  return (
    <div className='m-4 snap-center w-60 flex-shrink-0 rounded-3xl'>
        <Link href="/Coming_Soon">
            <div className='relative  flex flex-col justify-center items-center'>

                <CldImage src={Img || default_Image} height={640} width={480} crop="fill" alt={Name} className="h-[320] w-[240] rounded-3xl gradient from-black to-slate-500" 
                sizes="(max-width: 768px) 250px, 800px"></CldImage>

                <h4 className='absolute top-4 text-2xl text-center px-6 font-bold'>{Name}</h4>

            </div>
        </Link>
    </div>
  )
}

export default Scrollables