import React from "react";
import Link from "next/link";
import Image from "next/image";


export default function TrekCard({trekName, trekState, trekDescription, trekDistance, trekDuration, trekDifficulty, trekCost, trekInfo, trekLink} : any) {

    return (
        <div className="m-4 border-[1px] border-cyan-600 bg-gradient-to-b from-black to-gray-900 w-72 flex-shrink-0 rounded-3xl">

                <Link href={trekLink}>
                  <Image src="/Ranisui_manali_speedhike_The_Trail_Makers.jpg" alt={trekName} height={176} width={288} className =" object-cover rounded-t-3xl p-2" ></Image>
                </Link>
         

            <div className="border-b-[1px] border-yellow-500 p-2">

                <div className="flex items-center">
                    <h2 className=" pl-1 font-semibold uppercase text-white ">{trekName}</h2>
                    <h4 className=" px-2 ml-4 text-[10px] text-center font-medium uppercase rounded-lg bg-slate-700 text-blue-300 ">{trekState}</h4>
                </div>

                <p className="  text-sm p-1 text-stone-400">{trekDescription}</p>
            
            </div>

            <div className="p-2 pt-1 border-b-[1px] border-slate-700">
                <h3 className=" pl-1 font-bold text-sm uppercase text-neutral-500 inline-block">Trek Details</h3>
                <div className="px-4 pt-1 flex justify-between">
                        <div className="">
                            <h4 className="text-xs text-cyan-300">Distance</h4>
                            <h6 className=" text-cyan-300 font-medium">{trekDistance}</h6></div>
                        <div className="">
                            <h4 className="text-xs text-cyan-300">Duration</h4>
                            <h6 className=" text-cyan-300 font-medium">{trekDuration}</h6></div>
                        <div className="">
                            <h4 className="text-xs text-cyan-300">Difficulty</h4>
                            <h6 className=" text-cyan-300 font-medium">{trekDifficulty}</h6></div>
                </div>
            </div>

            <div className="flex justify-between mx-4 my-4 ">
                <div className="inline-block">
                    <h3 className="font-bold text-xl text-white ">INR {trekCost}</h3>
                    <h4 className="text-xs text-yellow-400">{trekInfo}</h4>
                </div>
            </div>
   
        </div>
    )
} 