import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function AllCard({Name, Img, State, Description, Distance, Duration, Difficulty, Date, PageLink} : any) {

    const default_Image = "https://res.cloudinary.com/thetrail/image/upload/v1714107209/default_trek_image.jpg"

    return (
        <div className="m-1 relative flex flex-col items-center border-cyan-600 bg-gradient-to-b from-black to-gray-900 h-60 rounded-2xl">

            <Link href={PageLink || "/contact"}>
                  <Image src={Img || default_Image} alt={Name} width={320} height={320} 
                         className="object-cover w-40 h-60 rounded-2xl" 
                         sizes="(max-width: 768px) 250px, 800px"></Image>
            </Link>

            <h2 className="p-1 m-2 absolute bottom-2 bg-red-400 rounded-md shadow-md
            font-semibold uppercase text-sm text-center">
                {Name}
            </h2>
   
        </div>
    )
} 
