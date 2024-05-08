"use client"

import Image from "next/image";
import useStore from "@/store/store";
import Accordion from "@/components/accordion";
import mockdata from "@/data/homepage_cards.json";
import Link from "next/link";


import Scrollables from "@/components/scrollables";
import TrekCard from "@/components/homecards";


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

      <Image src="https://res.cloudinary.com/thetrail/image/upload/ar_3:4,c_auto/v1713186783/Ranisui_manali_speedhike.jpg" 
      alt="trail running to lamadugh"
      width={3}
      height={4}
      layout="responsive"
      priority={true}
      className="w-full lg:max-h-screen lg:object-cover lg:relative lg:object-[0%_90%]">
      </Image>

      <div className="lg:absolute lg:bottom-10 text-[5vw] pt-16 pb-10 px-[25vw] font-mono text-center font-bold leading-tight">
        A Life With Nature, Is A Life Well Lived.
      </div>

      <div className=" m-6 pt-10 pr-6 mb-20 text-base font-medium text-neutral-500 
                        md:w-[50vw] md:m-auto md:pl-8 md:mb-20
                         lg:text-lg">
        As people moved from agarian society to Industrial society, individuals started to become specialised in single persuits. Same stuff everyday broke the back, while as a human they aren’t meant to do so, they kept them alive, but never let live.
        <br/><br/>
        Capitalism prioritise WANT, not NEED. <strong>Human need Wide Open Space </strong>, Boundaryless Grassfield.
        <br/><br/>
        So today we have bunch of young people, who by mind and body are depresssed, frustrated, living inside a cubicle.
        <br/><br/>
        The Trail Makers works as a gateway to see the world as it is, inspire and encourage people to solve the knots of society in their own way.
      </div>

           

      <h3 className="font-bold text-yellow-500 text-3xl below-xs:text-[10vw] uppercase ml-8">Upcoming<br/>Treks...</h3>
        <div className="flex overflow-x-auto snap-x snap-mandatory bg-black no-scrollbar">
          <TrekCard {...mockdata[0]}/>
          <TrekCard {...mockdata[1]}/>
          <TrekCard {...mockdata[2]}/>
          <TrekCard {...mockdata[3]}/>
        </div>

        <div className=" mx-auto pt-24 border-b-2 w-3/5 border-yellow-500"></div>



{/* /////////////////////////////How Trekking can Change Life////////////////////////////////////////////////////////////////////////////////////////////////////// */}


      
      <div className="text-7xl text-ellipsis overflow-hidden textover below-xs:text-[10vw] font-extrabold px-4 my-20 md:text-center md:mx-[10%]">
        <h2 className="uppercase">How Trekking can change life</h2>
      </div>

<div className="md:mx-[20vw] lg:mx-[25vw] xl:mx-[30vw]">

      <section className="my-20">
        <Image src="https://res.cloudinary.com/thetrail/image/upload/ar_2:1,c_auto,h_320/v1715052583/Ranisui-Lake-Trek/lamadugh_dog_chhotapathhar.jpg" 
        alt="The Trail Makers"
        width={250}
        height={400}
        sizes="(max-width: 768px) 400px, 800px" 
        className="h-40 object-cover w-full object-[0%_70%]"></Image>
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
        <Image src="https://res.cloudinary.com/thetrail/image/upload/ar_2:1,c_auto,h_320/v1715052618/Downloaded/camfire.jpg" 
        alt="The Trail Makers"
        width={250}
        height={400} 
        sizes="(max-width: 768px) 400px, 800px" 
        className="h-40 object-cover w-full object-[0%_50%]"></Image>
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

        <Image src="https://res.cloudinary.com/thetrail/image/upload/ar_2:1,c_auto,h_320/v1715052575/Ranisui-Lake-Trek/lamadugh_cows.jpg" 
        alt="The Trail Makers" 
        width={250}
        height={400}
        sizes="(max-width: 768px) 400px, 800px" 
        className="object-cover w-full object-[0%_60%]"></Image>
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

  

{/* /////////////////////////////Getting Ready////////////////////////////////////////////////////////////////////////////////////////////////// */}



      <div className="text-7xl below-xs:text-4xl font-extrabold mx-4 my-20 text-right md:text-center md:mx-[20%]">
        <h2 className="uppercase">Getting ready</h2>
      </div>

<div className=" pl-4 lg:px-[calc((100vw-1024px)/2)] lg:my-24 lg:grid lg:grid-cols-3">
      
      <section className="mx-auto mt-6 mb-32 lg:m-0 max-w-96">
        <Image 
        src= "https://res.cloudinary.com/thetrail/image/upload/ar_3:4,c_auto,w_300/v1714969427/Ranisui-Lake-Trek/dog_deotibba.jpg" 
        alt="Dog on grassy slope, Mountain peaks like deo tibba, Indrasan in background" 
        sizes="(max-width: 768px) 300px, 400px" 
        width= {240}
        height= {320} 
        className="max-w-60  below-xs:max-w-40 my-4 object-cover rounded-tr-[50%]">
        </Image>

        <h4 className="text-amber-600">Am I fit enough for a Trek ?</h4>
        <h3 className="uppercase text-3xl font-bold w-2/3">START YOUR JOURNEY</h3>
        <p className="mt-8 pr-10 text-neutral-400 max-w-[350px]">Embarking on a mountain backpacking 
            adventure is a thrilling and rewarding 
            experience, but it demands physical 
            preparedness to tackle the challenges 
            that come with traversing rugged 
            terrains, steep ascents, and 
            unpredictable weather conditions.
        </p>
        <Link href="/contact"><p className="font-extrabold">Read More</p></Link>
      </section>
      
      <section className="mx-auto mt-6 mb-32 lg:m-0  max-w-96">
      <Image 
        src= "https://res.cloudinary.com/thetrail/image/upload/ar_3:4,c_auto,w_300/v1714969858/Ranisui-Lake-Trek/pano_view_KhanpariTibba.jpg" 
        alt="Watching Indrasan, Deo Tibba from the graddy top of Khanpari Tibba ." 
        sizes="(max-width: 768px) 250px, 400px" 
        width= {240}
        height= {320} 
        className="max-w-60 below-xs:max-w-40 my-4 object-cover rounded-tr-[50%]">
        </Image>

        <h4 className="text-amber-600">What to pack for a trek? ?</h4>
        <h3 className="uppercase text-3xl font-bold w-2/3">PACKING THE NECESSITY</h3>
        <p className="mt-8 pr-10 text-neutral-400 max-w-[350px]">The most important thing is the right 
                        mindset, without that even heaven 
                        is insufficient. We follow the carry 
                        less, worry less principle but, make 
                        sure you don’t die. So we made a 
                        checklist of stuffs you will need, 
                        carry more than that we break your 
                        back
        </p>
        <Link href="/contact"><p className="font-extrabold">Read More</p></Link>
      </section>
      
      <section className="mx-auto mt-6 mb-32 lg:m-0 max-w-96">
      <Image 
        src= "https://res.cloudinary.com/thetrail/image/upload/ar_3:4,c_auto,w_300/v1714970051/Bhrigu-Lake-Trek/river_crossing_BhriguLake-Jogini.jpg" 
        alt="River Crossing in Rain over a Log Bridge." 
        sizes="(max-width: 768px) 250px, 400px" 
        width= {240}
        height= {320} 
        className="max-w-60 below-xs:max-w-40 my-4 object-cover rounded-tr-[50%]">
        </Image>

        <h4 className="text-amber-600">What is the best season for tekking?</h4>
        <h3 className="uppercase text-3xl below-xs:text-[10vw] font-bold w-2/3">UNDERSTANDING SEASONS IN TREKKING</h3>
        <p className="mt-8 pr-10 text-neutral-400 max-w-[350px]">If you don’t want to miss your train 
          by getting stuck in a landslide, or 
          shiver all night in the month of May, 
          thinking it wont be that cold, read 
          this. we made an deeper 
          understanding of climates in 
          different parts of Himalayas and the 
          hurdles of different seasons. Even of 
          summer.
        </p>
        <Link href="/contact"><p className="font-extrabold">Read More</p></Link>
      </section>

</div>


{/* //////////////////////////////////////////////Faq Section///////////////////////////////////////////////////////////////////////////////////////////// */}


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
      <div className="ml-4 text-4xl below-xs:text-[10vw] font-bold">SUMMER Plans</div>
      <div className="flex overflow-x-auto snap-x snap-mandatory bg-black no-scrollbar">
        {mockdata.map((trek) => trek.tag.includes('summer-trek')? <Scrollables {...trek} key={trek.Index}/>:null)}
      </div>
  </div>

  <div className="mb-16">
      <div className="ml-8 text-4xl below-xs:text-[10vw] font-bold">CAMPS</div>
      <div className="flex overflow-x-auto snap-x snap-mandatory bg-black no-scrollbar">
          {mockdata.map((trek) => trek.tag.includes('camp')? <Scrollables {...trek} key={trek.Index}/>:null)}    
      </div>
  </div>
  
  <div className="mb-16">
      <div className="ml-4 text-4xl below-xs:text-[10vw] font-bold">Weekend Plans</div>
      <div className="flex overflow-x-auto snap-x snap-mandatory bg-black no-scrollbar">
        {mockdata.map((trek) => trek.tag.includes('weekend-plan')? <Scrollables {...trek} key={trek.Index}/>:null)}
      </div>
  </div>

  <div className="mb-16">
      <div className="ml-4 text-4xl below-xs:text-[10vw] font-bold">NEW Routes</div>
      <div className="flex overflow-x-auto snap-x snap-mandatory bg-black no-scrollbar">
        {mockdata.map((trek) => trek.tag.includes('new-route')? <Scrollables {...trek} key={trek.Index}/>:null)}
      </div>
  </div>

  <div className="mb-16">
      <div className="ml-4 text-4xl below-xs:text-[10vw] font-bold">Upcoming <br/>EXPLORATION</div>
      <div className="flex overflow-x-auto snap-x snap-mandatory bg-black no-scrollbar">
        {mockdata.map((trek) => trek.tag.includes('upcoming-exploration')? <Scrollables {...trek} key={trek.Index}/>:null)}    
      </div>
  </div>

</div>



      
</main>
  );
}


