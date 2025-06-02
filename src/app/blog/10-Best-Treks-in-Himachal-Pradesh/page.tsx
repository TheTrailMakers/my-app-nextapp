import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaBookOpen } from "react-icons/fa6";
import { BsFilePersonFill } from "react-icons/bs";
import { TbCalendarMonth } from "react-icons/tb";




export const metadata = {
  title: "10 Best Treks in Himachal Pradesh | The Trail Makers",
  description: "Explore the 10 best treks in Himachal Pradesh with The Trail Makers. From Hampta Pass to Great Himalayan National Park, discover breathtaking landscapes and unforgettable adventures. Join us for an unforgettable trekking experience in the heart of the Himalayas.",
  keywords: "Hampta Pass trek, Beas Kund trek, Bhrigu Lake trek, Pin Parvati Pass trek, Kheerganga trek, Indrahar Pass trek, Triund trek, Prashar Lake trek, Great Himalayan National Park trek, Serolsar Lake trek, Manali treks, Barshaini, Jibhi, Kasol, Dharamshala, Mcleodganj, Tirthan Valley, Himachal Pradesh trekking, best treks Himachal, The Trail Maker treks"
};


function page() {
  return (
    <main className='min-h-screen'>

      <div className='bg-red-500 flex flex-col w-full items-center justify-center text-white pt-12 pb-8'>
          <h1 className='px-12 text-4xl font-bold uppercase text-center'>The 10 Best Treks in Himachal Pradesh</h1>
          <h2 className='px-12 py-2 text-base font-normal text-center'>There are nearly 50 different treks in Himachal Pradesh. Having too many choices is great,
          but also confusing, isn’t it? We feel you.</h2>
          <div className='flex items-center justify-center text-white text-xs font-light py-6'>       
            <BsFilePersonFill className='inline mr-1 size-4'/>
            <div className='mr-8'>By Shamik Majumder</div>
            <TbCalendarMonth className='inline mr-1 size-5'/>
            <div>1st June, 2025</div>
          </div>
      </div>

     
      <Image src="https://res.cloudinary.com/dyz0zzyv8/image/upload/v1748872412/_1300603_irbeaq.jpg" 
            alt="Our founders by the Gephan Lake, sissu, himachal pradesh"
            width={400}
            height={300}
            sizes="(max-width: 768px) 400px, 800px" 
            className=" lg: px-[calc((100vw-800px)/2)] rounded-4xl object-cover w-full py-6"
            priority>
      </Image>
    
      



      <div className='lg: px-[calc((100vw-800px)/2)]'>

      <section className='leading-5'>

              <p className='font-medium text-lg leading-6 px-3 pt-4'>
              <span className='text-8xl bg-amber-500 text-white font-medium mr-3 float-left'>S</span>o, you’ve been working inside your cubicle in some glass and concrete skyscraper, or you’ve
              been studying for months on end for that research or exam, and your bheja (brain) is fried!
              You want to escape this mundane routine, do something that makes you feel alive again,
              experience something that is at the same time exhilarating and relieving.
              </p><br/>

          <p className='italic text-lg font-medium px-3'>
          <strong className='font-semibold'>But What?</strong>
          </p><br/>

              <p className='italic text-lg px-3'>
              <strong className='font-normal'>	The correct answer is: &quot;Trekking!&quot;</strong>
              </p><br/>

          <p className='italic text-lg font-medium px-3'>
          <strong className='font-semibold'>Why Trekking?</strong>
          </p><br/>

                <p className='px-3'>
                Because it disconnects you from the mundaneness of urban life and connects you to the most
                majestic and magnificent part of nature: <span className='font-semibold'>Mountains!</span> Treks offer you a unique blend of
                adventure, adrenaline rush, awe-inspiring natural beauty, and peaceful serenity that you can’t
                get anywhere else. Sweet, isn't it? The cherry on top? You can go on treks alone, with friends,
                and even with family.
                </p><br/>

          <p className='italic text-lg font-medium px-3'>
          <strong className='font-semibold'>But Where?</strong>
          </p><br/>

                <p className='px-3'>
                Where else but the ‘Land of the Snow-Clad Mountains’ or, as we endearingly call it, 
                <span className='font-semibold'>Himachal Pradesh</span>. Cradled amongst the Western Himalayan range, Himachal has treks in all shapes
                and sizes that you can choose from. From treks lasting between a day to a week, from easy
                treks to expert-level ones, snow-capped mountains to lush green grasslands, pine forests to
                slithering rivers, hostile mountains to friendly villages - you name it, treks in Himachal have it!
                </p><br/>

          <p className='italic text-lg font-medium px-3'>
          <strong className='font-semibold'>But how?</strong>
          </p><br/>

                <p className='px-3'>
                You’ve decided you want to go on a trek in Himachal. Great! But wait a second. Do you know
                where to start your trek from? More importantly, do you remember the trail you’d have to follow
                on the trek by heart because Google Maps isn’t going to be of any help up in the Himalayas?
                No? Well, you don’t have to worry because <span className='font-semibold'>“The Trail Makers”</span> have you covered. Led by a
                team of experienced trekkers, ‘The Trail Makers’ know every peak and valley in all Himachal
                treks, enabling you to experience the trek that suits you best in the best possible way.
                One last thing. You’d need a place to relax before you depart on that exhilarating trek and also
                to rejuvenate yourself when you’ve completed it. Basically, you need a ‘Home Away from
                Home’, or as we call it <span className='font-semibold'>“Pahadi Manzil”</span>. That’s it, you’re all set to depart on your dream
                Himachal trek
                </p><br/>
        </section>




        <section className='leading-5'>

          <h4 className='text-5xl font-medium px-3'>
          <strong className='font-bold'>Best Treks in Himachal Pradesh</strong>
          </h4><br/>

                <p className='px-3'>
                There are nearly 50 different treks in Himachal Pradesh. Having too many choices is great,
                but also confusing, isn’t it? We feel you. As we said, Himachal has treks for everyone. But do
                you know which trek is the best for you? ‘The Trail Makers’ can help you with it. To make
                things easier, we’ve compiled a list of the 10 Best Treks in Himachal Pradesh (with a few
                honorary mentions). See whether you can find the one that matches your requirements and
                catches your heart here.
                </p><br/>

          <h5 className='italic text-2xl font-medium px-3'>
          <strong className='font-bold italic'>The Famous Five: Most Popular Treks</strong>
          </h5><br/>

                <p className='px-3'>
                  If your urge for trekking started after watching a viral trekking reel on Instagram, and you want
                  to walk down one of those “Himachal treks that you can’t miss”, these five are for you. The
                  Famous Five are the most popular treks in the Himachal region and attract the most footfall.
                  If you love socialising or have a chronic case of FOMO, these are the ones to go for.
                </p><br/>



{/* Beas Kund Trek*/}

            <h6 className='text-2xl pt-8 font-medium px-3 text-sky-700 leading-3'>
            <strong className='font-extrabold'>1. BEAS KUND</strong>
            </h6><br/>

                <Image src="https://res.cloudinary.com/dyz0zzyv8/image/upload/w_800,h_600,c_fill,f_auto,g_south/IMG_20231022_102433_wggaqi.jpg" 
                  alt="View of Beas Kund with Hanuman Tibba in the background" 
                  width={400}
                  height={300}
                  sizes="(max-width: 768px) 400px, 800px" 
                  className="lg:max-h-96 object-cover w-full"
                  priority>
                </Image>

                <ul className='px-5 py-10 grid grid-cols-2 list-disc gap-x-4 text-xs list-inside font-medium'>
                      <li className='list-disc'>Duration: 4 Days</li>
                      <li className='list-disc'>Difficulty Level: Easy</li>
                      <li className='list-disc'>Highest Altitude: Approx 12,500 feet (3,800 metres)</li>
                      <li className='list-disc'>Distance: 18 km</li>
                      <li className='list-disc'>Best Time to Visit: May to October</li>
                      <li className='list-disc'>Starting Point: Manali</li>
                </ul>

                <p className='px-3'>
                One of the best summer treks for beginners near Manali, Beas Kund offers the perfect blend
                of nature and adventure, with a slight tinge of mythology. Starting in the backyard of our
                <span className='font-semibold'> “Pahadi Manzil”</span>, you’ll cross numerous glacial streams, 
                walk under the covers of Pine and
                Walnut, and camp in mesmerising meadows during this four-day trek. This 18-kilometre trek
                will take you to Beas Kund, the pristine blue alpine lake, which is the source of the River Beas.
                As per the legends, the lake is named after Rishi Vyas, who had composed the epic
                Mahabharata. It is said that the sage meditated and bathed in this very lake in ancient times.
                That’s not all, though, as the Beas Kund Trek offers the majestic views of snow-covered
                Himalayan peaks like the Pin Pranjal Range, Dhauladhar Range, Friendship Peak, Deo Tibba,
                Hanuman Tibba, and Ladakhi Peak, amongst others.
                </p><br/>



      {/* Hampta Pass Trek */}

            <h6 className='text-2xl pt-8 px-3 font-medium text-sky-700 leading-3'>
            <strong className='font-extrabold'>2. HAMPTA PASS TREK</strong>
            </h6><br/>

                <Image src="https://res.cloudinary.com/dyz0zzyv8/image/upload/w_800,h_600,c_fill,f_auto,g_south/v1748871389/IMG_20240919_174959_yylylx.jpg" 
                  alt="Camp by a small stream" 
                  width={400}
                  height={300}
                  sizes="(max-width: 768px) 400px, 800px" 
                  className="lg:max-h-96 object-cover w-full"
                  priority>
                </Image>

                <ul className='px-5 py-10 grid grid-cols-2 list-disc gap-x-4 text-xs list-inside font-medium'>
                      <li className='list-disc'>Duration: 6 Days</li>
                      <li className='list-disc'>Difficulty Level: Easy-Moderate</li>
                      <li className='list-disc'>Highest Altitude: Approx 14,100 feet (4,300 metres)</li>
                      <li className='list-disc'>Distance: 29 km</li>
                      <li className='list-disc'>Best Time to Visit: June to September</li>
                      <li className='list-disc'>Starting Point: Manali</li>  
                </ul>

                <p className='px-3'>
                If you’re someone who wants to experience the perfect blend of everything that Himachal treks
                have to offer, the Hampta Pass Trek has to be your go-to choice. This 25-kilometre trek starts
                from <span className='font-semibold'> “Pahadi Manzil” </span>and ascends to over 14,000 feet in a matter of days. Often considered
                the best beginner-friendly crossover trek in the Himalayas, Hampta Pass offers a journey
                through the lush meadows of Kullu Valley and the barren beauty of Lahaul. All-engulfing
                forests, panoramic views of snow-clad mountains, and rocky trails, this trek offers it all. Then
                there are the scenic campsites under the star-studded night sky and the thrill of a lifetime as
                you cross not one but two glacial streams. While the view from the Pass is a memory worth
                cherishing in itself, the beauty of the crescent-shaped Chandratal Lake cannot be described
                in words, only experienced by being there. Although physically challenging, believe us when
                we say, “Every drop of sweat is worth it!”.
                </p><br/>

          </section>

        </div>
    </main>
  )
}

export default page