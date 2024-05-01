"use client"

import React from 'react'
import Image from 'next/image'
import Accordion from '@/components/accordion'
import Article from '@/components/article'
import articleData from '@/data/articles.json'
import mockdata from '@/data/homepage_cards.json'
import JoinDate from '@/components/joinDate'
import GalleryImage from '@/components/galleryImage'

function page() {
  return (
    <main className="min-h-screen bg-stone-900 text-white no-scrollbar relative">

      <div className='bg-gradient-to-b from-black to-50% to-white h-[80vh] relative'>

        <Image src="https://res.cloudinary.com/thetrail/image/upload/v1714145641/bhrigu_lake_banner.jpg"
        className='object-cover object-[25%] w-full md:object-bottom  mix-blend-multiply absolute'
        style={{ width: "100%", height: "80vh"}}
        height={400}
        width={800} 
        sizes="(max-width: 768px) 100vw, 100vw"
        alt="Climbing towards bhrigu lake"></Image>

        <div className='absolute p-16 flex flex-col justify-center items-center w-full '>
          <h1 className='text-[20vw] leading-[1] lg:text-[10rem] xl:px-40
           text-center font-bold uppercase mx-20'>Bhrigu Lake Trek</h1>
        </div>
      </div>


{/* ////////////////////////////////////////Short Intro////////////////////////////////////////////////////////////////////////////////////////// */}



      <div className='bg-stone-900 md:mx-[20%] lg:mx-[25%] xl:mx-[30%]'>
        <h4 className='uppercase text-3xl font-semibold p-8 pr-24 pb-0'>Hidden Alpine Lake near Manali</h4>
        <div className='p-8 pb-8 pr-16 leading-7 text-stone-400'>
            <p>
            Brigu Lake Trek offers a mesmerizing journey through the picturesque landscapes of Himachal Pradesh, India. 
            Situated at an altitude of 4,300 meters (14,100 feet) above sea level, this trek is a delightful blend of 
            adventure, natural beauty, and spiritual significance. Named after Sage Brighu, who is believed to have meditated 
            at the banks of this pristine lake, the trek attracts adventurers and spiritual seekers alike.
            </p> <br />

            <p>
            The trek typically begins from Gulaba, a scenic spot near Manali, and winds through lush green meadows, 
            dense forests of pine and oak, and breathtaking alpine vistas. Trekkers navigate through narrow trails, 
            crossing gushing streams and alpine flora, while being surrounded by towering Himalayan peaks.
            </p><br />

            <p>
            One of the highlights of the Brigu Lake Trek is reaching the azure-blue Brigu Lake itself. 
            Encircled by snow-capped peaks, the lake&apos;s tranquil waters reflect the surrounding beauty, 
            creating a serene atmosphere that&apos;s perfect for meditation and introspection. Legend has it 
            that the lake never freezes completely, even in the coldest winters, adding to its mystique.
            </p><br />

            <p>
            Throughout the trek, trekkers encounter the warm hospitality of local communities, who often 
            provide homestay accommodations and delicious traditional meals, enhancing the cultural experience. 
            The best time to undertake the Brigu Lake Trek is usually from May to October when the weather is 
            conducive and the trails are relatively accessible.
            </p><br />
            
            <p>
            Overall, the Brigu Lake Trek offers an unforgettable adventure amidst breathtaking Himalayan landscapes, 
            making it a must-do for nature lovers, adventure enthusiasts, and those seeking a deeper spiritual 
            connection with the mountains.
            </p>

          </div>
      </div>



{/* ///////////////////////////////////////Join The Team/////////////////////////////////////////////////////////////////////////// */}


      <section className='md:mx-[20%] lg:mx-[25%] xl:mx-[30%]'>
        <h3 className='text-5xl uppercase font-bold p-8'>Join The Team</h3>
        <div className='flex ml-6 items-center overflow-x-auto
          snap-x snap-mandatory no-scrollbar'>
          {mockdata.map((treks) => 
            treks.Name.includes('Bhrigu Lake Trek')?
              (treks.Date.map((dates) => 
                <JoinDate date={dates} key={dates}/>)) : null)}
        </div>
        <div className='p-8 text-sm'>
        <span className='font-bold'>To Create Your Own Group.</span>
        <span className='text-yellow-500 font-bold'> Click Here.</span>
        <div>Join on any date with your friends.</div>
        </div>
        </section>



{/* ////////////////////////////////////////Image Gallery//////////////////////////////////////////////////////////////////////////////////////////////////////// */}

      <section>
      <div className="p-6 flex overflow-x-auto snap-x snap-mandatory no-scrollbar">
        {mockdata.map((treks) => <GalleryImage {...treks} key={treks.Index} />)}
      </div>
      </section>

{/* ///////////////////////////////////////Trek In Details/////////////////////////////////////////////////////////////////////////////////////// */}



      <section className='bg-green-900 rounded-t-[4rem] md:mx-[20%] lg:mx-[25%] xl:mx-[30%]'>
        <h3 className='text-5xl font-extrabold px-6 pl-16 py-20 text-right uppercase'>
          Each Day of Bhrigu Lake Trek in Details
        </h3>

        <div className=''>
          <div className='flex justify-between items-start mb-8 px-8 pt-8'>
            <h4 className='text-6xl'>Day 1</h4>
            <div>Manali</div>
          </div>

          <Image  src="https://res.cloudinary.com/thetrail/image/upload/v1714145641/bhrigu_lake_banner.jpg"
              height={200}
              width={800}
              alt="The Trail Makers" sizes="(max-width: 768px) 250px, 800px" 
              style={{width: '100%',height: '160px' }} 
              className="object-cover w-full object-[0%_90%]">
          </Image>

          <div className='pt-12 leading-7 text-stone-300 px-8'>
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

        <div className='h-2 my-8 bg-green-950'></div>

        <div className=''>
          <div className='flex justify-between items-start mb-8 px-8 pt-8'>
            <h4 className='text-6xl'>Day 2</h4>
            <div>Manali</div>
          </div>

          <Image  src="https://res.cloudinary.com/thetrail/image/upload/v1714145641/bhrigu_lake_banner.jpg"
              height={200}
              width={800}
              alt="The Trail Makers" sizes="(max-width: 768px) 250px, 800px" 
              style={{width: '100%',height: '160px' }} 
              className="object-cover w-full object-[0%_90%]">
          </Image>

          <div className='pt-12 leading-7 text-stone-300 px-8'>
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

        
        <div className='h-2 my-8 bg-green-950'></div>

        <div className=''>
          <div className='flex justify-between items-start mb-8 px-8 pt-8'>
            <h4 className='text-6xl'>Day 3</h4>
            <div>Manali</div>
          </div>

          <Image  src="https://res.cloudinary.com/thetrail/image/upload/v1714145641/bhrigu_lake_banner.jpg"
              height={200}
              width={800}
              alt="The Trail Makers" sizes="(max-width: 768px) 250px, 800px" 
              style={{width: '100%',height: '160px' }} 
              className="object-cover w-full object-[0%_90%]">
          </Image>

          <div className='pt-12 leading-7 text-stone-300 px-8'>
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

        
        <div className='h-2 my-8 bg-green-950'></div>

        <div className=''>
          <div className='flex justify-between items-start mb-8 px-8 pt-8'>
            <h4 className='text-6xl'>Day 4</h4>
            <div>Manali</div>
          </div>

          <Image  src="https://res.cloudinary.com/thetrail/image/upload/v1714145641/bhrigu_lake_banner.jpg"
              height={200}
              width={800}
              alt="The Trail Makers" sizes="(max-width: 768px) 250px, 800px" 
              style={{width: '100%',height: '160px' }} 
              className="object-cover w-full object-[0%_90%]">
          </Image>

          <div className='pt-12 leading-7 text-stone-300 px-8'>
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