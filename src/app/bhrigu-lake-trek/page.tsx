"use client"

import React from 'react'
import Image from 'next/image'
import Accordion from '@/components/accordion'
import Article from '@/components/article'
import articleData from '@/data/articles.json'
import mockdata from '@/data/homepage_cards.json'
import JoinDate from '@/components/joinDate'
import GalleryImage from '@/components/galleryImage'
import Link from 'next/link'

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

    <section className='bg-black flex flex-wrap justify-center items-center'>
      <div>
        <h5 className='p-4 font-semibold'>Duration</h5>

      </div>

      <div>
        <h5 className='p-4 font-semibold'>Difficulty</h5>
      </div>

      <div>
        <h5 className='p-4 font-semibold'>Starting Point</h5>
      </div>

      <div>
        <h5 className='p-4 font-semibold'>Highest Elevation</h5>
      </div>

      <div>
        <h5 className='p-4 font-semibold'>Trail Length</h5>
      </div>
    </section>

{/* ////////////////////////////////////////Short Intro & Join the Date////////////////////////////////////////////////////////////////////////////////////////// */}

  

      <section className='bg-green-950'>
        <h2 className='text-3xl font-semibold p-8 pr-12 md:pr-0 pb-0 max-w-[400px]'>Easiest Alpine Grassland and Lake Trek in Manali</h2>
        <div className='p-8 max-w-[95%] md:pr-0 leading-7 text-stone-300'>
            <p>
            In Life, if you should do an Alpine Trek, be how small it is, how weak you are, it should be Bhrigu Lake Trek.
            </p><br />

            <p>
            Reasons? you are completely noob, still you can do it, all you have to do is walk slow ans steady, the Alpine Grassfield 
            distant spiky small white peaks, all starts to unfold around you.
            </p><br/>
            
            <p>
            The tiny little colourful flowers, some as small as a button,
            blue and yellow, perfectly spread across the field, with the green grass, which looks like, as if someone  have mowed the lawn 
            too perfect, as natural as it should be.
            </p><br />

            <p>
            You can see the distant forest, of pine, birch and someother trees, brown in color, may be hiding a bear.
            </p><br/>

            <p>
            Then as you climb higher, comes the snow, speard upon the slanted canvas, and you gotta climb that. Most of us never have to 
            risk the life in cities, unless you are doing some particular works, but here you will, or, atleast you will think you will.  
            </p><br/>

            <p>
            But, no one dies rolling down from a snowfield, but yeah the thrill that you will feel looking down will be too real, you don&apos;t
            really feel it until you are there. 
            </p>

            <p>
            After a very hard climb, and a long walk, you will reach the lake you were looking for. At the height of, 14,000ft, a small icy pond, 
            on one side shielded by the mountain wall, on another side open to a vast land of uncountable spiky peaks of Pir Panjal and Dhauladhar Range.
            </p><br />

            <p>
            But my friend, the Story doesn&apos;t ends here, how will you get down the snowy slope that you have worked so hard to climb. No worries, this is a
            very fun part, you slide. Well, the tired legs will a bit at first, but as you start to have fun there is no stopping.
            </p><br/>

            <p>
            Still the worst part is, it ends too quickly. For adventerous souls, we have other treks as well, for longer snow slides.
            </p><br />
          
          </div>
      </section>



{/* ///////////////////////////////////////Join The Team/////////////////////////////////////////////////////////////////////////// */}


      <section className=''>
        <h3 className='text-5xl uppercase font-bold m-8'>Join The Team</h3>
        <div className='m-8'>
          <div className='text-3xl max-w-[80%] font-light'>Trek Cost with The Trail Makers</div>
          <div className='text-5xl font-bold text-yellow-500 mt-4 mb-1'>8,500/-</div>
          <div className='text-sm max-w-[80%] text-slate-300 font-light'>* Stay & Fooding at Manali Included</div>
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


      <section className='flex flex-col rounded-3xl bg-white text-black m-4 my-24'>
        <h3 className='text-5xl font-bold uppercase m-4 mb-0 max-w-[50%]'>Brief Itinerary</h3>
        <div className='m-4 font-mono text-lg font-semibold'>
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
        <div className="p-4 my-24  flex overflow-x-auto snap-x snap-mandatory no-scrollbar">
          {mockdata.map((treks) => <GalleryImage {...treks} key={treks.Index} />)}
        </div>
      </section>


{/* ///////////////////////////////////////Trek In Details/////////////////////////////////////////////////////////////////////////////////////// */}



      <section className='bg-emerald-950 lg:text-lg rounded-t-[4rem] md:mx-[20%] lg:mx-[25%] xl:mx-[30%]'>
        <h3 className='text-5xl text-yellow-500 font-extrabold px-6 py-20 text-right uppercase'>
          Each Day of Bhrigu Lake Trek in Details
        </h3>

        <div className='mx-4'>
          <div className='flex justify-between items-center mb-4 pt-8'>
            <h4 className='text-6xl font-extrabold bg-amber-500'>Day 1</h4>
            <div>Manali</div>
          </div>

          <div className='pt-4'>
            <div className='text-slate-300'>Altitude : 6500ft</div>
            <div className='text-slate-300'>Trail Length : NIL</div>
            <div className='text-slate-300'>Duration : NIL</div>
          </div>

          <Image  src="https://res.cloudinary.com/thetrail/image/upload/v1714145641/bhrigu_lake_banner.jpg"
              height={200}
              width={800}
              alt="The Trail Makers" sizes="(max-width: 768px) 250px, 800px" 
              style={{width: '100%',height: '160px' }} 
              className="object-cover w-full object-[0%_90%] my-12">
          </Image>

          <div className='leading-7 text-stone-300'>
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

            <p>Don&apos;t forget to check out our handy guides:</p>

            <div><Link href={"/contact"} className='text-sky-500'>Where to snag adventure gear in Manali?</Link></div>
            <div><Link href={"/contact"} className='text-sky-500'>Cool spots to explore in Manali on foot</Link></div>

            <br/>
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
            <h4 className='text-6xl flex-shrink-0 bg-amber-500'>Day 2</h4>
            <div className='text-right'>Manali - Gulaba - Raulikholi</div>
          </div>

          <div className='pt-4'>
            <div className='text-slate-300 pt-4'>Altitude : 6500ft - 9500ft - 12,500ft</div>
            <div className='text-slate-300'>Trail Length : 6km</div>
            <div className='text-slate-300'>Duration : 3-5 hrs</div>
          </div>

          <Image  src="https://res.cloudinary.com/thetrail/image/upload/v1714145641/bhrigu_lake_banner.jpg"
              height={200}
              width={800}
              alt="The Trail Makers" sizes="(max-width: 768px) 250px, 800px" 
              style={{width: '100%',height: '160px' }} 
              className="object-cover w-full object-[0%_90%]  my-12">
          </Image>

          <div className='leading-7 text-stone-300'>
            <p>
            <span className='font-bold'></span>Preparation: First things first, freshen up and double-check your gear. Raincoat? Torch? 
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
            <h4 className='text-6xl shrink-0 bg-amber-500'>Day 3</h4>
            <div className='text-right'>Raulikholi - Bhrigu Lake- Raulikholi</div>
          </div>
          <div className='text-slate-300 pt-4'>Altitude : 12500ft - 14,090ft - 12,500ft</div>

          <Image  src="https://res.cloudinary.com/thetrail/image/upload/v1714145641/bhrigu_lake_banner.jpg"
              height={200}
              width={800}
              alt="The Trail Makers" sizes="(max-width: 768px) 250px, 800px" 
              style={{width: '100%',height: '160px' }} 
              className="object-cover w-full object-[0%_90%] my-12">
          </Image>

          <div className='leading-7 text-stone-300'>
            <p>
            As the golden rays of the morning sun kissed the quaint town of Manali, 
            adventurers from around the world gathered, their hearts filled with 
            excitement and anticipation. Armed with sturdy boots and backpacks, they 
            set out on the trail leading to the mystical Bhrigu Lake.
            </p><br />

            <p>
            The trek commenced with a gentle ascent through lush green forests, 
            the air echoing with the melodious chirping of birds. Each step brought 
            them closer to the heart of the Himalayas, where legends whispered of a 
            sacred lake nestled amidst towering peaks.
            </p><br />

            <p>
            As the day unfolded, the trail unveiled its treasures - meandering 
            streams, vibrant wildflowers, and panoramic vistas that took their 
            breath away. With every turn, the landscape transformed, weaving a 
            tapestry of nature&apos;s wonders that left them in awe.
            </p><br />

            <p>
            As the sun dipped below the horizon, painting the sky in hues of 
            orange and pink, weary yet exhilarated, they made camp beneath a 
            canopy of stars, eager for the adventures that awaited them on the 
            morrow.
            </p><br />
          </div>
        </div>

        
        <div className='h-2 my-8 bg-black'></div>

        <div className='mx-4'>
          <div className='flex justify-between items-center mb-4 mt-16 gap-4 '>
            <h4 className='text-6xl flex-shrink-0 bg-amber-500'>Day 4</h4>
            <div className='text-right'>Raulikholi - Gulaba - Manali</div>
          </div>
          <div className='text-slate-300 pt-4'>Altitude : 12,500ft - 9500ft - 6500ft</div>

          <Image  src="https://res.cloudinary.com/thetrail/image/upload/v1714145641/bhrigu_lake_banner.jpg"
              height={200}
              width={800}
              alt="The Trail Makers" sizes="(max-width: 768px) 250px, 800px" 
              style={{width: '100%',height: '160px' }} 
              className="object-cover w-full object-[0%_90%] my-12">
          </Image>

          <div className='leading-7 text-stone-300'>
            <p>
            As the golden rays of the morning sun kissed the quaint town of Manali, 
            adventurers from around the world gathered, their hearts filled with 
            excitement and anticipation. Armed with sturdy boots and backpacks, they 
            set out on the trail leading to the mystical Bhrigu Lake.
            </p><br />

            <p>
            The trek commenced with a gentle ascent through lush green forests, 
            the air echoing with the melodious chirping of birds. Each step brought 
            them closer to the heart of the Himalayas, where legends whispered of a 
            sacred lake nestled amidst towering peaks.
            </p><br />

            <p>
            As the day unfolded, the trail unveiled its treasures - meandering 
            streams, vibrant wildflowers, and panoramic vistas that took their 
            breath away. With every turn, the landscape transformed, weaving a 
            tapestry of nature&apos;s wonders that left them in awe.
            </p><br />

            <p>
            As the sun dipped below the horizon, painting the sky in hues of 
            orange and pink, weary yet exhilarated, they made camp beneath a 
            canopy of stars, eager for the adventures that awaited them on the 
            morrow.
            </p><br />
          </div>
        </div>


      </section>


{/* ////////////////////////////////////// FAQ ///////////////////////////////////////////////////////////////////////////// */}


      <section className='bg-black md:mx-[20%] lg:mx-[25%] xl:mx-[30%]'>
        <div className='px-8'>
          <h3 className='text-5xl font-extrabold pt-20 text-left uppercase'>
            faq
          </h3>
          <h6 className='w-[70%]'>frequently asked questions about bhrigu lake trek</h6>
        </div>

        <div className='mx-[10%] py-20'>
          <Accordion question="Am I fit enough for trekking?" answer="My answer"/>
          <Accordion question="Am I fit enough for trekking?" answer="My answer"/>
          <Accordion question="Am I fit enough for trekking?" answer="My answer"/>
          <Accordion question="Am I fit enough for trekking?" answer="My answer"/>
          <Accordion question="Am I fit enough for trekking?" answer="My answer"/>
        </div>

      </section>


{/* ////////////////////////////////////// What to Pack///////////////////////////////////////////////////////////////////////////////////////////////////// */}
    
    <section className='bg-red-600 h-96 md:mx-[20%] lg:mx-[25%] xl:mx-[30%]'>
      <div className='px-8 text-right flex flex-col items-end'>
          <h3 className='text-5xl font-extrabold pt-20 uppercase w-60'>
            What to Pack
          </h3>
          <h6 className='w-[70%]'>There is <strong className='text-amber-200'>no bad weather</strong> only bad clothing</h6>
      </div>

    </section>

{/* ////////////////////////////////////// Inclusion & Exclusions //////////////////////////////////////////////////////////////////////////////////////////////////////// */}

    <section className='flex bg-sky-600 p-4 justify-evenly md:mx-[20%] lg:mx-[25%] xl:mx-[30%]'>

      <section className='flex flex-col w-[49%]'>
        <h4 className='text-3xl font-medium mb-2'>Inclusions</h4>
        <div className='flex flex-col'>
          <ul className='list-disc pl-5'>
            <li>Day 1 Manali Stay in Homestay</li>
            <li>Stay in Tent During Trek [ 3 Sharing basis ]</li>
            <br/>
            <li>Food Day 1 breakfast to Day 4 breakfast</li>
            <li>Meals [breakfast + Lunch + Snacks + Dinner]</li>
            <br/>
            <li>Transport : Manali - Gulaba</li>
            <li>Transport : Gulaba - Manali</li>
            <br/>
            <li>Mountaineering Course certified Guide</li>
            <li>Mountaineering Course certified Trek Leader</li>
            <li>Cook, porter/mule for Common luggage</li>
            <br/>
            <li>Permit & Camping Fees</li>
            <li>Safety Equipments [Climbing Rope, Crabiners, pulleys, etc.]</li>
            <li>First Aid Kit</li>
            <li>Sleeping Bag</li>
            <li>Sleeping Mattress</li>
            <li>Kitchen Tent</li>
            <li>Dining tent</li>
            <li>Toilet Tent</li>
          </ul>
        </div>
      </section>

      <div className='w-[3px] rounded-full bg-white mx-2'></div>

      <section className='flex flex-col w-[49%]'>
        <h4 className='text-3xl font-medium '>Exclusions</h4>
          <div className='flex flex-col'>
            <ul className='list-disc pl-5'>
              <li>Insurance Fees</li>
              <li>Camera charges or, any similar fees</li>
              <li>Any Specially ordered meal, except the inclusions</li>
              <li>Anything not mentioned in Inclusions</li>
            </ul>
          </div>
      </section>

    </section>

{/* //////////////////////////////////////Articles Section///////////////////////////////////////////////////////////////////////////////////////////// */}
    
    <section className=' md:mx-[10%] '>
      <div className='px-8 text-left flex flex-col items-start'>
          <h3 className='text-5xl font-extrabold pt-20 uppercase max-w-60'>
            Food for Soul
          </h3>
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

{/* ///////////////////////////////////Similar Activities/////////////////////////////////////////////////////////////////////////////////////////////// */}
    <section>

    </section>


    
    </main>
  )
}

export default page