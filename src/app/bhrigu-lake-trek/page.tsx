import React from 'react'
import Image from 'next/image'

function page() {
  return (
    <main className="min-h-screen bg-black text-white no-scrollbar">
      <div className='bg-gradient-to-b from-black to-50% to-white h-[100vh] relative'>

        <Image src="https://res.cloudinary.com/thetrail/image/upload/v1714145641/bhrigu_lake_banner.jpg"
        className='object-cover object-[25%] w-full md:object-bottom  mix-blend-multiply absolute'
        style={{ width: "100%", height: "100vh"}}
        height={800}
        width={400} 
        sizes="(max-width: 768px) 100vw, 100vw"
        alt="Climbing towards bhrigu lake"></Image>

        <div className='absolute p-16 flex flex-col justify-center items-center w-full '>
          <h1 className='text-8xl lg:text-[10rem] xl:px-40 text-center font-bold uppercase mx-auto'>Bhrigu Lake Trek</h1>
        </div>
      </div>


      <div className='bg-stone-900 pb-20'>
        <h4 className='uppercase text-3xl font-semibold p-8 pr-24 pb-0'>Hidden Alpine Lake near Manali</h4>
        <div className='p-8 pr-16 leading-7 text-stone-400'>
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
            Encircled by snow-capped peaks, the lake's tranquil waters reflect the surrounding beauty, 
            creating a serene atmosphere that's perfect for meditation and introspection. Legend has it 
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

      <div className='bg-green-900'>
        <h3 className='text-5xl font-extrabold px-6 pl-20 py-20 text-right md:text-center md:mx-[10%] uppercase'>
          Each Day of Bhrigu Lake Trek in Details</h3>
        
        <div className='p-4'>
          <div className='flex justify-between items-start mb-8'>
            <h4 className='text-4xl'>Day 1</h4>
            <div>Manali</div>
          </div>

          <Image  src="https://res.cloudinary.com/thetrail/image/upload/v1714145641/bhrigu_lake_banner.jpg"
          height={200}
          width={800}
                  alt="The Trail Makers" sizes="(max-width: 768px) 250px, 800px" 
                  style={{width: '100%',height: '160px' }} 
                  className="object-cover w-full object-[0%_60%]">

          </Image>

          <div className='pr-6 leading-7 text-stone-200'>
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
            tapestry of nature's wonders that left them in awe.
            </p><br />

            <p>
            As the sun dipped below the horizon, painting the sky in hues of 
            orange and pink, weary yet exhilarated, they made camp beneath a 
            canopy of stars, eager for the adventures that awaited them on the 
            morrow.
            </p><br />
          </div>

        </div>
      </div>


    </main>
  )
}

export default page