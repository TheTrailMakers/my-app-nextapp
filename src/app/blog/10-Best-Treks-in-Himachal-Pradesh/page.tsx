import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaBookOpen } from "react-icons/fa6";
import { BsFilePersonFill } from "react-icons/bs";
import { TbCalendarMonth } from "react-icons/tb";
import { Span } from 'next/dist/trace';




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
            <div className='mr-8'>By Shamik Mazumder</div>
            <TbCalendarMonth className='inline mr-1 size-5'/>
            <div>1st June, 2025</div>
          </div>
      </div>

     
      <Image src="https://res.cloudinary.com/dyz0zzyv8/image/upload/v1748872412/_1300603_irbeaq.jpg" 
            alt="Our founders by the Gephan Lake, sissu, himachal pradesh"
            width={400}
            height={300}
            sizes="(max-width: 768px) 400px, 800px" 
            className=" lg: px-[calc((100vw-800px)/2)] rounded-4xl object-cover w-full "
            priority>
      </Image>
    
      



      <div className='lg: px-[calc((100vw-800px)/2)]'>

        <section className='leading-5'>

                <p className='text-base tracking-wide font-bold leading-6 px-3 pt-4'>
                <span className='text-8xl bg-amber-500 text-white font-medium mr-3 float-left'>S</span>o, you’ve been working inside your cubicle in some glass and concrete skyscraper, or you’ve
                been studying for months on end for that research or exam, and your bheja (brain) is fried!
                You want to escape this mundane routine, do something that makes you feel alive again,
                experience something that is at the same time exhilarating and relieving.
                </p><br/>

            <h5 className='italic text-lg font-medium mx-3 mb-2'>
            <strong className='font-semibold bg-sky-700 text-white rounded-full px-3'>But What?</strong>
            </h5>

                <p className='px-3'>
                <strong className='font-normal'>	The correct answer is: <span className='font-semibold'>&quot;Trekking!&quot;</span></strong>
                </p><br/>

            <h5 className='italic text-lg font-medium px-3 mb-2'>
            <strong className='font-semibold bg-sky-700 text-white rounded-full px-3'>Why Trekking?</strong>
            </h5>

                  <p className='px-3'>
                  Because it disconnects you from the mundaneness of urban life and connects you to the most
                  majestic and magnificent part of nature: <span className='font-semibold'>Mountains!</span> Treks offer you a unique blend of
                  adventure, adrenaline rush, awe-inspiring natural beauty, and peaceful serenity that you can’t
                  get anywhere else. Sweet, isn't it? The cherry on top? You can go on treks alone, with friends,
                  and even with family.
                  </p><br/>

            <h5 className='italic text-lg font-medium px-3 mb-2'>
            <strong className='font-semibold bg-sky-700 text-white rounded-full px-3'>But Where?</strong>
            </h5>

                  <p className='px-3'>
                  Where else but the ‘Land of the Snow-Clad Mountains’ or, as we endearingly call it, 
                  <span className='font-semibold'>Himachal Pradesh</span>. Cradled amongst the Western Himalayan range, Himachal has treks in all shapes
                  and sizes that you can choose from. From treks lasting between a day to a week, from easy
                  treks to expert-level ones, snow-capped mountains to lush green grasslands, pine forests to
                  slithering rivers, hostile mountains to friendly villages - you name it, treks in Himachal have it!
                  </p><br/>

            <h5 className='italic text-lg font-medium px-3 mb-2'>
            <strong className='font-semibold bg-sky-700 text-white rounded-full px-3'>But how?</strong>
            </h5>

                  <div  className='px-3'>
                  <p>
                  You’ve decided you want to go on a trek in Himachal. Great! But wait a second. Do you know
                  where to start your trek from? More importantly, do you remember the trail you’d have to follow
                  on the trek by heart because Google Maps isn’t going to be of any help up in the Himalayas?
                  </p><br/>

                  <p>No? Well, you don’t have to worry because <span className='font-semibold'>“The Trail Makers”</span> have you covered.
                   Led by a team of experienced Mountaineers, ‘The Trail Makers’ know every peak and valley in all Himachal
                  treks, enabling you to experience the trek that suits you best in the best possible way.
                  </p><br/>

                  <p>
                  One last thing. You’d need a place to relax before you depart on that exhilarating trek and also
                  to rejuvenate yourself when you’ve completed it. Basically, you need a ‘Home Away from
                  Home’, or as we call it <span className='font-semibold'>“Pahadi Manzil”</span>. 
                  </p><br/>

                  <p>
                  That’s it, you’re all set to depart on your dreamHimachal trek.
                  </p>
                  </div><br/>
        </section>




        <section className='leading-5'>

          <h3 className='text-5xl font-medium px-3'>
          <strong className='font-bold'>Best Treks in Himachal Pradesh</strong>
          </h3><br/>

                <p className='px-3'>
                There are nearly 50 different treks in Himachal Pradesh. Having too many choices is great,
                but also confusing, isn’t it? We feel you. As we said, Himachal has treks for everyone. But do
                you know which trek is the best for you? ‘The Trail Makers’ can help you with it. To make
                things easier, we’ve compiled a list of the 10 Best Treks in Himachal Pradesh (with a few
                honorary mentions). See whether you can find the one that matches your requirements and
                catches your heart here.
                </p><br/>

          <h4 className='italic text-2xl font-medium px-3'>
          <strong className='font-bold italic'>The Famous Five: Most Popular Treks</strong>
          </h4><br/>

                <p className='px-3'>
                  If your urge for trekking started after watching a viral trekking reel on Instagram, and you want
                  to walk down one of those “Himachal treks that you can’t miss”, these five are for you. The
                  Famous Five are the most popular treks in the Himachal region and attract the most footfall.
                  If you love socialising or have a chronic case of FOMO, these are the ones to go for.
                </p><br/>



                {/* Beas Kund Trek*/}
                <div>
                  <h5 className='text-2xl pt-8 font-medium px-3 text-sky-700 leading-3'>
                  <strong className='font-extrabold'>1. BEAS KUND</strong>
                  </h5><br/>

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
                </div>


                {/* Hampta Pass Trek */}
                <div>
                  <h5 className='text-2xl pt-8 px-3 font-medium text-sky-700 leading-3'>
                  <strong className='font-extrabold'>2. HAMPTA PASS TREK</strong>
                  </h5><br/>

                      <Image src="https://res.cloudinary.com/dyz0zzyv8/image/upload/w_800,h_600,c_fill,f_auto,g_south/v1748871389/IMG_20240919_174959_yylylx.jpg" 
                        alt="view of inderkilla from balu ka ghera camsite | The Trail Makers" 
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
                </div>


                {/* Bhrigu Lake Trek */}
                <div>
                    <h5 className='text-2xl pt-8 px-3 font-medium text-sky-700 leading-3'>
                    <strong className='font-extrabold'>3. BHRIGU LAKE TREK</strong>
                    </h5><br/>

                        <Image src="https://res.cloudinary.com/dyz0zzyv8/image/upload/w_800,h_600,c_fill,f_auto,g_south/v1748871389/IMG_20240919_174959_yylylx.jpg" 
                          alt="view of bhrigu lake with snow capped mountains in the background | The Trail Makers" 
                          width={400}
                          height={300}
                          sizes="(max-width: 768px) 400px, 800px" 
                          className="lg:max-h-96 object-cover w-full"
                          priority>
                        </Image>

                        <ul className='px-5 py-10 grid grid-cols-2 list-disc gap-x-4 text-xs list-inside font-medium'>
                              <li className='list-disc'>Duration: 4 Days</li>
                              <li className='list-disc'>Difficulty Level: Easy</li>
                              <li className='list-disc'>Highest Altitude: Approx 14,100 feet (4,300 metres)</li>
                              <li className='list-disc'>Distance: 20 km</li>
                              <li className='list-disc'>Best Time to Visit: May to October</li>
                              <li className='list-disc'>Starting Point: Manali</li>  
                        </ul>

                        <p className='px-3'>
                            Another popular choice for many trekkers with limited time on hand and a desire to ascend to
                        high altitudes of the Himalayas is the Bhrigu Lake trek. Get yourself ready at our beloved home
                        and starting point,<span className='font-semibold'> “Pahadi Manzil” </span>, before embarking on your quest for the sacred glacial
                        Bhrigu Lake, which sits in the middle of snow-capped peaks. Legends say that the lake got its
                        name from one of the Saptarshis, Maharishi Bhrigu, who used to meditate next to it. However,
                        the trek is not all about the destination but also about the journey. Most of the 20 kilometres
                        of this trek pass through alpine meadows with the Dhauladhar and Pir Panjal amongst others
                        in the backdrop. With increasing altitude, the lush greenery transforms into snowy terrain,
                        allowing you to experience it all. Camping in these meadows and the occasional meeting with
                        wild horses and sheep are additional bonuses of going on this beautiful trek.
                        </p><br/>
                </div>


                {/* Sar Pass Trek */}
                <div>
                    <h5 className='text-2xl pt-8 px-3 font-medium text-sky-700 leading-3'>
                    <strong className='font-extrabold'>4. SAR PASS TREK</strong>
                    </h5><br/>

                        <Image src="https://res.cloudinary.com/dyz0zzyv8/image/upload/w_800,h_600,c_fill,f_auto,g_south/v1748871389/IMG_20240919_174959_yylylx.jpg" 
                          alt="view of bhrigu lake with snow capped mountains in the background | The Trail Makers" 
                          width={400}
                          height={300}
                          sizes="(max-width: 768px) 400px, 800px" 
                          className="lg:max-h-96 object-cover w-full"
                          priority>
                        </Image>

                        <ul className='px-5 py-10 grid grid-cols-2 list-disc gap-x-4 text-xs list-inside font-medium'>
                              <li className='list-disc'>Duration: 6 Days</li>
                              <li className='list-disc'>Difficulty Level: Moderate</li>
                              <li className='list-disc'>Highest Altitude: Approx 13,800 feet (4,200 metres)</li>
                              <li className='list-disc'>Distance: 45 km</li>
                              <li className='list-disc'>Best Time to Visit: April to July</li>
                              <li className='list-disc'>Starting Point: Kasol</li>  
                        </ul>

                        <p className='px-3'>
                            Another popular choice for many trekkers with limited time on hand and a desire to ascend to
                        high altitudes of the Himalayas is the Bhrigu Lake trek. Get yourself ready at our beloved home
                        and starting point,<span className='font-semibold'> “Pahadi Manzil” </span>, before embarking on your quest for the sacred glacial
                        Bhrigu Lake, which sits in the middle of snow-capped peaks. Legends say that the lake got its
                        name from one of the Saptarshis, Maharishi Bhrigu, who used to meditate next to it. However,
                        the trek is not all about the destination but also about the journey. Most of the 20 kilometres
                        of this trek pass through alpine meadows with the Dhauladhar and Pir Panjal amongst others
                        in the backdrop. With increasing altitude, the lush greenery transforms into snowy terrain,
                        allowing you to experience it all. Camping in these meadows and the occasional meeting with
                        wild horses and sheep are additional bonuses of going on this beautiful trek.
                        </p><br/>
                </div>


                {/* Buran Ghanti Trek */}
                <div>
                    <h5 className='text-2xl pt-8 px-3 font-medium text-sky-700 leading-3'>
                    <strong className='font-extrabold'>5. BURAN GHANTI TREK</strong>
                    </h5><br/>

                        <Image src="https://res.cloudinary.com/dyz0zzyv8/image/upload/w_800,h_600,c_fill,f_auto,g_south/v1748871389/IMG_20240919_174959_yylylx.jpg" 
                          alt="view of bhrigu lake with snow capped mountains in the background | The Trail Makers" 
                          width={400}
                          height={300}
                          sizes="(max-width: 768px) 400px, 800px" 
                          className="lg:max-h-96 object-cover w-full"
                          priority>
                        </Image>

                        <ul className='px-5 py-10 grid grid-cols-2 list-disc gap-x-4 text-xs list-inside font-medium'>
                              <li className='list-disc'>Duration: 8 Days</li>
                              <li className='list-disc'>Difficulty Level: Moderate</li>
                              <li className='list-disc'>Highest Altitude: Approx 15,000 feet (4,500 metres)</li>
                              <li className='list-disc'>Distance: 30km</li>
                              <li className='list-disc'>Best Time to Visit: May to September</li>
                              <li className='list-disc'>Starting Point: Shimla</li>  
                        </ul>

                        <p className='px-3'>
                          With more than 30 kilometres to trek over 8 days and reaching the altitude of nearly 15,000
                        feet, the Buran Ghanti trek is definitely the most challenging amongst the Famous Five. But
                        with great challenges come great rewards, and Buran Ghati rewards you with an adventure
                        for life. If you want meadows, it will give you Dayara; if you want villages, this trail will give you
                        Barua and Janglik; if you want mountains, it offers the Dhauladhar Range; if you want lakes,
                        it will give you the Chandranahan Lake. If you seek forests, the trail will lead you through pine,
                        oak, maple, and birch. To receive these rewards, though, you have to cross the Buran Ghati
                        Pass, which will need some skilled manoeuvring and several streams and rivers. Nothing to
                        be worried about, though, with our experts from “The Trail Makers” guiding you through these
                        challenging bits. For those seeking an extra thrill, embark on this trek before June to
                        experience rappelling down an ice wall.
                        </p><br/>
                </div>


          <h4 className='italic text-2xl font-medium px-3 mt-8'>
          <strong className='font-bold italic'>The One Day Wonder: Day Trek</strong>
          </h4><br/>

                <p className='px-3'>
                  You may have made up your mind about going on your first trek, but the moment you see their
                duration, your smile turned into a frown. There’s no way you’re getting a 10-day break from
                your corporate job or convincing your college friends to go trekking in the Himachal for a week.
                What then? No trek? Absolutely not. The Trail Makers have something to offer that perfectly
                fits your needs: the Kheerganga trek. Or as we like to call it, the One Day Wonder.
                </p><br/>


                        {/* Kheerganga Trek */}
                        <div>
                            <h5 className='text-2xl pt-8 px-3 font-medium text-sky-700 leading-3'>
                            <strong className='font-extrabold'>6. KHEERGANGA TREK</strong>
                            </h5><br/>

                                <Image src="https://res.cloudinary.com/dyz0zzyv8/image/upload/w_800,h_600,c_fill,f_auto,g_south/v1748871389/IMG_20240919_174959_yylylx.jpg" 
                                  alt="view of bhrigu lake with snow capped mountains in the background | The Trail Makers" 
                                  width={400}
                                  height={300}
                                  sizes="(max-width: 768px) 400px, 800px" 
                                  className="lg:max-h-96 object-cover w-full"
                                  priority>
                                </Image>

                                <ul className='px-5 py-10 grid grid-cols-2 list-disc gap-x-4 text-xs list-inside font-medium'>
                                      <li className='list-disc'>Duration: 1 Day</li>
                                      <li className='list-disc'>Difficulty Level: Easy</li>
                                      <li className='list-disc'>Highest Altitude: Approx 9,700 feet (3,000 metres)</li>
                                      <li className='list-disc'>Distance: 12km</li>
                                      <li className='list-disc'>Best Time to Visit: March to October</li>
                                      <li className='list-disc'>Starting Point: Kasol</li>  
                                </ul>

                                <p className='px-3'>
                                Kheerganga Trek is amongst the shortest, easiest, and most popular treks of Himachal. With
                                less than 12 kilometres to cover and rejuvenating hot springs awaiting you at the end, this trek
                                might feel like a breeze. Passing through the Parvati Valley, the Kheerganga trek might not
                                last too long, but it sure does offer a compact but complete package. Snow-covered Himalayan
                                ranges in the backdrop, passing through dense forests and glancing at majestic waterfalls,
                                every hour of this trek will be a treat. The trail also passes through several apple orchards and
                                montane villages, making the experience even more diverse and enjoyable. For anyone who
                                is interested in trekking but has doubts about whether or not it is for them, the Kheerganga
                                trek is the go-to choice for testing the waters, be it solo or in groups.
                                </p><br/>
                        </div>


          <h4 className='italic text-2xl font-medium px-3'>
          <strong className='font-bold italic'>The Quiet Quartet: Underrated Offbeat Treks</strong>
          </h4><br/>

                <p className='px-3'>
                Not everyone likes the popular places, especially because of the crowd. Some (including us)
                prefer to walk down the “road less travelled by”, like Robert Frost, because it makes “all the
                difference”. We, at “ The Trail Makers”, have also identified a quartet of quiet treks that are
                underrated, but in no way are inferior to their more popular counterparts. So, if you’re looking
                to avoid the crowd and go on a little offbeat adventure, these are the ones for you.
                </p><br/>



                    {/* Miyar Valley Trek */}
                          <div>
                                  <h5 className='text-2xl pt-8 px-3 font-medium text-sky-700 leading-3'>
                                  <strong className='font-extrabold'>7. MIYAR VALLEY TREK</strong>
                                  </h5><br/>

                                      <Image src="https://res.cloudinary.com/dyz0zzyv8/image/upload/w_800,h_600,c_fill,f_auto,g_south/v1748871389/IMG_20240919_174959_yylylx.jpg" 
                                        alt="view of bhrigu lake with snow capped mountains in the background | The Trail Makers" 
                                        width={400}
                                        height={300}
                                        sizes="(max-width: 768px) 400px, 800px" 
                                        className="lg:max-h-96 object-cover w-full"
                                        priority>
                                      </Image>

                                      <ul className='px-5 py-10 grid grid-cols-2 list-disc gap-x-4 text-xs list-inside font-medium'>
                                            <li className='list-disc'>Duration: 9 Days</li>
                                            <li className='list-disc'>Difficulty Level: Easy-Moderate</li>
                                            <li className='list-disc'>Highest Altitude: Approx 13,200 feet (4,000 metres)</li>
                                            <li className='list-disc'>Distance: 50km</li>
                                            <li className='list-disc'>Best Time to Visit: June to September</li>
                                            <li className='list-disc'>Starting Point: Manali</li>  
                                      </ul>

                                      <p className='px-3'>
                                      We bet that the Miyar Valley, or Miyar Nala, as it is locally referred to, is a place you may have
                                      never heard of before, even if you’re fairly familiar with Himachal Treks. This little-known trail
                                      through the S-shaped valley is located in Lahaul, between Chamba and Zanskar, nearly 50
                                      kilometres long and lasts for nine days. Starting from the Khanjar village and passing through
                                      the Chhudong Meadows, the trek goes through the Miyar Valley, which is often referred to as
                                      the “Valley of Flowers” of Lahaul due to the vast diversity of wildflowers and medicinal plants
                                      that bloom here, particularly during July and August, making it the best time to visit Miyar.
                                      Flowers like blue poppies, orchids, gentians, and primulas are famous in Miyar Nala. While
                                      traversing the valley, you may come across nomadic tribes like the Gaddi Shepherds and their
                                      flocks grazing in the meadows or visit the Buddhist stupas at Gompa to breathe in the local
                                      culture. But the best awaits you at the snout of the Miyar Glacier, the second longest in
                                      Himachal: the ‘seven sacred lakes’ or as the locals call it – “Kesar Yon Chhap”.
                                      </p><br/>
                          </div>

                    {/* Kalihani Pass Trek */}
                          <div>
                                  <h5 className='text-2xl pt-8 px-3 font-medium text-sky-700 leading-3'>
                                  <strong className='font-extrabold'>8. KALIHANI PASS TREK</strong>
                                  </h5><br/>

                                      <Image src="https://res.cloudinary.com/dyz0zzyv8/image/upload/w_800,h_600,c_fill,f_auto,g_south/v1748871389/IMG_20240919_174959_yylylx.jpg" 
                                        alt="view of bhrigu lake with snow capped mountains in the background | The Trail Makers" 
                                        width={400}
                                        height={300}
                                        sizes="(max-width: 768px) 400px, 800px" 
                                        className="lg:max-h-96 object-cover w-full"
                                        priority>
                                      </Image>

                                      <ul className='px-5 py-10 grid grid-cols-2 list-disc gap-x-4 text-xs list-inside font-medium'>
                                            <li className='list-disc'>Duration: 7 Days</li>
                                            <li className='list-disc'>Difficulty Level: Moderate-Difficult</li>
                                            <li className='list-disc'>Highest Altitude: Approx  15,700 feet (4,800 metres)</li>
                                            <li className='list-disc'>Distance: 50km</li>
                                            <li className='list-disc'>Best Time to Visit: June to October</li>
                                            <li className='list-disc'>Starting Point: Manali</li>  
                                      </ul>

                                      <p className='px-3'>
                                      The Kalihani Pass trek is one of the more daunting challenges that requires experience as
                                      well as physical prowess. The path to Kalahani Pass follows the famous “Bara Bhangal
                                      Trail”, which is just a stone’s throw away from “Pahadi Manzil”, from where you’ll start. This
                                      unique trek passes through snow patches, dense green meadows, and a steep trail that will
                                      make blood gush through your veins and jaws drop in awe. You can come across rare
                                      Himalayan fauna, including the musk deer, black bear, and snow leopards, apart from the
                                      colourful wildflowers. The trail passes through several small villages, including the remote
                                      Bara Bangal, and offers unmatched views of the Pir Panjal range, including Mount Indrasan
                                      and Mount. Deo Tibba. On your way to the Kalihani Pass, you’ll get to reach the Khanpari
                                      Tibba, which is located at an altitude of 4000 metres and offers a panoramic view of the
                                      Dhauladhar Range, and feast your eyes on the Rani Sui Lake located at a height of 3400
                                      metres. Challenging it may be, but Kalihani Pass is a trek worth exploring.
                                      </p><br/>
                          </div>

                    {/* Ghepan Lake Trek */}
                          <div>
                                  <h5 className='text-2xl pt-8 px-3 font-medium text-sky-700 leading-3'>
                                  <strong className='font-extrabold'>9. GHEPAN LAKE TREK</strong>
                                  </h5><br/>

                                      <Image src="https://res.cloudinary.com/dyz0zzyv8/image/upload/w_800,h_600,c_fill,f_auto,g_south/v1748871389/IMG_20240919_174959_yylylx.jpg" 
                                        alt="view of bhrigu lake with snow capped mountains in the background | The Trail Makers" 
                                        width={400}
                                        height={300}
                                        sizes="(max-width: 768px) 400px, 800px" 
                                        className="lg:max-h-96 object-cover w-full"
                                        priority>
                                      </Image>

                                      <ul className='px-5 py-10 grid grid-cols-2 list-disc gap-x-4 text-xs list-inside font-medium'>
                                            <li className='list-disc'>Duration: 5 Days</li>
                                            <li className='list-disc'>Difficulty Level: Moderate-Difficult</li>
                                            <li className='list-disc'>Highest Altitude: 13,600 feet (4,100 metres)</li>
                                            <li className='list-disc'>Distance: 28km</li>
                                            <li className='list-disc'>Best Time to Visit: May to October</li>
                                            <li className='list-disc'>Starting Point: Manali</li>  
                                      </ul>

                                      <p className='px-3'>
                                      Similar to Miyar Valley, Ghepan Lake or Ghepan Ghat is another one of Lahaul’s secrets that
                                      has only been explored in the last decade or so. This glacial lake is particularly famous for its
                                      striking blue colour that will linger on in your memories long after you’ve returned home. The
                                      trail had been followed by shepherds for ages, but has only caught the eyes of trekkers in
                                      recent times. But anyone who sets eyes upon the blue lake is mesmerised by it, and bound to
                                      return again. The floating icebergs and the hanging glacier feeding it make the view even more
                                      memorable. To reach this lake, however, you’ll have to undertake a challenging climb that
                                      includes steep descents, high ascents, and extremely rugged trails with loose rocks. Having
                                      not been explored extensively, the trail is narrow and requires precision and focus to traverse
                                      safely.
                                      </p><br/>       
                          </div>

                    {/* Deo Tibba Basecamp Trek */}
                          <div>
                                  <h5 className='text-2xl pt-8 px-3 font-medium text-sky-700 leading-3'>
                                  <strong className='font-extrabold'>10. DEO TIBBA BASECAMP TREK</strong>
                                  </h5><br/>

                                      <Image src="https://res.cloudinary.com/dyz0zzyv8/image/upload/w_800,h_600,c_fill,f_auto,g_south/v1748871389/IMG_20240919_174959_yylylx.jpg" 
                                        alt="view of bhrigu lake with snow capped mountains in the background | The Trail Makers" 
                                        width={400}
                                        height={300}
                                        sizes="(max-width: 768px) 400px, 800px" 
                                        className="lg:max-h-96 object-cover w-full"
                                        priority>
                                      </Image>

                                      <ul className='px-5 py-10 grid grid-cols-2 list-disc gap-x-4 text-xs list-inside font-medium'>
                                            <li className='list-disc'>Duration: 7 Days</li>
                                            <li className='list-disc'>Difficulty Level: Moderate</li>
                                            <li className='list-disc'>Highest Altitude: 14,700 feet (4,500 metres)</li>
                                            <li className='list-disc'>Distance: 28km</li>
                                            <li className='list-disc'>Best Time to Visit: May to October</li>
                                            <li className='list-disc'>Starting Point: Manali</li>  
                                      </ul>

                                      <p className='px-3'>
                                      The last but not the least amongst the quiet offbeat treks of Himachal is the one to Deo Tibba
                                      Basecamp. Also referred to as the Chota Chandratal trek, it boasts a trail that is home to a
                                      vivid variety of flora and fauna. With Mount Deo Tibba constantly on the horizon throughout
                                      the week, you can never lose sight of the goal. At the same time, prominent peaks like
                                      Indrasan and Hanuman Tibba and the glaciers of Deo Tibba and Jagatsukh also grace the
                                      horizon throughout the trail. Starting from “Pahadi Manzil”, the trek not only traverses dense
                                      forests but also crosses glacial streams and meadows. Reaching Basecamp is no easy task,
                                      though, with several steep descents and ascents through snowy and rocky terrains. The
                                      natural beauty of the panoramic Himalayas is bound to leave you speechless, and if you’re
                                      lucky, you might catch a glimpse of musk deer or the Himalayan tahr, or maybe even the snow
                                      leopard.
                                      </p><br/>       
                          </div>



          <h4 className='italic text-2xl font-medium px-3'>
          <strong className='font-bold italic'>The Daunting : Most Challenging Treks</strong>
          </h4><br/>

                <p className='px-3'>
                It was a daunting task to choose the top ten treks in Himachal, and it involved several tough
                choices being made. However, this list can’t be completed without the honourable mentions
                by “The Trail Makers”. The Daunting ones of the most exhilarating and
                demanding treks in Himachal Pradesh that you can only go on if you have prior experience
                and expertise in Difficult trekking.</p><br/>

                
                      {/* Pin Parvati Trek */}
                      <div>
                          <h5 className='text-2xl pt-8 px-3 font-medium text-sky-700 leading-3'>
                          <strong className='font-extrabold'>11. PIN PARVATI TREK</strong>
                          </h5><br/>

                              <Image src="https://res.cloudinary.com/dyz0zzyv8/image/upload/w_800,h_600,c_fill,f_auto,g_south/v1748871389/IMG_20240919_174959_yylylx.jpg" 
                                alt="view of bhrigu lake with snow capped mountains in the background | The Trail Makers" 
                                width={400}
                                height={300}
                                sizes="(max-width: 768px) 400px, 800px" 
                                className="lg:max-h-96 object-cover w-full"
                                priority>
                              </Image>

                              <ul className='px-5 py-10 grid grid-cols-2 list-disc gap-x-4 text-xs list-inside font-medium'>
                                    <li className='list-disc'>Duration: 11 Days</li>
                                    <li className='list-disc'>Difficulty Level: Expert</li>
                                    <li className='list-disc'>Highest Altitude: 17,500 feet (5,300 metres)</li>
                                    <li className='list-disc'>Distance: 110km</li>
                                    <li className='list-disc'>Best Time to Visit: June to September</li>
                                    <li className='list-disc'>Starting Point: Kasol</li>  
                              </ul>

                              <p className='px-3'>
                              This 110-kilometre-long trans-Himalayan trek through the Pin Parvati Pass is often called a
                              passage between two contrasting worlds. On one hand, there is the lush and alive Parvati
                              valley fed by the confluence of Beas and Parvati rivers, while on the other hand is the Pin
                              valley amidst the cold desert of Spiti. Standing atop the highest point of over 5000 metres at
                              the Pin Parvati Pass, you get to see the stark contrast between the two worlds simultaneously.
                              Standing on white snow and glancing at green valleys on one side and brown on the other,
                              nature is bound to leave you in awe here. Starting at Bhuntar and concluding at Manali, this
                              11-day trek offers heavenly landscapes with an abundance of picture-worthy frames. Alpine
                              forests and coloured flower blossoms also grace the route. Pin Parvati Trek is dangerous not
                              just because of the high altitude but also because of the frozen snow mountains and
                              unpredictable rainfall that make the slopes extra slippery. Pin Parvati embodies the High 
                              Risk-High Reward principle.
                              </p><br/>       
                      </div>

          </section>

          <section className='bg-amber-400 py-6 mt-4 rounded-2xl px-2 mx-2'>
            <h4 className='text-4xl uppercase font-medium px-3'>
            <strong className='font-semibold'>The Treks we have missed mentioning</strong>
            </h4><br/>

                <p className='text-lg px-3'>
                While we have tried to cover the best of the best treks in Himachal Pradesh, there are still
                several other treks that are equally beautiful and adventurous. 
                Treks like <span className='italic font-medium'>Kinnaur Kailash,
                Rupin Pass, Pin Bhaba, Yulla Kanda, Churdhar, Patalsu, Chanderkhani Pass, Thamsar Pass, 
                Bara Bangal, Sara Umga La, Animal Pass, Parang La and many more</span>.
                </p><br/>

                <p className='text-lg px-3'>For the full list visit our 
                <span className='text-red-700 italic font-bold text-lg'> Trek Library</span>.
                </p><br/>
          </section>
          
          <section>
            <h4 className='italic text-lg font-medium px-3 mt-8'>
            <strong className='font-semibold'>In Conclusion…</strong>
            </h4><br/>

                <p className='italic text-base px-3'>
                No matter your age or your experience, if you have the desire to trek, Himachal Pradesh is
                your go-to place. With such a variety of options, 
                <span className='font-semibold'>“The Trail Makers”</span> can definitely find the
                trek that suits you the best. We’re just a call away. Or if you’ve already made your mind, then
                what are you waiting for? Tumhari <span className='font-semibold'>“Pahadi Manzil”</span> tumhara intezaar kar rahi hai. Come to
                Himachal! Come to Pahadi Manzil! Come Trek with Us and leave with memories of a lifetime
                </p><br/>
            </section>

        </div>
    </main>
  )
}

export default page