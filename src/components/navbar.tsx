"use client"

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useStore from "@/./store/store";
import Button from "./button";

const navLinks = [
    {name: "Home", href:"/"},
    {name: "Expeditions", href:"/Expeditions"},
    {name: "Trekkings", href:"/Trekkings"},
    {name: "Courses", href:"/Courses"},
    {name: "Mountain Lessons", href:"/Mountain-Lessons"},
    {name: "FAQs", href:"/FAQs"},
    {name: "Enquire", href:"/Enquire"}
]


function Hamburger () {

    const {hamburgerOpen} = useStore((state:any) => {
        return {hamburgerOpen: state.hamburgerOpen}
      })

    return (
        <div className="w-8 h-8 mr-4 flex flex-col
                        justify-around flex-nowrap">
            <div className={`w-8 h-1 rounded-lg bg-white duration-500
                           ${hamburgerOpen ? 'rotate-45 translate-y-[11px]' : 'rotate-0'}`}></div>
            <div className={`w-8 h-1 rounded-lg bg-white duration-500
                           ${hamburgerOpen ? 'rotate-90 opacity-0 ' : 'opacity-100 '}`}></div>
            <div className={`w-8 h-1 rounded-lg bg-white duration-500
                           ${hamburgerOpen ? '-rotate-45 -translate-y-[11px]' : 'rotate-0'}`}></div>
        </div>
    )
}


export default function Navbar () {

    const {hamburgerOpen, toggleHamburger} = useStore((state:any) => {
        return {hamburgerOpen: state.hamburgerOpen, toggleHamburger:state.toggleHamburger}
      })

      const pathname = usePathname()

    useEffect(() => {
        document.body.style.overflow = hamburgerOpen ? 'hidden' : 'auto';
        }, [hamburgerOpen]);

    return(
        
        <header className="top-0 left-0 right-0 flex items-center justify-end gap-4 bg-black h-16"> 

            <Link href='/' className="mr-auto"><Image  className="pl-4 " src="/TTM.png" alt="The Trail Makers Logo" width={80} height={80}/></Link>
            
            
            <Link href="/Coming_Soon"><Button text="Sign Up" bgcolor="bg-neutral-700" txtcolor="text-white" ></Button></Link>
            <Link href="/Coming_Soon"><Button text="Log In" bgcolor="bg-white" txtcolor="text-black" ></Button></Link>

            <nav className={`font-mono uppercase bg-neutral-950 text-white
                            fixed h-full w-80 max-w-[calc(100%-3rem)] top-0 right-0
                            z-10 transition-transform
                            flex flex-col pt-28 items-end 
                            ${hamburgerOpen?'translate-x-0':'translate-x-full'} `}>


                <ul>
                    {navLinks.map(({name, href}) => (
                        <li key={href} className="pr-4 pb-4 text-2xl">
                            <Link  
                                href={href}
                                className={`${pathname === href ? "text-sky-500" : "text-white"}`}
                            >
                                {name}
                            </Link>
                        </li>
                    ))}

                </ul>

            </nav>


            
            <div className="z-20" onClick={toggleHamburger}>
                <Hamburger/>
            </div>
            
            
        </header>
    )
}