import React from "react";
import Link from "next/link";
import Image from "next/image";


export default function TrekCard({Name, Img, State, Description, Distance, Duration, Difficulty, Date, PageLink} : any) {

    const default_Image = "https://res.cloudinary.com/thetrail/image/upload/v1714107209/default_trek_image.jpg"

    return (
        <div className="m-4 border-[1px] snap-center relative border-cyan-600 bg-gradient-to-b from-black to-gray-900 w-80 flex-shrink-0 rounded-3xl font">

                <Link href={PageLink || "/contact"}>
                  <Image src={Img || default_Image} alt={Name} width={320} height={192} className="object-cover w-80 h-48 rounded-t-3xl p-2" sizes="(max-width: 768px) 250px, 800px"></Image>
                </Link>

            <div className="border-b-[1px] border-yellow-500 p-2 min-h-40">

                <div className="flex items-center">
                    <h2 className=" pl-1 font-semibold uppercase text-white ">{Name}</h2>
                    <h4 className=" px-2 ml-4 text-[10px] text-center font-medium uppercase rounded-lg bg-slate-700 text-blue-300 ">{State}</h4>
                </div>

                <p className=" text-sm p-1 text-stone-400">{Description}</p>
            
            </div>

            <div className="p-2 pt-1  border-slate-700">
                <h3 className=" pl-1 font-bold text-sm uppercase text-neutral-500 inline-block"> Details</h3>
                <div className="px-4 pt-1 flex justify-between">
                        <div className="">
                            <h4 className="text-xs text-cyan-300">Distance</h4>
                            <h6 className=" text-cyan-300 font-medium">{Distance}</h6></div>
                        <div className="">
                            <h4 className="text-xs text-cyan-300">Duration</h4>
                            <h6 className=" text-cyan-300 font-medium">{Duration}</h6></div>
                        <div className="">
                            <h4 className="text-xs text-cyan-300">Difficulty</h4>
                            <h6 className=" text-cyan-300 font-medium">{Difficulty}</h6></div>
                </div>
            </div>

            <Link href={PageLink}>
            <div className="text-center flex flex-col items-center pt-4">
                <p className="text-white bg-gradient-to-r from-red-600 to-red-900 py-1 w-3/4 font-bold text-lg rounded-t-3xl">{Date[0]}</p>
            </div>
            </Link>
   
        </div>
    )
} 