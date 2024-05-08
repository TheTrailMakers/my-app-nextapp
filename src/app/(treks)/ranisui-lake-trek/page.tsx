import React from 'react'
import Link from 'next/link';
import Image from 'next/image';


import mockdata from '@/data/homepage_cards.json'
import articleData from '@/data/articles.json'

import { GiBackpack, GiCardRandom, GiCheckMark, GiDuration, GiMountaintop, GiPathDistance, GiSummits, GiTreasureMap } from 'react-icons/gi';
import { MdAddHomeWork, MdAltRoute, MdOutlineNetworkCell } from 'react-icons/md';
import { FaCheck, FaCircle, FaRupeeSign, FaThinkPeaks } from 'react-icons/fa';
import { FaCarOn } from 'react-icons/fa6';
import { ImCross } from 'react-icons/im';
import { IoCloseOutline } from 'react-icons/io5';
import { RiNewspaperFill } from 'react-icons/ri';

import Accordion from '@/components/accordion';
import AllCard from '@/components/allcards';
import Article from '@/components/article';
import GalleryImage from '@/components/galleryImage';
import JoinDate from '@/components/joinDate';


export const metadata = {
    title: "Ranisui Lake Trek 2024 - Offbeat Unpopular trek in Himachal (12,400ft) | The Trail Makers",
    description: "Embark on a breathtaking journey through the picturesque landscapes of Himachal Pradesh with the Ranisui Lake Trek. Explore hidden gems, lush greenery, and pristine alpine lakes while trekking through this lesser-known yet enchanting trail. Get ready for an unforgettable adventure in the lap of nature.",
    keywords: "Ranisui Lake Trek, Himachal Pradesh, Manali, Hike, Lamadugh, Chhota Pathhar, Bada pathhar, Paradise meadow, Hadimba, Khanpari Tibba, Kalihani Pass, Riyali, Sangchar, Manali WildLife Sanctuary, trekking in India, offbeat trekking destinations, alpine lakes, scenic landscapes, adventure travel, Himachal Pradesh trekking, Himalayan treks, adventure travel, hiking in India, trekking expeditions, outdoor adventures"
  };
  

function page() {
  return (
    <main className="min-h-screen bg-neutral-900 text-white no-scrollbar relative">

      <div className='bg-gradient-to-b from-black to-50% to-white h-[80vh] relative'>

        <Image src="https://res.cloudinary.com/thetrail/image/upload/ar_3:4,c_auto,g_auto/v1714117919/Ranisui-Lake-Trek/khanpari-kalihani-pass-trek.jpg"
        className='object-cover object-[50%] w-full md:object-[50%_60%] mix-blend-multiply absolute'
        style={{ width: "100%", height: "80vh"}}
        height={600}
        width={800} 
        sizes="(max-width: 768px) 50vw, 100vw"
        alt="Climbing towards bhrigu lake"></Image>

        <div className='absolute p-16 flex flex-col justify-center items-center w-full '>
          <h1 className='text-[20vw] md:text-[15vw] leading-[1] lg:text-[10rem] xl:px-40
           text-center font-bold uppercase'>Ranisui Lake Trek</h1>
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
        <p className='font-semibold lg:text-lg'>13,250ft</p>
        <h3 className='font-extralight text-lg lg:text-xl leading-5'>Highest Elevation</h3>
      </div>
      
      <div className='flex flex-col justify-center items-center p-2'>
        <GiPathDistance className='size-8 my-1 lg:size-12'/>
        <p className='font-semibold lg:text-lg'>24km</p>
        <h3 className='font-extralight text-lg lg:text-xl leading-5'>Trail Length</h3>
      </div>

    </section>


{/* ////////////////////////////////////////Short Intro////////////////////////////////////////////////////////////////////////////////////////// */}

      <section className='bg-green-950 md:px-[calc((100vw-600px)/2)]'>

        <h2 className='text-3xl font-semibold p-8 pr-12 pb-0 max-w-[400px] lg:text-5xl md:max-w-none'>
          Discover Ranisui Lake Trek: A Beginner&apos;s Alpine Adventure Worth Exploring!
        </h2>

        <div className='p-8 max-w-[95%] md:pr-0 leading-7 text-stone-300 text-lg font-light'>
            <p>
            Embark on an incredible journey through the captivating landscapes of 
            the Ranisui Lake Trek, just a stone&apos;s throw away from Manali. Over 
            three unforgettable days, this offbeat adventure promises to whisk 
            you away into a world of natural wonders and breathtaking beauty.
            </p><br />

            <p>
            Picture yourself winding through lush forests, charming villages, 
            and meadows that seem to stretch on forever. Along the way, you&apos;ll 
            stumble upon Lamadugh, a serene oasis offering sweeping views of 
            the majestic Himalayas. Take a moment to soak in the tranquility 
            and marvel at the sheer grandeur of your surroundings.
            </p><br/>
            
            <p>
            But that&apos;s not all – the trek also introduces you to the lesser-known 
            trail of Badapathhar, where every twist and turn reveals something 
            new and exciting. And what&apos;s a trek without a little exploration? 
            Set aside a day to venture off on a thrilling hike, delving deeper 
            into the untouched wilderness and uncovering its hidden gems.
            </p><br />


            <p>
            The Ranisui Lake Trek isn&apos;t just about following a trail – it&apos;s 
            about forging your own path, discovering new routes, and immersing 
            yourself in the raw beauty of nature. So, if you&apos;re ready to escape 
            the ordinary and embrace adventure, join us on this unforgettable 
            journey through the heart of the Himalayas.
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
        <Link href={"/contact"}><span className='text-yellow-500 font-bold'> Click Here.</span></Link>
        <div>Join on any date with your friends.</div>
        </div>
        </section>
  

{/* ///////////////////////////////////////Brief Itinerray////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <section className='flex flex-col rounded-3xl bg-white text-black m-4 my-24 md:mx-[calc((100vw-600px)/2)]'>
        <h3 className='text-5xl font-bold uppercase m-4 mb-0 max-w-[50%]'>Brief Itinerary</h3>
        <div className='m-4 font-mono text-lg font-semibold'>
          <ul>
            <li className='my-4 pl-0'>
              <div>Day1 : Manali [Introduction]</div>
              <div className='text-sky-700'>Distance : Nil</div>
              <div className='text-sky-700'>Duration : Nil</div>
            </li>
            <li className='my-4 pl-0'>
              <div>Day2 : Manali - Bada Pathhar - Lamadugh</div>
              <div className='text-sky-700'>Distance : 6km</div>
              <div className='text-sky-700'>Duration : 4-6hrs</div>
            </li>
            <li className='p-1 pl-0'>
              <div>Day3 : Lamadugh - ranisui - Lamadugh</div>
              <div className='text-sky-700'>Distance : 12km</div>
              <div className='text-sky-700'>Duration : 7-8hrs</div>
            </li>
            <li className='p-1 pl-0'>
              <div>Day4 : Lamadugh - Manali</div>
              <div className='text-sky-700'>Distance : 6km</div>
              <div className='text-sky-700'>Duration : 3-5hrs</div>
            </li>
          </ul>
        </div>
        
      </section>


{/* ////////////////////////////////////////Image Gallery//////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <section> 
        <div className="p-4 my-24  flex overflow-x-auto snap-x snap-mandatory no-scrollbar">
          {mockdata.filter((treks) => treks.Name === 'Ranisui Lake Trek').map((trek) => <GalleryImage {...trek} key={trek.Index}/>)}
        </div>
      </section>


{/* ///////////////////////////////////////Trek In Details/////////////////////////////////////////////////////////////////////////////////////// */}


      <section className='bg-emerald-100 m-4 text-orange-950  
      lg:text-lg text-lg  rounded-t-[4rem] md:px-[calc((100vw-600px)/2)]'>
        <h3 className='text-5xl text-lime-800 font-extrabold pr-6 pl-4 py-20 text-right uppercase'>
          Each Day of Ranisui Lake Trek in Details
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

          <Image  src="https://res.cloudinary.com/thetrail/image/upload/ar_2:1,c_auto,h_320/v1715146811/PahadiManzil_Homestay_Base_Manali.jpg"
              height={250}
              width={400}
              alt="The Trail Makers" sizes="(max-width: 768px) 400px, 800px" 
              className="object-cover w-full object-[0%_90%] my-12">
          </Image>

          <div className='leading-7'>
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
            <div className='text-right'>Manali - Badapathhar - Lamadugh</div>
          </div>

          <div className='pt-8 font-semibold'>
            <div>Altitude : 6500ft - 7700ft - 10,000ft</div>
            <div>Trail Length : 6km</div>
            <div>Duration : 3-5 hrs</div>
          </div>

          <Image  src="https://res.cloudinary.com/thetrail/image/upload/ar_2:1,c_auto,h_320/v1715145386/Ranisui-Lake-Trek/Lamadugh_hut.jpg"
              height={250}
              width={400}
              alt="The Trail Makers" sizes="(max-width: 768px) 400px, 800px" 
              className="object-cover w-full object-[0%_90%]  my-12">
          </Image>

          <div className='leading-7'>
            <p>
            <span className='font-bold'>Coming Soon</span>
            </p><br />

          </div>
        </div>

        
        <div className='h-2 my-8  bg-black'></div>

        <div className='m-4'>
          <div className='flex justify-between items-center mb-4 mt-16 gap-4'>
            <h4 className='text-6xl shrink-0 font-extrabold bg-amber-500'>Day 3</h4>
            <div className='text-right'>Lamadugh - Khanpari Tibba - Ranisui Lake - Lamadugh</div>
          </div>

          <div className='pt-8 font-semibold'>
            <div>Altitude : 10,000ft - 13,250ft - 12,400ft - 10,000ft</div>
            <div>Trail Length : 10km</div>
            <div>Duration : 6-8 hrs</div>
          </div>

          <Image  src="https://res.cloudinary.com/thetrail/image/upload/ar_2:1,c_auto,h_320/v1715145910/Ranisui-Lake-Trek/RanisuiLake-Person_Jump.jpg"
              height={250}
              width={400}
              alt="The Trail Makers" sizes="(max-width: 768px) 400px, 800px" 
              className="object-cover w-full object-[0%_90%] my-12">
          </Image>

          <div className='leading-7'>
            <p>
            <span className='font-bold'>Picture this: </span> Coming Soon </p>

          </div>
        </div>

        
        <div className='h-2 my-8 bg-black'></div>

        <div className='mx-4'>
          <div className='flex justify-between items-center mb-4 mt-16 gap-4 '>
            <h4 className='text-6xl flex-shrink-0 font-extrabold bg-amber-500'>Day 4</h4>
            <div className='text-right'>Lamadugh - Manali</div>
          </div>

          <div className='pt-8 font-semibold'>
            <div>Altitude : 10,000ft - 6500ft</div>
            <div>Trail Length : 6km</div>
            <div>Duration : 2-4 hrs</div>
          </div>


          <Image  src="https://res.cloudinary.com/thetrail/image/upload/ar_2:1,c_auto,h_320/v1715145870/Ranisui-Lake-Trek/ChhotaPathhar-Lamadugh.jpg"
              height={250}
              width={400}
              alt="The Trail Makers" sizes="(max-width: 768px) 400px, 800px" 
              className="object-cover w-full object-[0%_90%] my-12">
          </Image>

          <div className='leading-7'>
            <p>Coming Soon
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
            Peaks from Ranisui Lake Trek
          </h3>
        </div>
        
        <div className='p-4 mr-6'>
          <p className='py-2'>Coming Soon</p>
          <p className='py-2 font-semibold'>Here is a List of Peaks seen on the Trek, Climbed or Unclimbed.</p>
          <ol className='p-4 ml-4 list-decimal '>
            <li>Deo Tibba (coming)</li>
            
          </ol>
          <p className='my-8'>Coming Soon</p>
        </div>

    </section>


{/* ////////////////////////////////////// Alternate Bhrigu Lake Trek///////////////////////////////////////////////////////////////////////////////////////////////////// */}
    

<section className='bg-emerald-900 py-20 md:px-[calc((100vw-600px)/2)]'>
        <div className='flex px-8 items-center'>
          <MdAltRoute className='text-amber-500 size-24 shrink-0'/>
          <h3 className='text-3xl text-right font-extrabold uppercase'>
            Alternate Routes to Ranisui Lake
          </h3>
        </div>
        
        <div className='p-4 mr-6 text-neutral-300'>

          <p className='py-2 text-yellow-400'>There is practically only <strong>two other routes</strong> 
          to Ranisui Lake. One of them is commonly visited by 
          trekkers, while the other one is the Path Less Taken.</p>

          <div className='mt-8'>
            <div className='flex items-center'>
              <FaCircle className='size-3 mr-2 text-yellow-500 '/>
              <h5 className='text-xl font-semibold'>Path 1</h5>
            </div>
            <h6 className='text-lg font-extralight'>Sangchar -Ranisui</h6>
            <p className='mt-4 '>To be Written</p>

            <p className='mt-4'> Coming Soon
            </p>
          </div>
          
          <div className='mt-16'>
          <div className='flex items-center'>
              <FaCircle className='size-3 mr-2 text-yellow-500 '/>
              <h5 className='text-xl font-semibold'>Path 2</h5>
            </div>
            <h6 className='text-lg font-extralight'>Manali - Manali WildLife Sanctuary - Lamadugh - Ranisui</h6>
            <p className='mt-4'>To be written.</p>

          </div>
          
        </div>

    </section>


{/* ////////////////////////////////////// FAQ ///////////////////////////////////////////////////////////////////////////// */}


      <section className='bg-black md:px-[calc((100vw-600px)/2)]'>
        <div className='px-8'>
          <h3 className='text-5xl font-extrabold pt-20 text-left uppercase'>
            faq
          </h3>
          <h6 className='w-[70%]'>Frequently asked questions about bhrigu lake trek</h6>
        </div>

        <div className='mx-[10%] py-20'>
          <Accordion 
            question="what is the Best Time/Season for Ranisui Lake Trek ?" 
            answer="The best time 
            to do the Ranisui Lake Trek is from May to June and then again 
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
            question="How Difficult is ranisui Lake Trek?" 
            answer="The Ranisui Lake Trek is considered to be of moderate 
            difficulty. While it's not overly challenging for experienced 
            trekkers, it does involve steep ascents and descents, rocky 
            terrain, and high altitude. Proper acclimatization and physical 
            fitness are essential to tackle this trek comfortably."/>

          <Accordion 
            question="Can ranisui Lake Trek be done in One Day?" 
            answer=" Yes, but know that it will be very very Difficult, and no matter what 
            you should return from you last point before 2pm. But you have to know route by 
            heart, if this is your first time, do not go alone. You have to start very early, 
            before the sunlight hits the valley, keep your food packed on the night before. 
            Make sure you are carrying enough food, carrying enough water.
            Start slow, then work up the pace."/>

          <Accordion 
            question="Can we do Ranisui Lake Trek on our Own?" 
            answer=" While it's possible to do the Ranisui Lake Trek independently, 
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

      <div className='flex flex-col md:grid md:grid-cols-2 font-extralight mx-4 my-10 tracking-wide'>  
                                                                  
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
          <ul className='flex flex-col text-lg font-light gap-1'>
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
            <ul className='flex flex-col text-lg font-light -ml-1'>
              <li className='flex'><IoCloseOutline className='size-7 text-red-500 max-w-7 min-w-7  inline-block'/>Insurance Fees</li>
              <li className='flex'><IoCloseOutline className='size-7 text-red-500 max-w-7 min-w-7  inline-block'/>Camera charges or, any similar fees</li>
              <li className='flex'><IoCloseOutline className='size-7 text-red-500 max-w-7 min-w-7  inline-block'/>Any Specially ordered meal, except the inclusions</li>
              <li className='flex'><IoCloseOutline className='size-7 text-red-500 max-w-7 min-w-7  inline-block'/>Anything not mentioned in Inclusions</li>
            </ul>
      </section>

    </div>
    </section> 

{/* ///////////////////////////////////Prev & Next Treks///////////////////////////////////////////////////////////////////////////////////////////////////// */}

<section className='flex justify-between bg-sky-700 font-serif py-4'>
<Link href={mockdata.find(trek => trek.Index === ((mockdata.find(trek => trek.PageLink === "/ranisui-lake-trek")?.Index ?? 0) - 1))?.PageLink ?? '/'}>
  <div className='bg-amber-500 p-1'>
    <h6 className='text-lg max-w-24 font-bold text-left text-amber-950'>Previous</h6>
  </div>
  </Link>

  <Link href={mockdata.find(trek => trek.Index === ((mockdata.find(trek => trek.PageLink === "/ranisui-lake-trek")?.Index ?? 0) + 1))?.PageLink ?? '/'}>
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
          .filter(trek => trek.Index === 102 || trek.Index === 110)
          .map((treks) => (<AllCard {...treks} key={treks.Index} />))}
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
            .map((treks) => (<AllCard {...treks} key={treks.Index} />))
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