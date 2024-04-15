"use client"

import Image from "next/image";
import useStore from "@/store/store";
import Homecards from "@/components/homecards";
import mockdata from "@/data/homepage_cards.json";



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
    <main className="min-h-screen bg-black">
      <Image alt="trail running to lamadugh" width={0} height={0} sizes="100vw" style={{width: '100%',height: 'auto' }} src="/Ranisui_manali_speedhike_The_Trail_Makers.jpg" className="relative"></Image>
      <div className="-rotate-12 pl-2 pt-52 absolute top-96">
        <img src="/ttm image.png" alt="ttm image" className="h-60 mx-auto"></img>
      </div>
      <div className="h-60"></div>
      <h3 className="font-bold text-yellow-500 text-3xl uppercase ml-8">Upcoming<br/>Treks...</h3>
      <div className="flex overflow-x-auto snap-x bg-black">
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
        <div className=" mx-auto pt-24 border-b-2 w-3/4 border-yellow-500"></div>
      </div>

      <div className="text-white text-7xl font-extrabold mx-4 my-20">
        <h2 className="uppercase">How Trekking can change life</h2>
      </div>

      <div className="h-96"></div>
    </main>
  );
}


