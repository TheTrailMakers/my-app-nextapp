import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaBookOpen } from "react-icons/fa6";


function page() {
  return (
    <main className='min-h-screen'>
      {/* <div className='bg-gradient-to-b from-black to-white to-90% h-[70svh] relative'>
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
        <div className='absolute w-full flex items-center justify-center '>
          <h1 className='p-8 m-8 mt-[60%] text-4xl text-white font-extrabold uppercase 
                        bg-red-500 bg-opacity-75 backdrop-blur shadow-lg shadow-sky-600'>Understanding The Layering System : <span className=' block text-xl font-normal'>How to Dress for Trekking , Mountaineering & Hiking</span></h1>
        </div>
      </div> */}

      <div className='h-[70svh] bg-red-500 flex w-full items-center justify-center'>
          <h1 className='px-8 text-4xl font-bold text-white uppercase'>Understanding The Layering System : <span className=' block py-2 text-xl font-normal'>How to Dress for Trekking , Mountaineering & Hiking</span></h1>
      </div>

      <div className='lg: px-[calc((100vw-800px)/2)]'>

      <div className='py-3 px-6'>
        <div className='uppercase text-neutral-500 text-sm inline font-medium'>By Pritam Bera</div>
        <span className='px-1'>|</span>
        <div className='uppercase text-neutral-500 text-sm inline font-semibold'>27th July, 2024</div>
      </div>
     

        <div className='leading-8'>
          <p className='font-semibold text-lg leading-6 px-3'>
          <span className='text-8xl font-medium mr-3 float-left'>T</span>wo Layers of thin is 
          warmer than one layer of thick. The Principle you&apos;ve 
          learned in the high school with the murky face is still the driving idea 
          behind the Clothing System in the Trekking, Hiking and Mountaineering World.
          </p><br/>

          <p className='italic px-3'>
          <strong className='font-normal'>There is no bad weather only bad clothing.</strong>
          </p>

          <div className='py-4'>
            <Image src="https://www.thegreatoutdoorsmag.com/wp-content/uploads/sites/15/TGO-BERGHAUS-Jessie_Leong-H68A5904.jpg" 
            alt="Trekkers Trying to find Route in Rain, Bad Weather"
            width={400}
            height={300}
            sizes="(max-width: 768px) 400px, 800px" 
            className="object-cover w-full pt-8 pb-2 rounded-lg"
            priority>
            </Image>

            <div className='max-w-80 mx-auto pb-8 text-center text-sm'>
              Trekking in Bad Weather 
              <Link href={"https://www.thegreatoutdoorsmag.com/"} className=' underline text-blue-600 hover:text-blue-800 visited:text-purple-600'> thegreatoutdoorsmag.com</Link>
            </div>
          </div>

          <p className='px-3'>
          Be it raining, Snowing or, you are on a summit push on a super cold 
          windy morning in a narrow valley, with proper layerings you can be 
          the most comfortable guy out there.
          </p><br/>

          <p className='px-3'>
          To understand layering system during Backpacking, it is important to 
          understand what is the function of each layer and also about the 
          materials they are made of. At the end we will learn other variations 
          of Layering System.
          </p><br/>

          <p className='px-3 text-lg font-medium'>
          The Standard Layering System Consists of 3 Layers :
          </p><br/>

          <ol className='pl-5 pr-3 list-decimal list-inside'>
            <li>The Base Layer [Next to Skin Layer/ Moisture Wicking Layer]</li>
            <li>The Mid Layer [Insulation Layer/ Loft Layer]</li>
            <li>The Outer Layer [Shell Layer/ Protection Layer]</li>
          </ol><br/>

          <p className='px-3'>
          Any Mountain visit must have these three layers, the obvious exception 
          is the hot, desert mountains or, similar.
          </p><br/>

          <p className='px-3'>
          Let&apos;s start.
          </p><br/>

          <h2 className='px-3 pr-[10vw] font-bold text-stone-700 text-2xl'>
          1. Base Layer [Moisture Wicking Layer]
          </h2><br/>


          <div>
            <Image src="https://alpkit.com/cdn/shop/files/merino-wool-base-layers-m.jpg?v=17572061548537939966" 
              alt="A Man and a Woman is Hiking in Merino Wool Base Layer"
              width={400}
              height={300}
              sizes="(max-width: 768px) 400px, 800px" 
              className="object-cover w-full pt-8 pb-2 rounded-lg"
              priority>
            </Image>

            <div className='max-w-80 mx-auto pb-8 text-center text-sm'>
              Merino Wool Base Layer | 
              <Link href={"https://alpkit.com/"} className=' underline text-blue-600 hover:text-blue-800 visited:text-purple-600'> alpkit.com</Link>
            </div>
          </div>
          

          <p className='px-3'>
          The primary function of the Base Layer is to let the 
          moisture pass through it and be comfortable to skin. It 
          must be stretchable enough to let the body have full 
          range of motion.
          </p><br/>

          <p className='px-3'>
          It doesn&apos;t need to make you warm essentially, but a warm feel next to skin feels nice.
          </p><br/>


          <h3 className='text-xl font-semibold text-stone-700 float-left pr-3 pl-5'>Material : </h3>
          <p className='px-3'>
          We have a wide range of Material choice for Base Layer. 
          From Polyester, Nylon to natural fibers like wool silk, 
          cotton and many more newly engineered materials. Between 
          these Merino Wool is the Favorite choice. It absorbs 
          very less water, dries quickly, even when it&apos;s wet it 
          doesn&apos;t weight a ton like cotton, and the best perk is 
          it doesn&apos;t feel cold or soggy to skin like other 
          materials. Merino wool can have its own different chapter 
          to talk about. 
          </p><br/>

          
          <div>
            <Image src="https://assets.icebreaker.com/image/upload/q_auto:best/utilityblog/baselayer-guide-2.jpg" 
              alt="Merino Wool Base Layer Closeup"
              width={400}
              height={300}
              sizes="(max-width: 768px) 400px, 800px" 
              className="object-cover w-full pt-8 pb-2 rounded-lg"
              priority>
            </Image>

            <div className='max-w-80 mx-auto pb-8 text-center text-sm'>
              Merino Wool Base Layer | 
              <Link href={"https://assets.icebreaker.com/"} className=' text-blue-600 hover:text-blue-800 visited:text-purple-600'> icebreaker.com</Link>
            </div>
          </div>

          
          <p className='px-3'>
          Merino  Wools are little costly so, cheaper option can be 
          synthetics. They are also great choice But environment 
          cautious and sometimes the feel of it may drive people away, 
          otherwise they are also great options. Different companies 
          have different brand name for the material, but don&apos;t get 
          too deep into them. Now a days many synthetic fabrics are 
          there which are very comfortable to skin.
          </p><br/>

          
          <p className='px-3'>
          Rather care about the Quick Dry Capabilities, odor retention 
          and also check for Durability. Finally the feel of the fabric 
          have the ultimate call for most of the  people.
          </p><br/>

          <h3 className='text-xl font-semibold text-sky-700 float-left pr-3 pl-5'>Color : </h3>
          <p className='px-3'>
          Unless you are going for a Wildlife Photography, Choose darker 
          and bright noticeable colors. They are easier to spot and 
          also darker color absorbs more sunlight and dries quickly.
          </p><br/>

          <h3 className='text-xl font-semibold text-zinc-600 float-left pr-3 pl-5'>Length : </h3>
          <p className='px-3'>
          Full Length or, Half Length? We usually prefer full length 
          base layer, for little extra warmth and PRotection to skin 
          from UV Exposure, Bushes and Branches. But in some conditions 
          like hot climate with steep climbs in low altitude where 
          chances of sunburn are low we prefer half, lighter and maximum 
          breathable garments.
          </p><br/>

          <h3 className='text-xl font-semibold text-red-500 float-left pr-3 pl-5'>Warning : </h3>
          <p className='px-3 text-red-700 font-normal italic'>
          Cotton is a Big No for cold weather, it absorbs water from 
          the body like sponge and becomes heavy. Whenever you are 
          gonna have your little rest after a steep climb, it will 
          drain heat from the body like crazy, and can make you hypothermic. 
          Cotton is one of the biggest reason of hypothermic deaths in 
          Mountain. But you can use Cotton in hot climates.
          </p><br/>

          <h2 className='px-3 pr-[10vw] font-bold text-stone-700 text-2xl'>
          2. The Mid Layer [Insulation Layers]
          </h2><br/>
                 
          <p className='px-3'>
          The way insulation Layers work is by trapping the warm air 
          inside. The more air-gap you have more warmth you can have. 
          This is the layer you can repeat to add more warmth to the 
          Layering System.
          </p><br/>
          
          <h3 className='px-3 text-lg font-medium'>We have only two major 
            good choices for Mid Layers.
          </h3><br/>
          <ol className='list-inside list-decimal pl-5 pr-3'>
            <li>Fleece</li>
            <li>Insulated Jackets</li>
          </ol><br/>

          <h4 className='text-xl font-semibold text-sky-700 float-left pr-3 pl-5'>Fleece : </h4>
          <p className='px-3'>
          Fleece is a Human Engineered Product which resembles coat of a 
          sheep. Yes, fleece is no natural product, it&apos;s a fabric design 
          made of Polyester. It&apos;s lighter than wool, even durable. It was 
          1970 when Malden Mills developed this technology and then 
          partnered with Patagonia to infuse outdoor Knowledge to make 
          one of the greatest product for Outdoors. Around 1990, fleece 
          became worldwide popular, Malden Mills owner Aaron Feuerstein 
          did not patent this, to keep it inexpensive and easily available. 
          Currently they sell this under Polartec Brand name.
          </p><br/>

          <p className='px-3'>
          it&apos;s cheapness, durability, lightweight, ability to stay warm 
          when wet, made fleece world wide popular. We generally add 
          fleece next after the base layer, due to it;s flexibility and 
          warmth and comfort feel. You can even repeat fleece layer 
          to add more warmth, without compromising movement cause our 
          next option is insulated Jacket, which can not be repeated.
          </p><br/>

          <h4 className='text-xl font-semibold text-sky-700 float-left pr-3 pl-5'>Insulated Jackets : </h4>
          <p className='px-3'>
          Insulated Jackets are second type of Mid Layer or, Insulation 
          layer. You can use it as add ons to Fleece, if more warmth is 
          needed. or it can be used as single.
          </p><br/>

          <h5 className='pl-5 pr-3 text-lg font-medium'>          
          There is two type of 
          Insulated Jackets depending upon the fill type.
          </h5><br/>
          <ol className='list-inside list-decimal pl-5 pr-3'>
            <li>Natural Filling : Down & Feather</li>
            <li>Synthetic Filling : PrimaLoft, Plumafill, Coreloft</li>
          </ol><br/>

          <h4 className='text-xl font-semibold text-sky-700 float-left pr-3 pl-5'>Feathers & Down : </h4>
          <p className='px-3'>
          The Down Jacket would probably the most costly and fancy of 
          all Layers. It has the  highest fill power. Fill Power is the 
          measure of loftness. The usual fill power is around 500-700. 
          This means one ounce of Down can expend to 500-700 cubic 
          Inches. for higher Altitude or, too cold Climate Expeditions 
          will need fill powers more than that.
          </p><br/>

          <p className='px-3 italic'>
            What is down exactly?
          </p><br/>

          <p className='px-3'>
          It is harvested from Duck or, Goose, very fine filamented 
          cluster like structure under the feather which also help 
          the Duck or, Goose to stay Warm. It&apos;s better than the feather, 
          cause it doesn&apos;t have the quill or, the spine. 
          </p><br/>

          <p className='px-3'>
          The Natural Down is hydrophobic when attached to the Duck 
          or, Goose, cause they naturally secret a oil to keep themselves 
          waterproof. But after harvest the waterproof ability is gone. 
          IT has to be artificially treated.
          </p><br/>

          <p className='px-3'>
          Ethically Harvested high quality Down can be very costly. 
          So, sometimes, feather is also added to them.
          </p><br/>

          <p className='px-3'>
          Down Jacket can be compressed to a very small size and 
          can almost instantly regain back the original size.
          </p><br/>

          <p className='px-3'>
          The only downside is it can be utter useless and also 
          burden in rain. It sponges a lot of water and can take 
          days to dry. When wet it's total useless. 
          </p><br/>

          <h4 className='text-xl font-semibold text-sky-700 float-left pr-3 pl-5'>Synthetics : </h4>
          <p className='px-3'>
          The next budget option to Down will be synthetics. 
          Every year research is being done to create more 
          loft and hydrophobic to the synthetic Jackets. They 
          doesn&apos;t compress well like the down. So, it&apos;s little 
          on heavier side compared to the warmth given.
          </p><br/>

          <p className='px-3'>
          But the plus point is it's easier to use in moisty environment or, 
          in  rain. It&apos;s still usable after a slight drizzle. Dries faster 
          than a Down Jacket. also easy to repair than Down Jacket. But the 
          major difference which makes people to choose synthetic instead of 
          Down is the maintenance. Synthetic JAckets can be tossed in for the 
          laundry but with Down you need to follow step by step cleaning 
          process, otherwise you will loose the specialty of Down overtime.
          </p><br/>

          <p className='px-3'>
          Both the Synthetic and Down Jacket is packed in a synthetic Shell 
          fabric which is most of the time treated with Durable Water Resistant(DWR) Coating.
          </p><br/>

          <p className='px-3'>
          In Comparison to Fleece, insulated Jackets provide more loft to the weight, so more warm. But here are something to note.
          </p><br/>

          <ol className='pl-5 pr-3 list-decimal list-inside'>
            <li>Down or, Synthetic Jackets can not be repeated, due to the 
              synthetic shell fabric, which is water resistant or, repellant, 
              will stop the moisture to pass further.
            </li>
            <li>Down or, synthetic Jackets i contact with similar materials 
              can be noisy.  While two fleece won&apos;t be.
            </li>
            <li>Fleece is highly inexpensive, compared to the Jackets.
            </li>
            <li>Fleece doesn&apos;t need extra care like down jacket. even a 
              small tear can make you expensive gear unusable. Even you 
              may need to throw it out in some cases, fleece on the other 
              side is durable.
            </li>
            <li>The overall warmth provide by a really good quality down 
              jacket is just incomparable, to the packing and weight of it. 
              Expedition in really cold climate is hard to complete with 
              out a good down jacket.
            </li>
          </ol><br/>

          
          <p className='px-3'>
          A Fleece and a Down Jacket on it is People&apos;s favorite combination.  
          If tpp warm you can just compress down the Down Jacket and stuff 
          back in your Rucksack.
          </p><br/>


          <h2 className='px-3 pr-[10vw] font-bold text-stone-700 text-2xl'>
          3. The Outer Layer [Protection Layer]
          </h2><br/>

                    
          <p className='px-3'>
          The outer Layer or, shell Layer or, Protection Layer is the last 
          line of defense for you, against everything the mountain can throw 
          at you. Be it snow, rain, storm, wind whatever.
          </p><br/>
                    
          <h3 className='px-3 text-lg font-medium'>
          There is two type of shell Jacket.
          </h3><br/>

          <ol className='pl-5 pr-3 list-decimal list-inside'>
            <li>Hard Shell Jacket</li>
            <li>Soft Shell Jacket</li>
          </ol>

          <p className='px-3'>
          Hard Shell Jackets are more weather resistant. Practically 
          it&apos;s really hard comparable to the soft shell Jackets hence 
          the name. More Rugged and tear resistant but less mobile and 
          flexible. But in a technical terrain, or, in more bad weather 
          condition you will need this.
          </p><br/>

          <p className='px-3'>
          On a lighter weather condition you will want to use soft shell 
          Jacket, it&apos;s more comfortable and flexible similar to a wind 
          cheater. But have DWR coating. Most of the times they are not 
          100% water proof but they will be water resistant, so, you will 
          need to use it in lighter rain and snow.
          </p><br/>

          <p className='px-3'>
          On a difficult trek, or on an expedition you may want to keep both 
          with you. Soft shell Jackets can be worn all the day, they also 
          help to keep the warm air trapped, but the hard shell is reserved 
          for more difficult moments.
          </p><br/>

          <p className='px-3'>
          <span className='font-medium '>One thing to note : </span>There is no Hardshell Jacket which can fully prevent 
          all that mother Nature has to throw, If fully waterproof you will sweat 
          like a pig inside. All the Jacket have some means to let the sweat out, 
          be it Gore-Tex or, any other clever engineer, that can be failure later. 
          Also there is a opening for your face. so, water will go in one way, or 
          another. But you wil be mostly dry if not the weather gets too bad.
          </p><br/>

          <p className='px-3'>
          In some countries Rain Poncho is also popular Option. lIke in India or, 
          Nepal. But in high wind condition they become annoying and also you may 
          step on your poncho. If gradient is high it can be a big problem, also be 
          careful there are very prone to get caught in branches too. On the brighter 
          side they are inexpensive and lightweight.
          </p><br/>

          
          <h4 className='text-lg font-semibold text-zinc-700 float-left px-3'>Rain Pant : </h4>
          <p className='px-3'>
          You may want to include Rain Pant in your List if your pant do not offer 
          light waterproofing. And also if you are going on a trek in a monsoon make 
          sure to carry it.
          </p><br/><br/>

          {/* ---------------------------------------------------------------------------- */}

          <h2 className='text-xl font-extrabold text-orange-500 px-3 uppercase'>Season wise Layering Tip : 
          </h2><br/>
          
          <h4 className='text-lg font-semibold text-yellow-500 float-left pl-5 pr-2'>Summer : </h4>
          <p className='pl-5 pr-3'>
          In low Altitude Humid and Hot environment Cotton can be your Friend. Carry Cowboy 
          type round coverage Hat, Breathable full sleeve T-shirt and Trouser.
          </p><br/>
          
          <h4 className='text-lg font-semibold text-cyan-700 float-left pl-5 pr-2'>Winter : </h4>
          <p className='pl-5 pr-3'>
          Step by Step Layers would be. A Base Layer, Fleece, Down Jacket, Soft Shell Jacket, 
          Hardshell Jacket. Reduce Layer according to climate and effort needed to negotiate 
          the Day. In extreme cold you can increase a layer of Fleece.
          </p><br/>
          
          <h4 className='text-lg font-semibold text-green-600 float-left pl-5 pr-2'>Rain : </h4>
          <p className='pl-5 pr-3'>
          A Base Layer, Fleece, Soft Shell Layer and A Hard Shell Layer. A rain Pant for the lower.
          </p><br/><br/>

          {/* -------------------------------------------------------------------------------- */}

          <h2 className='text-xl font-extrabold text-rose-500 px-3 uppercase'>More Tips : 
          </h2><br/>

          <ol className='pl-5 pr-3 list-decimal list-inside italic'>
            <li>Use Buffs and  Caps/Hats. The head looses heat fast, cover that you will 
              feel more warm. Use this technique during sleeping too.
            </li>
            <li>use Zips as vents to control the heat inside your shell layers. Feeling 
              too warm open zips, You souldn&apos;t remove layers often, that defeats the 
              purpose of Layering.
            </li>
            <li>When stationary, you may need to put one more layer. Never remove 
              a Layer during taking rest, or waiting for someone back in the trail.
            </li>
            <li>Use Down Jacket when stationary or, in camp. Usually you won't need 
            Down Jacket in -20 degree celsius, if you are moving.
            </li>
            <li>You can regulate the heat inside, by choosing to go fast or, slow. 
              Though this need little expertise.
            </li>
          </ol>


          <div className='p-3'>
          <h5 className='font-semibold text-lg pt-20'>Source :</h5>
          <p className='text-sm'>
          <Link href={"https://andrewskurka.com/"} className='block text-sky-700'>https://andrewskurka.com/</Link>
          <Link href={"https://www.woolmark.com/"} className='block text-sky-700'>https://www.woolmark.com/</Link>
          <Link href={"https://www.treelinereview.com/"} className='block text-sky-700'>https://www.treelinereview.com/</Link>
          </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default page