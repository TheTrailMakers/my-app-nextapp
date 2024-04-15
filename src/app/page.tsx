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
      <Image alt="trail running to lamadugh" width={0} height={0} sizes="100vw" style={{width: '100%',height: 'auto' }} src="/Ranisui_manali_speedhike_The_Trail_Makers.jpg"></Image>
      <div className="h-40"></div>
      <h1 className="font-bold text-white text-center h-96"> Hello World</h1>
      <h3 className="font-bold text-yellow-500 text-3xl uppercase ml-8">Upcoming<br/>Treks...</h3>
      <div className="flex overflow-x-auto no-scrollbar snap-x bg-black">
        <Homecards {...mockdata[0]}/>
        <Homecards {...mockdata[1]}/>
        <Homecards {...mockdata[2]}/>
        <Homecards {...mockdata[3]}/>
      </div>
    </main>
  );
}


