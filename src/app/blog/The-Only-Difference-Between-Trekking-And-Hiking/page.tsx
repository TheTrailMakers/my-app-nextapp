import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaBookOpen } from "react-icons/fa6";


function page() {
  return (
    <main className='min-h-screen'>
      <div className='bg-gradient-to-b from-black to-50% to-white h-[70svh] relative'>
        <Image src="https://res.cloudinary.com/thetrail/image/upload/g_auto,c_fill,ar_4:5,c_auto/v1720152200/Beas-Kund-Trek/seven_sisters_beas_kund.jpg" 
          alt="The Trail Makers"
          width={400}
          height={500}
          sizes="(max-width: 768px) 400px, 1200px" 
          className="object-cover h-[70svh]  w-full mix-blend-multiply absolute"
          blurDataURL='https://res.cloudinary.com/thetrail/image/upload/g_auto,c_fill,ar_4:5,c_auto,h_30/v1720928981/Kashmir-Great-Lakes-Trek/hands-widespread-nichnai-pass.jpg'
          placeholder='blur'
          priority>
        </Image>
        <div className='absolute w-full flex items-center justify-end p-2'>
          <h4 className='text-white pr-2 text-lg'>Learning</h4>
          <FaBookOpen className='text-white'/>
        </div>
      </div>

      <div className='lg: px-[calc((100vw-800px)/2)]'>

      <div className='p-3'>
        <h1 className='text-4xl text-neutral-800 font-extrabold py-2'>Hiking vs Trekking: What&apos;s the REAL Difference<div className=' inline font-normal text-2xl'> &#40;Historically Verfied&#41;</div> </h1>
        <h3 className='uppercase text-neutral-500 text-sm inline font-medium'>By Pritam Bera</h3>
        <span className='px-1'>|</span>
        <h3 className='uppercase text-neutral-500 text-sm inline font-semibold'>9th May, 2024</h3>
      </div>

      <div className='p-3 leading-8'>
          <p>
          On a Saturday evening, over a drink, the words &apos;Hiking&apos; and &apos;Trekking&apos; 
          can create a fight between even two respectable members of a great 
          adventure community.
          </p><br/>

          <p>
          So, let&apos;s get to its roots. More than opinions, it is best to see 
          the origin, as the words have transformed over the centuries, bleeding 
          into each other&apos;s meaning and now becoming almost synonymous.
          </p>

          <Image src="https://i.pinimg.com/564x/82/5d/11/825d114ba8a81b73f6a082fa39cd1bf9.jpg" 
          alt="Ox Wagon Transport in the Free State | South Africa, flickr.com"
          width={400}
          height={300}
          sizes="(max-width: 768px) 400px, 800px" 
          className="object-cover w-full pt-8 pb-2 rounded-lg"
          priority>
        </Image>
        <div className='max-w-80 mx-auto pb-8 text-center text-sm'>
          Ox Wagon Transport in the Free State | South Africa, flickr.com
        </div>

          <p>
          <Link href={"https://en.m.wiktionary.org/wiki/trek"} className='text-blue-800'>&apos;Trekking&apos; has an Old Dutch origin from the word &apos;trekkan&apos;, and 
          also a Proto Germanic origin of &apos;trekana&apos;.</Link> Coming to the meanings 
          of these words just a second later. At the beginning of the 19th 
          century, as the Dutch started to settle in Africa, around what 
          is now Cape Town, it became the Afrikaans word &apos;trekken&apos;.
          <strong className='text-neutral-600'> &apos;Trekken&apos; 
          in Afrikaans has the meaning of &apos;Migration by ox cart&apos;</strong>, &apos;trekkan&apos; 
          means pulling, similarly &apos;trekana&apos; also means pulling. I hope you 
          can get the idea now, where it&apos;s heading. Trekking in the past was a 
          &apos;Migratory Journey&apos;.
          </p><br/>

          <p>
          <Link href={"https://www.etymologynerd.com/blog/take-a-hike"} className='text-blue-800'>
          Hike has a Middle English origin of &apos;hichhen,&apos; meaning &apos;to move&apos; 
          or, &apos;hyke&apos; meaning to &apos;walk vigorously.&apos;</Link> However, it wasn&apos;t widely 
          used until the end of the 19th century, gaining popularity during 
          World War. To quote John Muir: <span className='italic'>&quot;I don &apos;t like either the word 
           &#40;hike&#41; or the thing. People ought to saunter in the mountains - 
          not &apos;hike! &apos; Do you know the origin of that word saunter? It&apos;s a 
          beautiful word. Back in the Middle Ages, people used to go on 
          pilgrimages to the Holy Land, and when people in the villages 
          they passed through asked where they were going, they would 
          reply, &apos;A la sainte terre &apos;, &apos;To the Holy Land. &apos; &quot;</span> Well, certainly, 
          that &apos;s not how people behave in the mountains now.
          </p><br/>

          <Image src="https://foresthistory.org/wp-content/uploads/2017/01/Views34_th-1.jpg" 
            alt="Family hiking in Austin Pass, Mt. Baker National Forest, Washington, July 1925. | foresthistory.org"
            width={400}
            height={300}
            sizes="(max-width: 768px) 400px, 800px" 
            className="object-cover w-full pt-8 pb-2 rounded-lg"
            priority>
          </Image>
          <div className='max-w-80 mx-auto pb-8 text-center text-sm'>
            Family hiking in Austin Pass, Mt. Baker National Forest, Washington, July 1925 | foresthistory.org
          </div>
          
          <p>
          Both words are relatively new to the world, with &apos;hike&apos; being 
          younger. Initially, they had distinct meanings; &apos;trek&apos; was 
          related to migratory journeys, while &apos;hike&apos; was about walking.
          </p><br/>

          <p>
          Over the centuries, these two words overlapped and became 
          almost synonymous. But that doesn&apos;t mean they should be 
          differentiated by factors like carrying a heavy backpack or 
          not, or being multi-day or single-day activities. These 
          distinctions don&apos;t hold universally true. Even popular hiking 
          or trekking trails vary widely in difficulty.
          </p><br/>

          <p>
          How you differentiate them in one part of the world may have 
          the opposite meaning in another part. Perceived or local 
          meanings of these words have evolved differently in different 
          regions of the world.
          </p><br/>

     
          <h4 className='font-bold text-xl'>Final Thoughts:</h4><br/>
          <p>
          Origin-wise, they had different meanings; one was a migratory 
          journey, the other was walking. However, in today&apos;s world, 
          they have become almost interchangeable, as some parts of the 
          world use &apos;hike&apos; more commonly while others use &apos;trek&apos; more 
          commonly.<strong className='text-neutral-600'> Fundamentally, if you want to differentiate them, 
          trekking is considered a serious activity, while hiking is 
          more leisurely. Trekking can become risky in some cases, while 
          hiking is generally safer.</strong>
          </p>

          <div className=''>
          <h5 className='font-semibold text-lg pt-20'>Source :</h5>
          <p className='text-sm'>
          <Link href={"https://en.m.wiktionary.org/wiki/trek"} className='block text-sky-700'>https://en.m.wiktionary.org/wiki/trek</Link>
          <Link href={"https://www.etymologynerd.com/blog/take-a-hike"} className='block text-sky-700'>https://www.etymologynerd.com/blog/take-a-hike</Link>
          </p>
          </div>
          </div>
      </div>
    </main>
  )
}0

export default page