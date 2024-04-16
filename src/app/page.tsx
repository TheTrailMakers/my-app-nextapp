"use client"

import Image from "next/image";
import useStore from "@/store/store";
import Homecards from "@/components/homecards";
import mockdata from "@/data/homepage_cards.json";
import Link from "next/link";



interface Trek {
  trekIndex: number;
  trekName: string;
  trekState: string;
  trekDescription: string;
  trekDistance: string;
  trekDuration: string;
  trekDifficulty: string;
  trekCost: string;
  trekInfo: string;
  trekLink: string;
}

export default function Home() {

const {hamburgerOpen} = useStore((state:any) => {
  return {hamburgerOpen: state.hamburgerOpen}

})

  return (
    <main className="min-h-screen bg-black text-white">
      <Image alt="trail running to lamadugh" width={0} height={0} sizes="100vw" style={{width: '100%',height: 'auto' }} src="/Ranisui_manali_speedhike_The_Trail_Makers.jpg" className=""></Image>
      
      <div className=" pl-2 pb-20 ">
        <img src="/ttm image.png" alt="ttm image" className="h-52 mx-auto -rotate-12"></img>
      </div>
      
      <h3 className="font-bold text-yellow-500 text-3xl uppercase ml-8">Upcoming<br/>Treks...</h3>
      <div className="flex overflow-x-auto snap-x snap-mandatory bg-black">
        <Homecards {...mockdata[0]}/>
        <Homecards {...mockdata[1]}/>
        <Homecards {...mockdata[2]}/>
        <Homecards {...mockdata[3]}/>
      </div>

      <div className=" m-6 pt-10 pr-6 text-base font-medium text-neutral-500">
        As people moved from agarian society to Industrial society, individuals started to become specialised in single persuits. Same stuff everyday broke the back, while as a human they aren’t meant to do so, they kept them alive, but never let live.
        <br/><br/>
        Capitalism prioritise WANT, not NEED. <strong>Human need Wide Open Space </strong>, Boundaryless Grassfield.
        <br/><br/>
        So today we have bunch of young people, who by mind and body are depresssed, frustrated, living inside a cubicle.
        <br/><br/>
        The Trail Makers works as a gateway to see the world as it is, inspire and encourage people to solve the knots of society in their own way.
        <div className=" mx-auto pt-24 border-b-2 w-3/5 border-yellow-500"></div>
      </div>






      <div className="text-white text-7xl font-extrabold mx-4 my-20">
        <h2 className="uppercase">How Trekking can change life</h2>
      </div>

      <section className="my-20">
        <img src="/lamadugh_dog.jpg" alt="The Trail Makers" className="h-40 object-cover w-full object-[0%_70%]"></img>
        <div className="mx-4 pt-6 pb-4 flex items-center">
          <svg className="" height="16px" width="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="4" fill="rgb(251 191 36)"/>
          </svg>
          <h3 className="mx-1 font-bold text-center">Through Type II fun</h3>
        </div>
        <p className="mx-4 pr-6 text-neutral-400 leading-6"> Type two fun is activities you undertake 
            which are not fun at the time but after 
            you look back at the experience as fun. 
            These type of activities can be incredibly 
            beneficial and I have found that it has 
            benefitted me in so many ways.
        </p>
      </section>

      <section className="my-20">
        <img src="/camfire.jpg" alt="The Trail Makers" className="h-40 object-cover w-full object-[0%_50%]"></img>
        <div className="mx-4 pt-6 pb-4 flex items-center">
          <svg className="" height="16px" width="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="4" fill="rgb(251 191 36)"/>
          </svg>
          <h3 className="mx-1 font-bold text-center">Carry less, worry less, have fun</h3>
        </div>
        <p className="mx-4 pr-6 text-neutral-400 leading-6"> Type two fun is activities you undertake 
            which are not fun at the time but after 
            you look back at the experience as fun. 
            These type of activities can be incredibly 
            beneficial and I have found that it has 
            benefitted me in so many ways.
        </p>
      </section>

      <section className="my-20">
        <img src="/lamadugh_group.jpg" alt="The Trail Makers" className="h-40 object-cover w-full object-[0%_70%]"></img>
        <img src="/lamadugh_cows.jpg" alt="The Trail Makers" className="h-40 object-cover w-full object-[0%_60%]"></img>
        <div className="mx-4 pt-6 pb-4 flex items-center">
          <svg className="" height="16px" width="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="4" fill="rgb(251 191 36)"/>
          </svg>
          <h3 className="mx-1 font-bold text-left">Goals and rules are important, So are COMRADES</h3>
        </div>
        <p className="mx-4 pr-6 text-neutral-400 leading-6"> Type two fun is activities you undertake 
            Once when my life had no adventure, I 
            always thought about leaving all life, all 
            my people and all my rights and duties 
            aside just because I was attracted to 
            nature and less motivated by people. 
            But after two to three years of life 
            nurtured through traveling, hiking, 
            trekking amidst of nature, I started 
            respecting nature. And in return, I 
            learned one gem of my learnings not 
            to ignore people and how to live with 
            people with whom I have been most of 
            my life
        </p>
      </section>

      <div className=" mx-auto pt-24 border-b-2 w-3/5 border-yellow-500"></div>




      <div className="text-white text-7xl font-extrabold mx-4 my-20 text-right">
        <h2 className="uppercase">Getting ready</h2>
      </div>
      
      <section className="mx-4 mt-6 mb-32">
        <img src="/dog_deotibba.jpg" alt="The Trail Makers" className="w-2/3 my-4 rounded-tr-[50%]"></img>
        <h4 className="text-amber-600">Am I fit enough for a Trek ?</h4>
        <h3 className="uppercase text-3xl font-bold w-2/3">START YOUR JOURNEY</h3>
        <p className="mt-8 pr-10 text-neutral-400">Embarking on a mountain backpacking 
            adventure is a thrilling and rewarding 
            experience, but it demands physical 
            preparedness to tackle the challenges 
            that come with traversing rugged 
            terrains, steep ascents, and 
            unpredictable weather conditions.
        </p>
        <Link href="/Coming_Soon"><p className="font-extrabold">Read More</p></Link>
      </section>
      
      <section className="mx-4 mt-6 mb-32">
        <img src="/pano_view.jpg" alt="The Trail Makers" className="w-2/3 my-4 rounded-tr-[50%]"></img>
        <h4 className="text-amber-600">What to pack for a trek? ?</h4>
        <h3 className="uppercase text-3xl font-bold w-2/3">PACKING THE NECESSITY</h3>
        <p className="mt-8 pr-10 text-neutral-400">The most important thing is the right 
                        mindset, without that even heaven 
                        is insufficient. We follow the carry 
                        less, worry less principle but, make 
                        sure you don’t die. So we made a 
                        checklist of stuffs you will need, 
                        carry more than that we break your 
                        back
        </p>
        <Link href="/Coming_Soon"><p className="font-extrabold">Read More</p></Link>
      </section>
      
      <section className="mx-4 mt-6 mb-32">
        <img src="/river_crossing.jpg" alt="The Trail Makers" className="w-2/3 my-4 rounded-tr-[50%]"></img>
        <h4 className="text-amber-600">What is the best season for tekking?</h4>
        <h3 className="uppercase text-3xl font-bold w-2/3">UNDERSTANDING SEASONS IN 
        TREKKING</h3>
        <p className="mt-8 pr-10 text-neutral-400">If you don’t want to miss your train 
          by getting stuck in a landslide, or 
          shiver all night in the month of May, 
          thinking it wont be that cold, read 
          this. we made an deeper 
          understanding of climates in 
          different parts of Himalayas and the 
          hurdles of different seasons. Even of 
          summer.
        </p>
        <Link href="/Coming_Soon"><p className="font-extrabold">Read More</p></Link>
      </section>





  

      <div className="h-96"></div>
    </main>
  );
}


