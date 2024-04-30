import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function AllCard({Name, Img, State, Description, Distance, Duration, Difficulty, Date, PageLink} : any) {

    const default_Image = "https://res.cloudinary.com/thetrail/image/upload/v1714107209/default_trek_image.jpg"

    return (
        <div className="m-1 border-[1px] border-cyan-600 bg-gradient-to-b from-black to-gray-900 max-w-40 rounded-3xl">

                <Link href="/contact">
                  <Image src={Img || default_Image} alt={Name} width={320} height={192} className="object-cover max-w-40 h-28 rounded-t-3xl p-1" sizes="(max-width: 768px) 250px, 800px"></Image>
                </Link>

            <div className="border-b-[1px] border-yellow-500 p-2 min-h-16">

                <div className="flex items-center">
                    <h2 className=" pl-1 font-semibold uppercase text-white ">{Name}</h2>
                </div>

            
            </div>

            <div className="p-2 pt-1  border-slate-700">
                <div className="px-2 pt-1 flex justify-between">
                        <div className="">
                            <h4 className="text-xs text-cyan-300">Duration</h4>
                            <h6 className=" text-cyan-300 font-medium">{Duration}</h6></div>
                        <div className="">
                            <h4 className="text-xs text-cyan-300">Difficulty</h4>
                            <h6 className=" text-cyan-300 font-medium">{Difficulty}</h6></div>
                </div>
            </div>
{/* 
            <Link href={PageLink}>
            <div className="text-center flex flex-col items-center pt-4">
                <p className="text-white bg-gradient-to-r from-red-600 to-red-900 py-1 w-3/4 font-bold text-lg rounded-t-3xl">{Date[0]}</p>
            </div>
            </Link> */}
   
        </div>
    )
} 
