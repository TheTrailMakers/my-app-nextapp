"use client"

import Image from "next/image";
import useStore from "@/store/store";
import Homecards from "@/components/homecards";
import Accordion from "@/components/accordion";
import mockdata from "@/data/homepage_cards.json";
import Link from "next/link";

import heroImage from "../../public/Ranisui_manali_speedhike_The_Trail_Makers.jpg"
import ttmHeader from "../../public/ttm image.png"
import lamadughDogImg from "../../public/lamadugh_dog.jpg"
import campfireImg from "../../public/camfire.jpg"
import lamadughGroupImg from "../../public/lamadugh_groupPhoto.jpg"
import lamadughCowsImg from "../../public/lamadugh_cows.jpg"
import deotibbaDogImg from "../../public/dog_deotibba.jpg"
import panoviewImg from "../../public/pano_view.jpg"
import bhriguRiverCrossingImg from "../../public/river_crossing.jpg"
import Scrollables from "@/components/scrollables";


interface Trek {
  Index: number;
  Name: string;
  State: string;
  Description: string;
  Distance: string;
  Duration: string;
  Difficulty: string;
  Cost: string;
  Info: string;
  Link: string;
}


export default function Home() {

const {hamburgerOpen} = useStore((state:any) => {
  return {hamburgerOpen: state.hamburgerOpen}
})

  return (
    <main className="min-h-screen bg-black text-white no-scrollbar">

        <Image src={heroImage} alt="trail running to lamadugh" sizes="(max-width: 768px) 250px, 80vw" priority placeholder="blur"></Image>

      <div className="text-[5vw] pt-16 pb-10 px-[25vw] font-mono text-center font-bold leading-tight">
        A Different way to live life, with Nature.
      </div>

      <div className=" m-6 pt-10 pr-6 mb-20 text-base font-medium text-neutral-500 
                        md:w-[50vw] md:m-auto md:pl-8 md:mb-20
                        lg:w-[35vw]">
        As people moved from agarian society to Industrial society, individuals started to become specialised in single persuits. Same stuff everyday broke the back, while as a human they aren’t meant to do so, they kept them alive, but never let live.
        <br/><br/>
        Capitalism prioritise WANT, not NEED. <strong>Human need Wide Open Space </strong>, Boundaryless Grassfield.
        <br/><br/>
        So today we have bunch of young people, who by mind and body are depresssed, frustrated, living inside a cubicle.
        <br/><br/>
        The Trail Makers works as a gateway to see the world as it is, inspire and encourage people to solve the knots of society in their own way.
      </div>

           

      <h3 className="font-bold text-yellow-500 text-3xl uppercase ml-8">Upcoming<br/>Treks...</h3>
        <div className="flex overflow-x-auto snap-x snap-mandatory bg-black no-scrollbar">
          <Homecards {...mockdata[0]}/>
          <Homecards {...mockdata[1]}/>
          <Homecards {...mockdata[2]}/>
          <Homecards {...mockdata[3]}/>
        </div>

        <div className=" mx-auto pt-24 border-b-2 w-3/5 border-yellow-500"></div>



{/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}


      
      <div className="text-7xl font-extrabold mx-4 my-20 md:text-center md:mx-[10%]">
        <h2 className="uppercase">How Trekking can change life</h2>
      </div>

<div className="md:mx-[20vw] lg:mx-[25vw] xl:mx-[30vw]">

      <section className="my-20">
        <Image src={lamadughDogImg} alt="The Trail Makers" sizes="(max-width: 768px) 250px, 800px" className="h-40 object-cover w-full object-[0%_70%]" placeholder="blur"></Image>
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
        <Image src={campfireImg} alt="The Trail Makers" sizes="(max-width: 768px) 250px, 800px" className="h-40 object-cover w-full object-[0%_50%]" placeholder="blur"></Image>
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
        <Image src={lamadughCowsImg} alt="The Trail Makers" sizes="(max-width: 768px) 250px, 800px" style={{width: '100%',height: '160px' }} className="object-cover w-full object-[0%_60%]" placeholder="blur"></Image>
        {/* <Image src={lamadughGroupImg} alt="The Trail Makers" sizes="(max-width: 768px) 250px, 800px" style={{width: '100%',height: '160px' }} className="object-cover w-full object-[0%_70%]" placeholder="blur"></Image> */}
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
</div>
      <div className=" mx-auto pt-24 border-b-2 w-3/5 border-yellow-500"></div>

  

{/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}



      <div className="text-7xl font-extrabold mx-4 my-20 text-right md:text-center md:mx-[10%]">
        <h2 className="uppercase">Getting ready</h2>
      </div>

<div className="md:mx-[20%]">
      
      <section className="mx-4 mt-6 mb-32">
        <Image src={deotibbaDogImg} alt="The Trail Makers" sizes="(max-width: 768px) 250px, 800px" style={{width: '60%',height: 'auto' }} className="my-4 rounded-tr-[50%]" placeholder="blur"></Image>
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
        <Image src={panoviewImg} alt="The Trail Makers" sizes="(max-width: 768px) 250px, 800px" style={{width: '60%',height: 'auto' }} className="my-4 rounded-tr-[50%]" placeholder="blur"></Image>
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
        <Image src={bhriguRiverCrossingImg} alt="The Trail Makers" sizes="(max-width: 768px) 250px, 800px" style={{width: '60%',height: 'auto' }} className="my-4 rounded-tr-[50%]" placeholder="blur"></Image>
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

</div>


{/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}


<div className="md:mx-auto md:max-w-[500px]">
      <div className="bg-amber-950 ">
        <div className="text-right pr-8 pt-8">
          <h3 className="uppercase text-6xl font-bold"> faq</h3>
          <h5 className="font-semibold">Learn More About Mountains</h5>
        </div>

        <section className="mx-8 mt-8 mb-16">
          <h5 className="text-2xl font-bold mb-4">About Me</h5>
          <Accordion question="Am I fit enough for trekking?" answer="My answer"/>
          <Accordion question="I feel old, can I trek?" answer="My answer"/>
          <Accordion question="Can I trek with Kids?" answer="My answer"/>
          <div className=" mx-auto mt-12 border-b-2 w-3/5 border-yellow-500"></div>
        </section>

        <section className="mx-8 mt-8 mb-16">
          <h5 className="text-2xl font-bold mb-4">My Gears</h5>
          <Accordion question="Am I fit enough for trekking?" answer="My answer"/>
          <Accordion question="I feel old, can I trek?" answer="My answer"/>
          <Accordion question="Can I trek with Kids?" answer="My answer"/>
          <div className=" mx-auto mt-12 border-b-2 w-3/5 border-yellow-500"></div>
        </section>

        <section className="mx-8 mt-8 mb-16">
          <h5 className="text-2xl font-bold mb-4">About Treks</h5>
          <Accordion question="Am I fit enough for trekking?" answer="My answer"/>
          <Accordion question="I feel old, can I trek?" answer="My answer"/>
          <Accordion question="Can I trek with Kids?" answer="My answer"/>
          <div className=" mx-auto mt-12 border-b-2 w-3/5 border-yellow-500"></div>
        </section>
        <div className="h-24"></div>
      </div>
</div>



{/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}



<div className="mt-16 md:mx-auto pb-24">
  <div className="mb-16">
      <div className="ml-4 text-4xl font-bold">SUMMER Plans</div>
      <div className="flex overflow-x-auto snap-x snap-mandatory bg-black no-scrollbar">
        {mockdata.map((trek) => trek.tag.includes('summer-trek')? <Scrollables {...trek} key={trek.Index}/>:null)}
      </div>
  </div>

  <div className="mb-16">
      <div className="ml-8 text-4xl font-bold">CAMPS</div>
      <div className="flex overflow-x-auto snap-x snap-mandatory bg-black no-scrollbar">
          {mockdata.map((trek) => trek.tag.includes('camp')? <Scrollables {...trek} key={trek.Index}/>:null)}    
      </div>
  </div>
  
  <div className="mb-16">
      <div className="ml-4 text-4xl font-bold">Weekend Plans</div>
      <div className="flex overflow-x-auto snap-x snap-mandatory bg-black no-scrollbar">
        {mockdata.map((trek) => trek.tag.includes('weekend-plan')? <Scrollables {...trek} key={trek.Index}/>:null)}
      </div>
  </div>

  <div className="mb-16">
      <div className="ml-4 text-4xl font-bold">NEW Routes</div>
      <div className="flex overflow-x-auto snap-x snap-mandatory bg-black no-scrollbar">
        {mockdata.map((trek) => trek.tag.includes('new-route')? <Scrollables {...trek} key={trek.Index}/>:null)}
      </div>
  </div>

  <div className="mb-16">
      <div className="ml-4 text-4xl font-bold">Upcoming <br/>EXPLORATION</div>
      <div className="flex overflow-x-auto snap-x snap-mandatory bg-black no-scrollbar">
        {mockdata.map((trek) => trek.tag.includes('upcoming-exploration')? <Scrollables {...trek} key={trek.Index}/>:null)}    
      </div>
  </div>

</div>



      
</main>
  );
}


