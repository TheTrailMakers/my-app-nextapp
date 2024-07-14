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

import { MdCheckBoxOutlineBlank } from "react-icons/md";




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
    {mockdata.map((treks, index) => {
      if (treks.Name.includes('Beas Kund Trek') && Array.isArray(treks.ImageLinks)) {
        return treks.ImageLinks.map((links, i) => (
          <GalleryImage ImageLinks={links} key={`${index}-${i}`} />
        ));
      }
      return null;
    })}
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
              <div className='text-lg font-normal p-1 pt-2'> Arrival At Manali</div>
            </div>
          </div>

          <div className='font-medium p-4 pr-2 text-sm text-right bg-neutral-800 shadow-slate-800 shadow-2xl text-white rounded-s-3xl'>
            <div>6500ft <FaThinkPeaks className='inline ml-2 size-6' /></div>
            <div>NIL <GiPathDistance className='inline ml-2 size-6' /></div>
            <div>NIL <GiDuration className='inline ml-2 size-6' /></div>
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
            in, we will embark on an easy hike in the nearby forest. This initial trek is designed to test everyone&apos;s 
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


          <div className='h-20'></div>


          <div className='flex justify-between items-start'>

            <div className='flex flex-row gap-2'>
              <div className='bg-yellow-500 w-3 rounded-e-full h-auto '></div>
              <div className='flex flex-col justify-between items-start py-2'>
                <h4 className='text-5xl font-extrabold'>Day 2</h4>
                <div className='text-lg font-normal p-1 pt-2'> Manali --- Bakkar Thach</div>
              </div>
            </div>

            <div className='font-medium text-sm p-4 pr-2 text-right text bg-neutral-800 shadow-slate-800 shadow-2xl text-white rounded-s-3xl'>
              <div>10,880ft <FaThinkPeaks className='inline ml-2 size-6' /></div>
              <div>4km <GiPathDistance className='inline ml-2 size-6' /></div>
              <div>3-5hrs <GiDuration className='inline ml-2 size-6' /></div>
            </div>
          </div>

          <Image  src="https://res.cloudinary.com/thetrail/image/upload/ar_3:2,c_auto,h_480/v1720878113/Beas-Kund-Trek/Rhododendron_Bakkar_Thach.jpg"
              height={250}
              width={400}
              alt="The Trail Makers" 
              sizes="(max-width: 768px) 400px, 800px" 
              className="object-cover w-full my-12">
          </Image>

          <div className='leading-7 text-base font-medium mx-4 text-neutral-700'>

            <h5 className='font-semibold text-neutral-700'>Wake-up Call:</h5>
            <p>
            Start your day bright and early, preferably before 6 AM, following the 
            mountain routine. Ensure your rucksack is neatly packed the night before.
            </p><br/>

            <h5 className='font-semibold text-neutral-700'>Transport to Dhundi:</h5>
            <p>
            Today, our cab will transport us to Dhundi at around 9am, passing through 
            the scenic Solang Valley. While Solang Valley is a popular 
            tourist spot, it can get crowded, potentially causing slight delays.
            </p><br />

            <h5 className='font-semibold text-neutral-700'>Arrival at Dhundi:</h5>
            <p>
            Dhundi is known for its unpredictable weather, often getting cloudy 
            without warning. Near Dhundi Bridge, we&apos;ll leave the paved road. Our 
            car will take us a bit further along the trail, giving us a head start. 
            Our common luggage, and the rucksacks of those opting for offloading 
            &#40;which we discourage unless necessary&#41;, will be loaded onto mules. 
            The rest of the team will have a brief session before we begin our trek. T
            oday&apos;s destination is Bakkar Thach &#40;Goat Meadow&#41;.
            </p><br/>

            <h5 className='font-semibold text-neutral-700 pb-4'>Trek to Bakkar Thach:</h5>
            <p>
            <ol className='list-decimal list-inside '>
              <li  className='font-semibold text-neutral-700 pl-2 pb-2'>Starting from Dhundi
                <ul className='font-medium list-disc list-inside pl-2'>
                  <li>The initial 1 km is an easy walk with no upward slope.</li>
                  <li>You might catch glimpses of the Beas River playing hide and seek behind the gorges.</li>
                  <li>Remnants of last year&apos;s snow, now dull with mud and dirt, can still be seen.</li>
                  <li>Enjoy the sights of nomad camps &#40;Gaddi ka Dera&#41;, yellow rye fields, or low-hanging clouds.</li>
                  <li>Hanuman Tibba and its glacier stand tall in the distance, like guardians of the valley.</li>
                </ul>
              </li>

              <li  className='font-semibold text-neutral-700 pl-2  pb-2'>After the Bridge:
                <ul className='font-medium list-disc list-inside pl-2'>
                <li>The first half of the route before the Beas Bridge is laid with stones 
                  and sand for easier driving. If you prefer earthy trails, bear with 
                  it until you cross the wooden bridge.</li>
                <li>The bridge, often rebuilt after monsoons, may wobble but is safe with 
                  our trek leader&apos;s assistance.</li>
                <li>After the bridge, the grassy trail with a slight slope begins. 
                  This part of the trail is adorned with pink and blue blossoms of rhododendrons.</li>
                <li>Listen to our trek leader&apos;s tales about Bhojpatra, Birch and Chir Pine, 
                  and the significance of the Juniper &#40;Baithar&#41; plant.</li>
                </ul>
              </li>

              <li  className='font-semibold text-neutral-700 pl-2  pb-2'>Ascend to the Ridge:
                <ul className='font-medium list-disc list-inside pl-2'>
                <li>The climb is approximately 2 km long with a gentle slope.</li>
                <li>Take it easy, maintaining a steady pace without rushing. Enjoy the surrounding flora.</li>
                <li>At the end of the climb, a grassy ridge with a flat patch suitable for pitching tents 
                  comes into view. While it offers a great view of Bakkar Thach, it&apos;s rarely used for 
                  camping due to the lack of tall trees and high thunderstrike risk.</li>
                </ul>
              </li>

              <li  className='font-semibold text-neutral-700 pl-2  pb-2'>Final Stretch to Bakkar Thach:
                <ul className='font-medium list-disc list-inside pl-2'>
                <li>From the ridge, Bakkar Thach is less than a kilometer away.</li>
                <li>You&apos;ll need to cross 5-6 gorges formed by streams from nearby glaciers. 
                  Most are dry, but a few may have water. Be cautious of boulders and unstable trails.</li>

                </ul>
              </li>

            </ol>
            </p><br/>

            <p>From Bakkar Thach, enjoy views of Friendship Peak, the Seven Sisters, and 
              the majestic Hanuman Tibba. This beautiful campsite can get crowded as AVIMAS 
              &#40;Atal Bihari Vajpayee Institute of Mountaineering and Allied Sports&#41; often uses 
              it for mountaineering courses. In such cases, we move slightly uphill to a 
              more secluded area with space for 5-6 tents. Nearby glacial streams offer 
              crystal-clear, icy-cold water, perfect for dipping your legs. Always go 
              with a companion for safety</p>

          </div>



        <div className='h-20'></div>


        <div className='flex justify-between items-start'>

          <div className='flex flex-row gap-2'>
            <div className='bg-yellow-500 w-3 rounded-e-full h-auto '></div>
            <div className='flex flex-col justify-between items-start py-2'>
              <h4 className='text-5xl font-extrabold'>Day 3</h4>
              <div className='text-lg font-normal p-1 pt-2'>Bakkar Thach --- Beas Kund <br/> --- Bakkar Thatch</div>
            </div>
          </div>

          <div className='font-medium text-sm p-4 pr-2 text-right text bg-neutral-800 shadow-slate-800 shadow-2xl text-white rounded-s-3xl'>
            <div>12,700ft <FaThinkPeaks className='inline ml-2 size-6' /></div>
            <div>6km <GiPathDistance className='inline ml-2 size-6' /></div>
            <div>7-8hrs <GiDuration className='inline ml-2 size-6' /></div>
          </div>
        </div>

        <Image  src="https://res.cloudinary.com/thetrail/image/upload/ar_3:2,c_auto,h_480/v1720877917/Beas-Kund-Trek/Beas_kund_valley.jpg"
            height={250}
            width={400}
            alt="The Trail Makers" 
            sizes="(max-width: 768px) 400px, 800px" 
            className="object-cover w-full my-12">
        </Image>

        <div className='leading-7 text-base font-medium mx-4 text-neutral-700'>

          <p>
          Today is the most interesting day of the trek,  we will  leave Bakkar Thatch 
          very early in the morning. After 1km of almost no elevation gain, we will 
          start Climbing. Slowly all the big peaks will start unrevealing themselves.
          </p><br/>

          <p>
          The Climb is of around 500m,  it is not much for the seasoned trekkers,  
          but for the first timers it can be little strenuous. The tip is climb easy.
          </p><br/>

          <p>
          After reaching the top of the climb,  we will hit the boulder Zonse. 
          This is actually on top a Glacier &#40;no need to worry, no one can seemingly 
          feel the movement&#41;. So, the route constantly change,  every few year. 
          The Boulders are big and most of them are relatively stable, but be careful while crossing.
          </p><br/>

          <p>
          After navigating the boulder zone, which may take half an hour to cross, 
          we will reach the morain zone of the track. You can see the whole route 
          while decending from the boulder Zone. YOu may need to cross a few stream, 
          to reach the lake,  depending upon the season. Tentu pass, shitidhar peak 
          and the mighty Hanuman Tibba all surround the valley mighty guardians.
          </p><br/>

          <p>
          Enjoy your time by the lake with all the peaks around. We will start going 
          back by the time, previously metioned by your trek leader, we will follow 
          the same route to go back. Enjoy your snack and Dinner. Have Games with your friends.
          </p><br/>

          <p>
          No issues being late tonight.
          </p><br/>
          
        </div>


        <div className='h-20'></div>


        <div className='flex justify-between items-start'>

          <div className='flex flex-row gap-2'>
            <div className='bg-yellow-500 w-3 rounded-e-full h-auto '></div>
            <div className='flex flex-col justify-between items-start py-2'>
              <h4 className='text-5xl font-extrabold'>Day 4</h4>
              <div className='text-lg font-normal p-1 pt-2'>Bakkar Thach --- Manali</div>
            </div>
          </div>

          <div className='font-medium text-sm p-4 pr-2 text-right text bg-neutral-800 shadow-slate-800 shadow-2xl text-white rounded-s-3xl'>
            <div>6,500ft <FaThinkPeaks className='inline ml-2 size-6' /></div>
            <div>4.5km <GiPathDistance className='inline ml-2 size-6' /></div>
            <div>2-3hrs <GiDuration className='inline ml-2 size-6' /></div>
          </div>
        </div>

        <Image  src="https://res.cloudinary.com/thetrail/image/upload/ar_3:2,c_auto,h_480/v1720878460/Beas-Kund-Trek/beas_kund_closeup_landscape.jpg"
            height={250}
            width={400}
            alt="The Trail Makers" 
            sizes="(max-width: 768px) 400px, 800px" 
            className="object-cover w-full my-12">
        </Image>

        <div className='leading-7 text-base font-medium mx-4 text-neutral-700'>

          <p>
          We will start moving aound 9am in the morning. Usually it takes around 
          2-3hr to reah the car pickup point near Dhundi. Do not rush cherish the 
          last moents here. All the big peaks will gradually strat fading away 
          in the Background, as you start moving forward to Dhundi, or may I say Backward?
          </p><br/>
          
        </div>

        <div className='h-2 my-8 bg-black'></div>
  </section>

    
  



{/* ////////////////////////////////////// Peaks from Beas Kund Trek///////////////////////////////////////////////////////////////////////////////////////////////////// */}
    

<section className='bg-slate-200  py-20 text-cyan-950 md:px-[calc((100vw-600px)/2)]'>

        <div className='flex px-8 '>
          <GiSummits className='text-sky-950 size-20 shrink-0'/>
          <h3 className='text-5xl text-right font-extrabold uppercase'>
            Peaks from Beas Kund Trek
          </h3>
        </div>
        
        <div className='p-4 mr-6'>
          <p className='py-2'>
            From Beas Kund you can see where the <strong>Dhauladhar and Pirpanjal Range  meets.</strong> 
            From the start of the trek you can see the Hanuman Tibba, and slowly other peaks starts to unfold.
          </p>
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
            Alternate Routes to Beas Kund Trek
          </h3>
        </div>
        
        <div className='p-4 mr-6 text-neutral-300'>

          <p className='py-2 text-yellow-400'>There is practically only <strong>one other route</strong> to Beas Kund.</p>

          <div className='mt-8'>
            <div className='flex items-center'>
              <FaCircle className='size-3 mr-2 text-yellow-500 '/>
              <h5 className='text-xl font-semibold'>Path 1</h5>
            </div>
            <h6 className='text-lg font-extralight'>Lohali Thatch - Lady Leg - Beas Kund</h6>
            <p className='mt-4 '>This route is mostly taken for Friendship Peak Expedition. Little steeper 
              and little longer but otherwise a perfectly beautiful route. The climb to Ladyleg from Lohali is 
              bit steeper, also is the descend to Beas Kund is little risky. Though you can find a more 
              mesmerising view of the beas kund valley from Lady leg.
            </p>

            <p className='mt-4'> From Moridugh, the trail to Bhrigu Lake is little longer, but this one become accessible 
              from start of May, before the Gulaba-Raulikholi Route.
            </p>
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
            question="what is the Best Time/Season for Beas Kund Trek ?" 
            answer="The best time 
            to do the Beas Kund Trek is from May to July and then again 
            from September to October. During these months, the weather is 
            relatively stable, with clear skies and comfortable temperatures, 
            making it ideal for trekking. Avoid monsoon months as it gets 
            colder and much less view at that time."/>

          <Accordion 
            question="How To Reach The Starting Point, that is Manali" 
            answer="Manali is well-connected by road and air. The Best way to 
            reach Manali is to take Volvo Semi-Sleepers from Delhi or, Chandigarh. 
            All are overnight buses. From Chandigarh it takes around 8-9hrs, 
            from Delhi it is 12-14hrs. Or, if you are a group, you can take a 
            cab also. There is Another way, take flight from Delhi to Bhuntar.
            But know that, flights get cancelled in bad weathers and it is Expensive."/>

          <Accordion 
            question="How Difficult is Beas Kund Trek?" 
            answer="The Beas Kund Trek is a very easy trek, perfect for the first Time 
            Trekkers, except for the boulder section over all route is extremely easy. And the 
            climbs are also very gradual and short."/>

          <Accordion 
            question="Can Beas Kund Trek be done in One Day?" 
            answer=" Yes, Surely. The route is hardly 15km. You can start from dhundi around 
            8am in the morning, depending upon your speed you can come back between 2pm to 6pm. 
            Carrry sufficient water and food for the trail, though there is multiple water sources 
            on the way."/>

          <Accordion 
            question="Can we do Beas Kund Trek on our Own?" 
            answer="Yeah, absolutely, if you are fit enough to carry 15-20kg load, you can do the trek 
            your own very easily. Make sure you get the forest permit from Manali. And carry back all your garbages 
            to Plains."/>
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

      <div className='flex flex-col md:grid md:grid-cols-2 font-light mx-4 my-10 tracking-wide text-sm'>  
                                                                  
                                                                  {/* Add How to Choose/ Guide Links to all Items */}

          <div className='my-4'>
            <div className='uppercase text-3xl font-extrabold'>Packs</div>
            <ul className=''>
              <li className='flex  items-center'>
                <MdCheckBoxOutlineBlank className='inline mr-2'/>
                Rucksack with Raincover (40L+)
              </li>
              <li className='flex  items-center'>
                <MdCheckBoxOutlineBlank className='inline mr-2'/>
                Knapsack/small day bag (10L)
              </li>
            </ul>
          </div>

          <div className='my-4'>
            <div className='uppercase text-3xl font-extrabold'>Footware</div>
            <ul className=''>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Trekking Specific Shoe/Boot
            </li>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Lightweight Sandal
            </li>
            </ul>
          </div>

          <div className='my-4'>
            <div className='uppercase text-3xl font-extrabold'>Clothing</div>
            <ul className=''>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>SunCap</li>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>WoolenCap</li>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>Balaclava/Buff</li>
            
            <br/>

            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Full Sleeve Tshirt (2)</li>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Half Sleeve Tshirt (2)</li>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Trek Pant Full (2)</li>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Trek Pant Half (1)</li>

            <br/>

            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Fleece (1)</li>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Down/Feather/Synthetic Jacket (1)</li>

            <br/>

            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Waterproof Jacket/Raincoat/Poncho (1)</li>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Rain Pant (1)</li>

            <br/>

            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Gloves Inner (1)</li>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Trekking Gloves (1)</li>

            <br/>

            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Cotton Socks (2)</li>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Woolen Socks (2)</li>
            </ul>
          </div>
          
          <div className='my-4'>
            <div className='uppercase text-3xl font-extrabold'>Accesories</div>
            <ul className=''>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Sunglass (cat 3, Side Protection)</li>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Head Torch (with Extra Batteries)</li>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Water Bottles (2L)</li>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Trekking Poles</li>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Power Bank</li>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Light weight Towel</li>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Lunch Box with Lid</li>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Mug & Spoon</li>
            </ul>
          </div>
          
          <div className='my-4'>
            <div className='uppercase text-3xl font-extrabold'>Personal Items</div>
            <ul className=''>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Sunscreen (Spf 50+)</li>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Toothbrush, Toothpaste/Mouthfreshner</li>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Paper soap/Sanitizer</li>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Lip Balm</li>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Toilet Paper</li>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Personal Medicines</li>
            <li className='flex  items-center'>
              <MdCheckBoxOutlineBlank className='inline mr-2'/>
              Simple FirstAid Kit</li>
            </ul>
          </div>

      </div>

      <div className='mx-10 text-center py-2 text-yellow-400'><strong className='font-extralight'>Pack Similar Items in separate Waterproof Pouches or, 
        Strong Garbage Bags. Carry Extra Garbage Bags for Garbage Disposal.</strong></div>
      <div className='text-xs mx-10 text-center py-2 text-white'>
        (The checklist may differ a little for Indivisuals, going to do the trek on your own, so procceed carefully)</div>
 
    </section>

    <div className='pb-2 bg-gradient-to-b from-black to-transparent'></div>
    <div className='p-4 h-2 bg-gradient-to-t from-black to-transparent'></div>

{/* ////////////////////////////////////// Inclusion & Exclusions //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
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
            <li className='flex'><GiCheckMark className='size-5 text-yellow-400 min-w-5 mr-2'/>Transport : Manali - Dhundi</li>
            <li className='flex'><GiCheckMark className='size-5 text-yellow-400 min-w-5 mr-2'/>Transport : Dhundi - Manali</li>
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
          <h3 className='text-4xl below-xs:text-2xl text-left font-extrabold uppercase'>
            Similar Treks
          </h3>
          <GiCardRandom className='text-sky-400 size-24 shrink-0'/>
        </div>
      <div className="px-4 py-4 flex overflow-x-auto snap-x snap-mandatory no-scrollbar">
          {mockdata
          .filter(trek => trek.Index === 101 || trek.Index === 102)
          .map((treks) => (<Scrollables {...treks} key={treks.Index} />))}
      </div>
     </div>       

    <div className='py-8'>
        <div className='flex px-8  items-center justify-start'>
          <h3 className='text-4xl below-xs:text-2xl text-left font-extrabold uppercase'>
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