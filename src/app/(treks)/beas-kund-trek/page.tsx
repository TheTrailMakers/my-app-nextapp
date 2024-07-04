import React from 'react'
import Image from 'next/image'
import Accordion from '@/components/accordion'
import Article from '@/components/article'
import articleData from '@/data/articles.json'
import mockdata from '@/data/homepage_cards.json'
import JoinDate from '@/components/joinDate'
import GalleryImage from '@/components/galleryImage'
import Link from 'next/link'

import { GiDuration } from "react-icons/gi";
import { MdOutlineNetworkCell } from "react-icons/md";
import { GiMountaintop } from "react-icons/gi";
import { FaThinkPeaks } from "react-icons/fa";
import { GiPathDistance } from "react-icons/gi";

import { FaRupeeSign } from "react-icons/fa";
import { MdAddHomeWork } from "react-icons/md";
import { FaCarOn } from "react-icons/fa6";

import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";

import { GiTreasureMap } from "react-icons/gi";

import { GiSummits } from "react-icons/gi";

import { MdAltRoute } from "react-icons/md";
import { FaCircle } from "react-icons/fa";

import { GiBackpack } from "react-icons/gi";

import { GiCardRandom } from "react-icons/gi";

import { RiNewspaperFill } from "react-icons/ri";



import Scrollables from '@/components/scrollables'






export const metadata = {
  title: "Beas Kund Trek 2024 - Easiest High Altitude Trek in Himachal(12,700ft) | The Trail Makers",
  description: "Experience the awe-inspiring beauty of the Beas Kund Trek, set amidst the majestic Himalayas. This moderate trek unfolds panoramic vistas of snow-capped peaks, pristine glacial lakes, and verdant meadows. Whether you're a novice or an experienced trekker, Beas Kund Trek promises a soul-rejuvenating journey immersed in the tranquility of nature's grandeur. Discover this hidden gem for an unforgettable adventure in Himachal Pradesh.",
  keywords: "Beas kund Trek, Himachal Pradesh trekking, The Trail Makers, Himalayan treks, adventure travel, Manali, Hike, hiking in India, trekking expeditions, Trekking in Manali, scenic landscapes, outdoor adventures, Ledy Leg, Bakkar Thach, Dhundi, solang, Hanuman Tibba, Lohali Thach, Palchani Thach, Beas Kund Glacier"
};

function page() {

  return (
    <main className="min-h-screen bg-neutral-900 pattern-topography-amber-700/50 text-white no-scrollbar relative">

      <div className='bg-gradient-to-b from-black to-50% to-white h-[80vh] relative'>

        <Image src="https://res.cloudinary.com/thetrail/image/upload/v1719835688/Beas-Kund-Trek/beas_kund_banner.jpg"
        className='object-cover object-[0%,90%] w-full md:object-  mix-blend-multiply absolute'
        style={{ width: "100%", height: "80vh"}}
        height={400}
        width={800} 
        sizes="(max-width: 768px) 80vw, 100vw"
        alt="Beas Kund with Hanuman Tibba"></Image>

        <div className='absolute p-16 flex flex-col justify-center items-center w-full '>
          <h1 className='text-[20vw] md:text-[15vw] leading-[1] lg:text-[10rem] xl:px-40
           text-center font-bold uppercase'>Beas Kund Trek</h1>
        </div>
      </div>


{/* ////////////////////////////////////////Trek Data////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

    <section className='bg-black flex flex-wrap justify-center items-center gap-2 p-4 lg:p-8 lg:gap-6'>
      <div className='flex flex-col justify-center items-center p-2'>
        <GiDuration className='size-8 my-1 lg:size-12'/>
        <p className='font-semibold lg:text-lg'>4 Days</p>
        <h3 className='font-extralight text-lg lg:text-xl leading-5'>Duration</h3>
      </div>

      <div className='flex flex-col justify-center items-center p-2'>
        <MdOutlineNetworkCell className='size-8 my-1 lg:size-12'/>
        <p className='font-semibold lg:text-lg'>Easy</p>
        <h3 className='font-extralight text-lg lg:text-xl leading-5'>Difficulty</h3>
      </div>
      
      <div className='flex flex-col justify-center items-center p-2'>
        <GiMountaintop className='size-8 my-1 lg:size-12'/>
        <p className='font-semibold lg:text-lg'>Manali</p>
        <h3 className='font-extralight text-lg lg:text-xl leading-5'>Starting Point</h3>
      </div>
      
      <div className='flex flex-col justify-center items-center p-2'>
        <FaThinkPeaks className='size-8 my-1 lg:size-12'/>
        <p className='font-semibold lg:text-lg'>12,700ft</p>
        <h3 className='font-extralight text-lg lg:text-xl leading-5'>Highest Elevation</h3>
      </div>
      
      <div className='flex flex-col justify-center items-center p-2'>
        <GiPathDistance className='size-8 my-1 lg:size-12'/>
        <p className='font-semibold lg:text-lg'>15km</p>
        <h3 className='font-extralight text-lg lg:text-xl leading-5'>Trail Length</h3>
      </div>

    </section>


{/* ////////////////////////////////////////Short Intro////////////////////////////////////////////////////////////////////////////////////////// */}

      <section className='bg-zinc-950 md:px-[calc((100vw-600px)/2)]'>

        <h2 className='text-3xl font-semibold p-6 pr-12 pb-0 max-w-[400px] lg:text-5xl md:max-w-none'>
          Discover Beas Kund Trek: A Beginner&apos;s Alpine Adventure Worth Exploring!
        </h2>

        <div className='py-8 pl-6 max-w-[95%] pr-0 leading-8 text-stone-300  font-light'>
            <p>
            Nestled among the towering giants of the mighty Himalayas, the 
            Beas Kund Trek unveils a hidden valley brimming with vibrant flora 
            and fauna. This fertile land, shaped by the meandering River Beas, 
            offers a picturesque setting for an unforgettable adventure. As 
            you journey along the trail, the river playfully hides like a shy 
            little girl, guiding you through narrow valleys reminiscent of 
            bustling city streets lined with high rises.
            </p><br/>

            <p>
            The route to Beas Kund, though cocooned within formidable mountain walls, 
            is surprisingly accessible. Starting from Dhundi, you&apos;ll follow the river 
            for two days, immersing yourself in the serene beauty of the landscape. 
            The River Beas, a lifeline for many towns in Himachal Pradesh, holds 
            immense cultural, religious, and mythological significance.
            </p><br/>
            
            <p>
            This trek not only offers a glimpse into the pristine natural beauty of the region 
            but also connects you to the rich heritage of the area. Whether you&apos;re a 
            seasoned hiker or a novice adventurer, the Beas Kund Trek promises a 
            journey filled with awe and wonder, making it an essential experience 
            for any nature lover.
            </p>
          
          </div>
      </section>


{/* ///////////////////////////////////////Join The Team/////////////////////////////////////////////////////////////////////////// */}

      <section className='md:px-[calc((100vw-600px)/2)]'>
        <h3 className='text-5xl uppercase font-bold m-8'>Join The Team</h3>
        <div className='m-8 my-12'>
          <div className='text-3xl max-w-[80%] font-light'>Trek Cost with The Trail Makers</div>
          <div className='flex flex-col bg-gradient-to-r from-red-500 from-10% via-black via-60% to-white to-100%
                          rounded-2xl p-2 py-6 my-12 gap-4'>

            <div className='flex justify-normal items-center gap-2'>
              <FaRupeeSign className='inline size-12 text-yellow-500'/>
              <div className='text-5xl font-bold max-w-60 text-yellow-500'>7,500/-</div>
            </div>

            <div className='flex justify-normal items-center gap-2'>
              <MdAddHomeWork className='inline size-12 text-sky-400'/>
              <div className='text-xl max-w-60 text-sky-500 font-light'> Stay & Fooding at Manali Included</div>
            </div>

            <div className='flex justify-normal items-center gap-2'>
              <FaCarOn className='inline size-12 text-white'/>
              <div className='text-xl max-w-60 text-sky-500 font-light'> Manali to Manali Transport Included</div>
            </div>
            
          </div>
        </div>
        <div className='flex pl-6 items-center overflow-x-auto
          snap-x snap-mandatory no-scrollbar'>
          {mockdata.map((treks) => 
            treks.Name.includes('Beas Kund Trek')?
              (treks.Date.map((dates) => 
                <JoinDate date={dates} key={dates}/>)) : null)}
        </div>
        <div className='m-8 text-sm'>
        <span className='font-bold'>To Create Your Own Group.</span>
        <span className='text-yellow-500 font-bold'> Click Here.</span>
        <div>Join on any date with your friends.</div>
        </div>
        </section>
  

{/* ///////////////////////////////////////Brief Itinerray////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <section className='flex flex-col rounded-3xl bg-white text-black m-4 my-24 md:mx-[calc((100vw-600px)/2)]'>
        <h3 className='text-5xl font-bold uppercase m-4 mb-0 max-w-[50%]'>Brief Itinerary</h3>
        <div className='m-4 font-mono md:text-lg font-semibold'>
          <ul>
            <li className='my-4 pl-0'>
              <div>Day1 : Manali [Introduction]</div>
              <div className='text-sky-700'>Distance : Nil</div>
              <div className='text-sky-700'>Duration : Nil</div>
            </li>
            <li className='my-4 pl-0'>
              <div>Day2 : Manali - Dhundi - Bakkar Thach</div>
              <div className='text-sky-700'>Distance : 4.5km</div>
              <div className='text-sky-700'>Duration : 3-5hrs</div>
            </li>
            <li className='p-1 pl-0'>
              <div>Day3 : Bakkar Thach - Beas Kund - Bakkar Thach</div>
              <div className='text-sky-700'>Distance : 6km</div>
              <div className='text-sky-700'>Duration : 7-8hrs</div>
            </li>
            <li className='p-1 pl-0'>
              <div>Day4 : Bakkar Thach - Manali</div>
              <div className='text-sky-700'>Distance : 4.5km</div>
              <div className='text-sky-700'>Duration : 2-3hrs</div>
            </li>
          </ul>
        </div>
        
      </section>


{/* ////////////////////////////////////////Image Gallery//////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <section> 
        <div className="p-4 my-24 flex overflow-x-auto snap-x snap-mandatory no-scrollbar">
          {mockdata.map((treks) => <GalleryImage {...treks} key={treks.Index} />)}
        </div>
      </section>


{/* ///////////////////////////////////////Trek In Details/////////////////////////////////////////////////////////////////////////////////////// */}


      <section className='bg-white text-neutral-800 font-poppins font-normal lg:text-lg md:px-[calc((100vw-600px)/2)]'>
        <h3 className='text-orange-800 pattern-autumn-rain-amber-500/50 text-4xl font-extrabold  px-10 py-20 text-center uppercase'>
          Each Day of Beas Kund Trek in Details
        </h3>

        <div className='flex justify-between items-start'>

          <div className='flex flex-row gap-2'>
            <div className='bg-yellow-500 w-3 rounded-e-full h-auto '></div>
            <div className='flex flex-col justify-between items-start py-2'>
              <h4 className='text-5xl font-extrabold'>Day 1</h4>
              <div className='text-xl font-normal p-1 pt-2'> Arrival At Manali</div>
            </div>
          </div>

          <div className='font-medium p-4 pr-2 text-right text bg-neutral-800 shadow-slate-800 shadow-2xl text-white rounded-s-3xl'>
            <div>6500ft <FaThinkPeaks className='inline ml-2 size-8' /></div>
            <div>NIL <GiPathDistance className='inline ml-2 size-8' /></div>
            <div>NIL <GiDuration className='inline ml-2 size-8' /></div>
          </div>
        </div>

          <Image  src="https://res.cloudinary.com/thetrail/image/upload/ar_3:2,c_auto,h_320/v1715146119/PahadiManzil-Manali-Basecamp.jpg"
              height={250}
              width={400}
              alt="The Trail Makers" 
              sizes="(max-width: 768px) 400px, 800px" 
              className="object-cover w-full my-12">
          </Image>

          <div className='leading-7 text-base font-medium mx-4 text-neutral-700'>


            <p>
            As you reach our homestay in Manali in the morning, 
            you will be greeted with welcome drinks and a delicious breakfast. Once all team members have checked 
            in, we will embark on an easy hike in the nearby forest. This initial trek is designed to test everyone's 
            physical fitness, helping you acclimate to the mountain environment and kick-start the acclimatization process.
            </p><br/>

            <p>
            After returning from the morning hike, you can 
            freshen up and enjoy a hearty lunch. Following lunch, we will have a discussion session with 
            our trek leader and guides to ensure our shopping list is complete and nothing essential is 
            overlooked. Afterward, we will visit Mall Road for shopping, ATM visits, and perhaps a stop 
            at some local cafes.
            </p><br />

            <p>Don&apos;t forget to check out our handy guides:</p><br/>
            
            <ul className='list-disc ml-6'>
            <li><Link href={"/contact"} className='text-sky-500'>Where to snag adventure gear in Manali?</Link></li>
            <li><Link href={"/contact"} className='text-sky-500'>Cool spots to explore in Manali on foot</Link></li>
            </ul><br/>

            <p>
            We will return to the homestay by 7 PM for a comprehensive briefing and introduction session. 
            This session will cover essential topics such as mountain manners, the importance of time management, 
            understanding the route, rucksack packing, hygiene, and medical considerations.
            </p><br/>
          </div>

        <div className='h-2 my-8 bg-black'></div>
  </section>
  



{/* ////////////////////////////////////// Peaks from Beas Kund Trek///////////////////////////////////////////////////////////////////////////////////////////////////// */}
    

<section className='bg-slate-200  py-20 text-cyan-950 md:px-[calc((100vw-600px)/2)]'>

        <div className='flex px-8 '>
          <GiSummits className='text-sky-950 size-20 shrink-0'/>
          <h3 className='text-5xl text-right font-extrabold uppercase'>
            Peaks from Bhrigu Lake Trek
          </h3>
        </div>
        
        <div className='p-4 mr-6'>
          <p className='py-2'>Both the Raulikholi campsite and the Bhrigu Lake have a 
            commanding view on <strong>Dhauladhar and Pirpanjal Range.</strong></p>
          <p className='py-2 font-semibold'>Here is a List of Peaks seen on the Trek, Climbed or Unclimbed.</p>
          <ol className='p-4 ml-4 list-decimal '>
            <li>Friendship Peak (5289m)</li>
            <li>Shitidhar Peak (5294m)</li>
            <li>Manali Peak (5669m)</li>
            <li>Ladakhi Peak (5345m)</li>
            <li>Shikhar Beh (6200m)</li>
            <li>hanuman Tibba (5860m)</li>
            <li>Patalsu Peak (4230m)</li>
            <li>Goh Kincha (5110m)</li>
            <li>Kulkangri Peak (5160m)</li>
            <li>khanpari Tibba (4025m)</li>
          </ol>
          <p className='my-8'>There are many other unnamed peaks in these two ranges, 
            many of them are unclimbed, or climbed but never documented. 
            Hope some of you will be there and Write that down on History</p>
        </div>

    </section>

    <div className='pb-2 bg-gradient-to-b from-black to-transparent'></div>
<div className='p-4 h-2 bg-gradient-to-t from-black to-transparent'></div>
{/* ////////////////////////////////////// Alternate Route Bhrigu Lake Trek///////////////////////////////////////////////////////////////////////////////////////////////////// */}
    

<section className='bg-emerald-900 py-20 md:px-[calc((100vw-600px)/2)]'>
        <div className='flex px-8 items-center'>
          <MdAltRoute className='text-amber-500 size-24 shrink-0'/>
          <h3 className='text-3xl text-right font-extrabold uppercase'>
            Alternate Routes to Bhrigu Lake
          </h3>
        </div>
        
        <div className='p-4 mr-6 text-neutral-300'>

          <p className='py-2 text-yellow-400'>There is practically only <strong>two other routes</strong> to Bhrigu Lake. One of them is commonly visited by 
          trekkers, while the other one is the Path Less Taken.</p>

          <div className='mt-8'>
            <div className='flex items-center'>
              <FaCircle className='size-3 mr-2 text-yellow-500 '/>
              <h5 className='text-xl font-semibold'>Path 1</h5>
            </div>
            <h6 className='text-lg font-extralight'>Kulang-Moridugh-Kulang</h6>
            <p className='mt-4 '>Kulang to Moridugh is also an altrenate good route, the route starts from a seemingly 
              unnoticable village of Kulang, a few km before the Solang Valley. The first 1km of the 
              trek is quite steep, and also little muddy. You will probably find a Dhaba run by local 
              aunties at the end of the steep section. After the fist 1km, the route is totally flat 
              to the Moridugh campsite. Criss-crossing through pine forest, over 4-5 streams. One of 
              streams, the last one, is source to the Jogini Waterfall. After this last stream, the 
              campsite takes less than 30mins to walk.</p>

            <p className='mt-4'> From Moridugh, the trail to Bhrigu Lake is little longer, but this one become accessible 
              from start of May, before the Gulaba-Raulikholi Route.
            </p>
          </div>
          
          <div className='mt-16'>
          <div className='flex items-center'>
              <FaCircle className='size-3 mr-2 text-yellow-500 '/>
              <h5 className='text-xl font-semibold'>Path 2</h5>
            </div>
            <h6 className='text-lg font-extralight'>Vashisht-Moridugh-Vashisht</h6>
            <p className='mt-4'>Almost the same Route, only difference is the first Day. Vashisht to Moridugh, 
            is very very steep, practically can be suggested only to the experinced hikers or, trekkers. 
            Starts from the staircase just beside the Vasisht Temple. After Moridugh, the rest of the route is 
            same.</p>

          </div>
          
        </div>

    </section>

<div className='pb-2 bg-gradient-to-b from-black to-transparent'></div>
<div className='p-4 h-2 bg-gradient-to-t from-black to-transparent'></div>
{/* ////////////////////////////////////// FAQ ///////////////////////////////////////////////////////////////////////////// */}


      <section className='bg-black md:px-[calc((100vw-600px)/2)]'>
        <div className='px-8'>
          <h3 className='text-5xl font-extrabold pt-20 text-left uppercase'>
            faq
          </h3>
          <h6 className='w-[70%]'>Frequently asked questions about Ranisui lake trek</h6>
        </div>

        <div className='mx-[10%] py-20'>
          <Accordion 
            question="what is the Best Time/Season for Bhrigu Lake Trek ?" 
            answer="The best time 
            to do the Bhrigu Lake Trek is from May to June and then again 
            from September to October. During these months, the weather is 
            relatively stable, with clear skies and comfortable temperatures, 
            making it ideal for trekking. Avoid monsoon months as the trail 
            can get slippery and risky due to heavy rainfall."/>

          <Accordion 
            question="How To Reach The Starting Point, that is Manali" 
            answer="Manali is well-connected by road and air. The Best way to 
            reach Manali is to take Volvo Semi-Sleepers from Delhi or, Chandigarh. 
            All are overnight buses. From Chandigarh it takes around 8-9hrs, 
            from Delhi it is 12-14hrs. Or, if you are a group, you can take a 
            cab also. There is Another way, take flight from Delhi to Bhuntar.
            But know that, flights get cancelled in bad weathers and it is Expensive."/>

          <Accordion 
            question="How Difficult is Bhrigu Lake Trek?" 
            answer="The Bhrigu Lake Trek is considered to be of moderate 
            difficulty. While it's not overly challenging for experienced 
            trekkers, it does involve steep ascents and descents, snowy terrain 
            and high altitude. Proper acclimatization and physical 
            fitness are essential to tackle this trek comfortably."/>

          <Accordion 
            question="Can Bhrigu Lake Trek be done in One Day?" 
            answer=" Yes, but know that it will be very very Difficult, and no matter what 
            you should return from you last point before 2pm. But you have to know route by 
            heart, if this is your first time, do not go alone. You have to start very early, 
            before the sunlight hits the valley, keep your food packed on the night before. 
            Make sure you are carrying enough food, carrying enough water.
            Start slow, then work up the pace."/>

          <Accordion 
            question="Can we do Bhrigu Lake Trek on our Own?" 
            answer=" While it's possible to do the Bhrigu Lake Trek independently, 
            it's advisable to go with a reputable trekking company or hire a local 
            guide. The trail can be challenging to navigate, especially for 
            first-timers, and having a guide can enhance safety and provide 
            valuable insights about the route, local customs, and wildlife. 
            Additionally, trekking with a group or guide ensures that you have 
            necessary support in case of emergencies."/>
        </div>

      </section>


{/* ////////////////////////////////////// What to Pack///////////////////////////////////////////////////////////////////////////////////////////////////// */}
    
<div className='pb-2 bg-gradient-to-b from-black to-transparent'></div>
<div className='p-4 h-2 bg-gradient-to-t from-black to-transparent'></div>
    
    <section className='bg-red-600 py-4 md:px-[calc((100vw-600px)/2)]'>

      <div className='text-xs mx-6 text-left max-w-32 my-4 text-white'>Fully Loaded Rucksack Should not weigh more than 25% of your body weight</div>
      
      <div className='m-8 pb-16 text-right flex flex-col items-end'>
        <div className='flex pt-10'>
          <GiBackpack className='size-20'/>
          <h3 className='text-5xl font-extrabold uppercase w-60'>What to Pack</h3>
        </div>
          <h6 className='w-[70%]'>There is <strong className='text-amber-200'>no bad weather</strong> only bad clothing</h6>
      </div>

      <div className='flex flex-col md:grid md:grid-cols-2 font-light mx-4 my-10 tracking-wide'>  
                                                                  
                                                                  {/* Add How to Choose/ Guide Links to all Items */}

          <div className='my-4'>
            <div className='uppercase text-3xl font-extrabold'>Packs</div>
            <ul className='p-1'>
              <li>Rucksack with Raincover (40L+)</li>
              <li>Knapsack/small day bag (10L)</li>
            </ul>
          </div>

          <div className='my-4'>
            <div className='uppercase text-3xl font-extrabold'>Footware</div>
            <ul className='p-1'>
              <li>Trekking Specific Shoe/Boot</li>
              <li>Lightweight Sandal</li>
            </ul>
          </div>

          <div className='my-4'>
            <div className='uppercase text-3xl font-extrabold'>Clothing</div>
            <ul className='p-1'>
              <li>SunCap</li>
              <li>WoolenCap</li>
              <li>Balaclava/Buff</li>
              <br/>
              <li>Full Sleeve Tshirt (2)</li>
              <li>Half Sleeve Tshirt (2)</li>
              <li>Trek Pant Full (2)</li>
              <li>Trek Pant Half (1)</li>
              <br/>
              <li>Fleece (1)</li>
              <li>Down/Feather/Synthetic Jacket (1)</li>
              <br/>
              <li>Waterproof Jacket/Raincoat/Poncho (1)</li>
              <li>Rain Pant (1)</li>
              <br/>
              <li>Gloves Inner (1)</li>
              <li>Trekking Gloves (1)</li>
              <br/>
              <li>Cotton Socks (2)</li>
              <li>Woolen Socks (2)</li>
            </ul>
          </div>
          
          <div className='my-4'>
            <div className='uppercase text-3xl font-extrabold'>Accesories</div>
            <ul className='p-1'>
              <li>Sunglass (cat 3, Side Protection)</li>
              <li>Head Torch (with Extra Batteries)</li>
              <li>Water Bottles (2L)</li>
              <li>Trekking Poles</li>
              <li>Power Bank</li>
              <li>Light weight Towel</li>
              <li>Lunch Box with Lid</li>
              <li>Mug & Spoon</li>
            </ul>
          </div>
          
          <div className='my-4'>
            <div className='uppercase text-3xl font-extrabold'>Personal Items</div>
            <ul className='p-1'>
              <li>Sunscreen (Spf 50+)</li>
              <li>Toothbrush, Toothpaste/Mouthfreshner</li>
              <li>Paper soap/Sanitizer</li>
              <li>Lip Balm</li>
              <li>Toilet Paper</li>
              <li>Personal Medicines</li>
              <li>Simple FirstAid Kit</li>
            </ul>
          </div>

      </div>

      <div className='mx-10 text-center py-2 text-yellow-400'><strong className='font-extralight'>Pack Similar Items in separate Waterproof Pouches or, 
        Strong Garbage Bags. Carry Extra Garbage Bags for Garbage Disposal.</strong></div>
      <div className='text-xs mx-10 text-center py-2 text-white'>
        (The checklist may differ a little for Indivisuals, going to do the trek on your own, so procceed carefully)</div>
 
    </section>

    <div className='pb-2 bg-gradient-to-b from-black to-transparent'></div>

{/* ////////////////////////////////////// Inclusion & Exclusions //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
    <div className='p-4 h-2 bg-gradient-to-t from-black to-transparent'></div>
  <section className='bg-sky-700 md:px-[calc((100vw-600px)/2)]'>

 
  <div className='flex flex-col py-8 justify-evenly '>
      <section className='flex flex-col p-4'>
        <h4 className='text-3xl below-xs:text-xl text-yellow-400 font-semibold mb-4 ml-6'>Inclusions</h4>
          <ul className='flex flex-col text-sm font-light gap-1'>
            <li className='flex'><GiCheckMark className='size-5 text-yellow-400 min-w-5 mr-2'/>Day 1 Manali Stay in Homestay</li>
            <li className='flex'><GiCheckMark className='size-5 text-yellow-400 min-w-5 mr-2 '/>Stay in Tent During Trek [ 3 Sharing basis ]</li>
            <br/>
            <li className='flex'><GiCheckMark className='size-5 text-yellow-400 min-w-5 mr-2'/>Food Day 1 breakfast to Day 4 breakfast</li>
            <li className='flex'><GiCheckMark className='size-5 text-yellow-400 min-w-5 mr-2'/>Meals [breakfast + Lunch + Snacks + Dinner]</li>
            <br/>
            <li className='flex'><GiCheckMark className='size-5 text-yellow-400 min-w-5 mr-2'/>Transport : Manali - Gulaba</li>
            <li className='flex'><GiCheckMark className='size-5 text-yellow-400 min-w-5 mr-2'/>Transport : Gulaba - Manali</li>
            <br/>
            <li className='flex'><GiCheckMark className='size-5 text-yellow-400 min-w-5 mr-2'/>Mountaineering Course certified Guide</li>
            <li className='flex'><GiCheckMark className='size-5 text-yellow-400 min-w-5 mr-2'/>Mountaineering Course certified Trek Leader</li>
            <li className='flex'><GiCheckMark className='size-5 text-yellow-400 min-w-5 mr-2'/>Support Staff [Cook, Helper] </li>
            <li className='flex'><GiCheckMark className='size-5 text-yellow-400 min-w-5 mr-2'/>porter/mule for Common luggage</li>
            <br/>
            <li className='flex'><GiCheckMark className='size-5 text-yellow-400 min-w-5 mr-2'/>Permit & Camping Fees</li>
            <li className='flex'><GiCheckMark className='size-5 text-yellow-400 min-w-5 mr-2'/>Safety Equipments [Climbing Rope, Crabiners, pulleys, etc.]</li>
            <li className='flex'><GiCheckMark className='size-5 text-yellow-400 min-w-5 mr-2'/>First Aid Kit</li>
            <li className='flex'><GiCheckMark className='size-5 text-yellow-400 min-w-5 mr-2'/>Sleeping Bag</li>
            <li className='flex'><GiCheckMark className='size-5 text-yellow-400 min-w-5 mr-2'/>Sleeping Mattress</li>
            <li className='flex'><GiCheckMark className='size-5 text-yellow-400 min-w-5 mr-2'/>Kitchen Tent</li>
            <li className='flex'><GiCheckMark className='size-5 text-yellow-400 min-w-5 mr-2'/>Dining tent</li>
            <li className='flex'><GiCheckMark className='size-5 text-yellow-400 min-w-5 mr-2'/>Toilet Tent</li>
          </ul>
      </section>

      <div className='h-[3px] rounded-full -rotate-12 bg-gradient-to-r from-white from-45% to-50% to-red-600 mx-2'></div>

      <section className='flex flex-col my-6 text-right p-4'>
        <h4 className='text-3xl below-xs:text-xl text-red-600 font-semibold mb-4 pr-2'>Exclusions</h4>
            <ul className='flex flex-col items-end text-sm font-light '>
              <li className='flex'>Insurance Fees<IoCloseOutline className='size-7 text-red-500 max-w-7 min-w-7  inline-block'/></li>
              <li className='flex'>Camera charges or, any similar fees <IoCloseOutline className='size-7 text-red-500 max-w-7 min-w-7  inline-block'/></li>
              <li className='flex'>Any Specially ordered meal, except the inclusions<IoCloseOutline className='size-7 text-red-500 max-w-7 min-w-7  inline-block'/></li>
              <li className='flex'>Anything not mentioned in Inclusions<IoCloseOutline className='size-7 text-red-500 max-w-7 min-w-7  inline-block'/></li>
            </ul>
      </section>

    </div>
    </section> 

    <div className='pb-2 bg-gradient-to-b from-black to-transparent'></div>
    <div className='p-4 h-2 bg-gradient-to-t from-black to-transparent'></div>
{/* ///////////////////////////////////Similar Activities/////////////////////////////////////////////////////////////////////////////////////////////// */}

    <section className=' bg-black py-16'>

      <div>
        <div className='flex px-8 items-center justify-start'>
          <h3 className='text-5xl below-xs:text-2xl text-left font-extrabold uppercase'>
            Similar Treks
          </h3>
          <GiCardRandom className='text-sky-400 size-24 shrink-0'/>
        </div>
      <div className="px-4 py-4 flex overflow-x-auto snap-x snap-mandatory no-scrollbar">
          {mockdata
          .filter(trek => trek.Index === 101 || trek.Index === 110)
          .map((treks) => (<Scrollables {...treks} key={treks.Index} />))}
      </div>
     </div>       

    <div className='py-8'>
        <div className='flex px-8  items-center justify-start'>
          <h3 className='text-5xl below-xs:text-2xl text-left font-extrabold uppercase'>
            All {mockdata.filter(treks => treks.Name === 'Ranisui Lake Trek').map(trek => trek.State)} Plans
          </h3>
          <GiCardRandom className='text-sky-400 size-24 shrink-0'/>
        </div>
        <div className="px-4 py-4 flex overflow-x-auto snap-x snap-mandatory no-scrollbar">
        {mockdata
        .filter(trek => trek.Name === 'Ranisui Lake Trek')
        .map(ranisuiTrek => 
            mockdata
            .filter(trek => trek.State === ranisuiTrek.State)
            .map((treks) => (<Scrollables {...treks} key={treks.Index} />))
        )}
        </div>
      </div>
    </section>


{/* //////////////////////////////////////Articles Section///////////////////////////////////////////////////////////////////////////////////////////// */}
    
    <section className=' md:mx-[10%] py-20'>
      <div className='px-8 text-left flex flex-col items-start'>
          <div className='flex '>
            <h3 className='text-5xl font-extrabold uppercase max-w-60'>
              Food for Soul
            </h3>
            <RiNewspaperFill className='size-24 ml-4'/>
          </div>
          <h6 className='w-[70%]'>
            Learn The way Of Mountains
          </h6>
      </div>
      <div className='py-8 tracking-[10px] mx-auto pl-8'> 1 2 3 4 5 6 7 8 ...</div>

      <div className='flex flex-col md:flex-row items-center overflow-x-auto
       snap-x snap-mandatory no-scrollbar'>
      {articleData.map((articles) => <Article {...articles} key={articles.Index}/>)}
      </div>
    </section>




    
    </main>
  )
}

export default page