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
import TrekCard from '@/components/homecards'
import AllCard from '@/components/allcards'
import Scrollables from '@/components/scrollables'






export const metadata = {
  title: "Bhrigu Lake Trek 2024 - Explore the Himalayan High Altitude(14,00ft) | The Trail Makers",
  description: "Discover an unforgettable alpine adventure with The Trail Makers. Experience the stunning beauty of Himachal Pradesh on the Bhrigu Lake Trek. Whether it's exploring a hidden trail, chasing sunsets, or simply getting lost in the beauty of nature, it'll be an epic adventure.",
  keywords: "Bhrigu Lake Trek, Himachal Pradesh trekking, Himalayan treks, adventure travel, Manali, Hike, Panduropa, hiking in India, trekking expeditions, scenic landscapes, outdoor adventures, Raulikholi, Baithardhar, Gulaba, Kulang, Moridugh, Khanora Nala"
};

function page() {

  return (
    <main className="min-h-screen bg-neutral-900 text-white no-scrollbar relative">

      <div className='bg-gradient-to-b from-black to-50% to-white h-[80vh] relative'>

        <Image src="https://res.cloudinary.com/thetrail/image/upload/v1714145641/bhrigu_lake_banner.jpg"
        className='object-cover object-[25%] w-full md:object-bottom  mix-blend-multiply absolute'
        style={{ width: "100%", height: "80vh"}}
        height={400}
        width={800} 
        sizes="(max-width: 768px) 100vw, 100vw"
        alt="Climbing towards bhrigu lake"></Image>

        <div className='absolute p-16 flex flex-col justify-center items-center w-full '>
          <h1 className='text-[20vw] md:text-[15vw] leading-[1] lg:text-[10rem] xl:px-40
           text-center font-bold uppercase'>Bhrigu Lake Trek</h1>
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
        <p className='font-semibold lg:text-lg'>Easy-Moderate</p>
        <h3 className='font-extralight text-lg lg:text-xl leading-5'>Difficulty</h3>
      </div>
      
      <div className='flex flex-col justify-center items-center p-2'>
        <GiMountaintop className='size-8 my-1 lg:size-12'/>
        <p className='font-semibold lg:text-lg'>Manali</p>
        <h3 className='font-extralight text-lg lg:text-xl leading-5'>Starting Point</h3>
      </div>
      
      <div className='flex flex-col justify-center items-center p-2'>
        <FaThinkPeaks className='size-8 my-1 lg:size-12'/>
        <p className='font-semibold lg:text-lg'>14,100ft</p>
        <h3 className='font-extralight text-lg lg:text-xl leading-5'>Highest Elevation</h3>
      </div>
      
      <div className='flex flex-col justify-center items-center p-2'>
        <GiPathDistance className='size-8 my-1 lg:size-12'/>
        <p className='font-semibold lg:text-lg'>22km</p>
        <h3 className='font-extralight text-lg lg:text-xl leading-5'>Trail Length</h3>
      </div>

    </section>


{/* ////////////////////////////////////////Short Intro////////////////////////////////////////////////////////////////////////////////////////// */}

      <section className='bg-green-950 md:px-[calc((100vw-600px)/2)]'>

        <h2 className='text-3xl font-semibold p-8 pr-12 pb-0 max-w-[400px] lg:text-5xl md:max-w-none'>
          Discover Bhrigu Lake Trek: A Beginner&apos;s Alpine Adventure Worth Exploring!
        </h2>

        <div className='py-8 pl-6 max-w-[95%] pr-0 leading-7 text-stone-300 text-lg font-light'>
            <p>
            So, ever thought about going on an Alpine trek? Let me tell you 
            about this gem called the Bhrigu Lake Trek. It&apos;s like a hidden 
            adventure playground, perfect for rookies like us. All you gotta 
            do is take it easy and soak in the sights.
            </p><br />

            <p>
            Imagine this: fields of vibrant flowers, lush green grass, and 
            those majestic snow-capped peaks in the distance. And as you hike, 
            you might even spot some wildlife in the forests – maybe even a bear 
            if you&apos;re lucky (or unlucky, depends on how you see it).
            </p><br/>
            
            <p>
            But here&apos;s where it gets exciting – when you hit those snowfields, 
            it&apos;s like stepping into a whole new world. Don&apos;t worry, it&apos;s not as 
            daunting as it sounds. It&apos;s more about the thrill of the climb and 
            the epic views you get at the top.
            </p><br />


            <p>
            But fair warning – it&apos;s over way too soon. If you&apos;re craving more adrenaline, 
            though, don&apos;t sweat it. There are plenty more treks out there waiting to be explored. 
            So, what do you say? Ready to lace up those boots and embark on an adventure of a lifetime?
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
              <div className='text-5xl font-bold max-w-60 text-yellow-500'>8,500/-</div>
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
            treks.Name.includes('Bhrigu Lake Trek')?
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
              <div>Day2 : Manali - Gulaba - Raulikholi</div>
              <div className='text-sky-700'>Distance : 6km</div>
              <div className='text-sky-700'>Duration : 3-5hrs</div>
            </li>
            <li className='p-1 pl-0'>
              <div>Day3 : Raulikholi - Bhrigu Lake - Raulikholi</div>
              <div className='text-sky-700'>Distance : 10km</div>
              <div className='text-sky-700'>Duration : 7-8hrs</div>
            </li>
            <li className='p-1 pl-0'>
              <div>Day4 : Raulikholi - Gulaba - Manali</div>
              <div className='text-sky-700'>Distance : 6km</div>
              <div className='text-sky-700'>Duration : 3-5hrs</div>
            </li>
          </ul>
        </div>
        
      </section>


{/* ////////////////////////////////////////Image Gallery//////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <section> 
        <div className="p-4 my-24 flex fle overflow-x-auto snap-x snap-mandatory no-scrollbar">
          {mockdata.map((treks) => <GalleryImage {...treks} key={treks.Index} />)}
        </div>
      </section>


{/* ///////////////////////////////////////Trek In Details/////////////////////////////////////////////////////////////////////////////////////// */}


      <section className='bg-emerald-100 text-orange-950 lg:text-lg text-lg md:px-[calc((100vw-600px)/2)]'>
        <h3 className='text-5xl text-lime-800 font-extrabold pr-6 pl-4 py-20 text-right uppercase'>
          Each Day of Bhrigu Lake Trek in Details
        </h3>

        <div className='mx-4'>
          <div className='flex justify-between items-center mb-4 pt-8'>
            <h4 className='text-6xl font-extrabold bg-yellow-500'>Day 1</h4>
            <div>Manali</div>
          </div>

          <div className='pt-8 font-semibold'>
            <div>Altitude : 6500ft</div>
            <div>Trail Length : NIL</div>
            <div>Duration : NIL</div>
          </div>

          <Image  src="https://res.cloudinary.com/thetrail/image/upload/ar_2:1,c_auto,h_320/v1715146119/PahadiManzil-Manali-Basecamp.jpg"
              height={250}
              width={400}
              alt="The Trail Makers" sizes="(max-width: 768px) 400px, 800px" 
              className="object-cover w-full object-[0%_90%] my-12">
          </Image>

          <div className='leading-7 text-base'>
            <p>
            <span className='font-bold'>Getting Here: </span>Once you step off the Volvo Bus, just hop into a cab straight to our Homestay. 
            Trust me, it&apos;s worth the journey! Surrounded by lush Apple Orchards and stunning views, you&apos;ll 
            feel right at home.
            </p><br/>

            <p>
            <span className='font-bold'>Meet and Greet: </span>Upon arrival, you&apos;ll meet the gang - your trekking buddies and our instructors. 
            We&apos;ll kick things off with an easy acclimatization hike to get you warmed up for the adventures ahead.
            </p><br />

            <p>
            <span className='font-bold'>Gear Up: </span>Need any last-minute gear? No worries! We&apos;ll hit the local market in the evening. 
            Forgot your socks? No problem. You can also rent gear right here at the Homestay if you&apos;re in a pinch.
            </p><br />

            <p>Don&apos;t forget to check out our handy guides:</p><br/>
            
            <ul className='list-disc ml-6'>
            <li><Link href={"/contact"} className='text-sky-500'>Where to snag adventure gear in Manali?</Link></li>
            <li><Link href={"/contact"} className='text-sky-500'>Cool spots to explore in Manali on foot</Link></li>
            </ul><br/>

            <p>
            <span className='font-bold'>Dinner Time: </span>Get ready for a hearty dinner, served a bit earlier than usual. Yep, that&apos;s the 
            mountain life for you - early to bed, early to rise. But hey, it&apos;s all part of the adventure, 
            right?
            </p><br/>

            <p>
            <span className='font-bold'>Rest Up: </span>After a satisfying meal, it&apos;s time to hit the sack. Snuggle up and get a good night&apos;s 
            sleep. We&apos;ve got big plans for tomorrow, and you&apos;ll want to be well-rested for the journey ahead.
            </p><br />

            <p>
            Alright, my friend, get some shut-eye and I&apos;ll catch you bright and early for more trekking fun. 
            Sleep tight!
            </p><br/>
          </div>
        </div>

        <div className='h-2 my-8 bg-black'></div>

        <div className='mx-4'>
          <div className='flex justify-between items-center mb-4 mt-16 gap-4 '>
            <h4 className='text-6xl flex-shrink-0 font-extrabold bg-amber-500'>Day 2</h4>
            <div className='text-right'>Manali - Gulaba - Raulikholi</div>
          </div>

          <div className='pt-8 font-semibold'>
            <div>Altitude : 6500ft - 9500ft - 12,500ft</div>
            <div>Trail Length : 6km</div>
            <div>Duration : 3-5 hrs</div>
          </div>

          <Image  src="https://res.cloudinary.com/thetrail/image/upload/v1714145641/bhrigu_lake_banner.jpg"
              height={200}
              width={800}
              alt="The Trail Makers" 
              sizes="(max-width: 768px) 250px, 800px" 
              style={{width: '100%',height: '160px' }} 
              className="object-cover w-full object-[0%_90%]  my-12">
          </Image>

          <div className='leading-7 text-base'>
            <p>
            <span className='font-bold'>Preparation: </span>First things first, freshen up and double-check your gear. Raincoat? Torch? 
            It&apos;s the little things that count, so make sure you&apos;ve got everything you need. Pro tip: 
            Keeping a checklist helps avoid those &quot;oops&quot; moments!
            </p><br />

            <p>
            <span className='font-bold'>Breakfast and Roll: </span>Fuel up with a hearty breakfast because we&apos;ve got some ground to cover. Hop into the 
            waiting car parked outside our Homestay. Our destination? The 14th bend to Rohtang Pass, 
            near Gulaba. Locals call it &quot;Chowda More.&quot; If you&apos;re here in autumn, get ready for a scenic 
            drive adorned with golden leaves. Picture-perfect, just like those European road trip movies!
            </p><br />

            <p>
            <span className='font-bold'>The Climb Begins: </span>From Gulaba to Raulikholi, it&apos;s a 6km trek with a 3000ft altitude gain. Brace yourself 
            for the challenge! Despite our creature comforts, there&apos;s something about the call of 
            the wild that draws us in. Embrace the discomfort and let the adventure unfold.
            </p><br />

            <p>
            <span className='font-bold'>Slow and Steady: </span>Remember, this isn&apos;t a race. Take it slow and steady as you tackle 
            the moderately steep sections. Enjoy the journey; you&apos;re here to unwind, after all. 
            Along the way, you&apos;ll stumble upon &apos;BaitharDhar,&apos; a quaint dhaba crafted by local 
            nomadic travelers known as Gaddis. Take a breather before the final stretch to Raulikholi.
            </p><br />

            <p>
            <span className='font-bold'>Campsite Charm: </span>Raulikholi awaits, less than an hour from BaitharDhar. Prepare to be 
            enchanted by its natural beauty, though it can get a tad damp at times. The soothing 
            melody of &apos;Khanora Nala&apos; fills the air, lulling tired souls to rest. Dinner will be 
            served earlier than back in Manali, so you can refuel and recharge for the adventures 
            yet to come.</p><br/>
          </div>
        </div>

        
        <div className='h-2 my-8  bg-black'></div>

        <div className='m-4'>
          <div className='flex justify-between items-center mb-4 mt-16 gap-4'>
            <h4 className='text-6xl shrink-0 font-extrabold bg-amber-500'>Day 3</h4>
            <div className='text-right'>Raulikholi - Bhrigu Lake- Raulikholi</div>
          </div>

          <div className='pt-8 font-semibold'>
            <div>Altitude : 12500ft - 14,090ft - 12,500ft</div>
            <div>Trail Length : 10km</div>
            <div>Duration : 6-8 hrs</div>
          </div>

          <Image  src="https://res.cloudinary.com/thetrail/image/upload/v1714145641/bhrigu_lake_banner.jpg"
              height={200}
              width={800}
              alt="The Trail Makers" sizes="(max-width: 768px) 250px, 800px" 
              style={{width: '100%',height: '160px' }} 
              className="object-cover w-full object-[0%_90%] my-12">
          </Image>

          <div className='leading-7 text-base'>
            <p>
            <span className='font-bold'>Picture this: </span>as the morning sun kisses those peaks, it&apos;s like 
            a scene from a dream. Today&apos;s the big one – an early start to 
            cross the Khanora Nala and begin our ascent. Snow&apos;s a whole different 
            ballgame, but trust me, once you get the hang of it, you&apos;ll be 
            cruising. Sure, the initial climb is steep, but soon enough, 
            it evens out, and bam – there&apos;s the mythical lake, unfolding 
            before your eyes.
            </p><br />

            <p>
            But here&apos;s the kicker – the real magic isn&apos;t just the lake. 
            It&apos;s the view from up there. Standing tall at 14,000ft, it&apos;s 
            like the whole world&apos;s at our feet. And that feeling? 
            Man, it&apos;s indescribable.
            </p><br/>

            <p>
            But alas, all good things must come to an end. We&apos;ve gotta make 
            our way back before the sun sets. The journey down&apos;s no walk in 
            the park, especially for us rookies. But hey, every slip and 
            slide is just part of the adventure, right?
            </p><br/>

            <p>
            By the time you&apos;re back at camp, you&apos;re practically one with the 
            mountain. Laughing, goofing around – it&apos;s all part of the experience. 
            Quick tip: don&apos;t miss that sunset – it&apos;s pure magic from up here.
            </p><br />

          </div>
        </div>

        
        <div className='h-2 my-8 bg-black'></div>

        <div className='mx-4'>
          <div className='flex justify-between items-center mb-4 mt-16 gap-4 '>
            <h4 className='text-6xl flex-shrink-0 font-extrabold bg-amber-500'>Day 4</h4>
            <div className='text-right'>Raulikholi - Gulaba - Manali</div>
          </div>

          <div className='pt-8 font-semibold'>
            <div>Altitude : 12,500ft - 9500ft - 6500ft</div>
            <div>Trail Length : 6km</div>
            <div>Duration : 2-4 hrs</div>
          </div>


          <Image  src="https://res.cloudinary.com/thetrail/image/upload/v1714145641/bhrigu_lake_banner.jpg"
              height={200}
              width={800}
              alt="The Trail Makers" sizes="(max-width: 768px) 250px, 800px" 
              style={{width: '100%',height: '160px' }} 
              className="object-cover w-full object-[0%_90%] my-12">
          </Image>

          <div className='leading-7 text-base'>
            <p>
            You&apos;re at the end of your trip, packing 
            up your stuff all careful-like. Now, I know those downward slopes are 
            calling your name, but hold up a sec! It&apos;s smart to get the hang of 
            the controls first before you go zooming down. Believe it or not, 
            most accidents happen when folks get a little too excited and make 
            risky moves on the way down.
            </p><br />

            <p>
            But don&apos;t worry, the descent won&apos;t take long, and your ride will 
            be waiting for you at the road head. Adios Amigos!
            </p><br />

            <p>
            Oh, and before you head out, make sure to check out all the awesome 
            cafes and restaurants along Manali Mall Road while you wait for your 
            evening bus. Trust me, you won&apos;t want to miss it!
            </p><br />
          </div>
        </div>

        <div className='py-12 pb-16'>
        <GiTreasureMap className='size-36 text-stone-500 mx-auto'/>
        </div>
      </section>



{/* ////////////////////////////////////// Peaks from Bhrigu Lake Trek///////////////////////////////////////////////////////////////////////////////////////////////////// */}
    

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


{/* ////////////////////////////////////// Inclusion & Exclusions //////////////////////////////////////////////////////////////////////////////////////////////////////// */}

  <section className='bg-sky-700 md:px-[calc((100vw-600px)/2)]'>

  <div className='flex items-center justify-items-start gap-2 bg-sky-900 pr-2'>
    <h3 className='text-3xl below-xs:text-xl font-bold p-4 max-w-60'> Inclusions & Exclusions</h3>
    <FaCheck className='size-16 text-amber-400'/>
    <ImCross className='size-16 text-red-700'/>
  </div>

  <div className='flex flex-col p-4 justify-evenly '>
      <section className='flex flex-col my-6'>
        <h4 className='text-3xl below-xs:text-xl font-medium mb-4'>Inclusions</h4>
          <ul className='flex flex-col text-base font-light gap-1'>
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

      <div className='h-[3px] rounded-full bg-white mx-2'></div>

      <section className='flex flex-col my-6'>
        <h4 className='text-3xl below-xs:text-xl  font-medium mb-4'>Exclusions</h4>
            <ul className='flex flex-col text-base font-light -ml-1'>
              <li className='flex'><IoCloseOutline className='size-7 text-red-500 max-w-7 min-w-7  inline-block'/>Insurance Fees</li>
              <li className='flex'><IoCloseOutline className='size-7 text-red-500 max-w-7 min-w-7  inline-block'/>Camera charges or, any similar fees</li>
              <li className='flex'><IoCloseOutline className='size-7 text-red-500 max-w-7 min-w-7  inline-block'/>Any Specially ordered meal, except the inclusions</li>
              <li className='flex'><IoCloseOutline className='size-7 text-red-500 max-w-7 min-w-7  inline-block'/>Anything not mentioned in Inclusions</li>
            </ul>
      </section>

    </div>
    </section> 

{/* ///////////////////////////////////Read About other Treks///////////////////////////////////////////////////////////////////////////////////////////////////// */}

<section className='flex justify-between bg-sky-700 font-serif py-4'>
<Link href={mockdata.find(trek => trek.Index === ((mockdata.find(trek => trek.PageLink === "/bhrigu-lake-trek")?.Index ?? 0) - 1))?.PageLink ?? '/'}>
  <div className='bg-amber-500 p-1'>
    <h6 className='text-lg max-w-24 font-bold text-left text-amber-950'>Previous</h6>
  </div>
  </Link>

  <Link href={mockdata.find(trek => trek.Index === ((mockdata.find(trek => trek.PageLink === "/bhrigu-lake-trek")?.Index ?? 0) + 1))?.PageLink ?? '/'}>
  <div className='bg-amber-500 p-1'>
    <h6 className='text-lg max-w-24 font-bold text-left text-white'>Up Next</h6>
  </div>
  </Link>

</section>
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