'use client'

import TrekCard from '@/components/homecards'
import React from 'react'
import mockdata from '@/data/homepage_cards.json'
import { useState } from 'react'
import Scrollables from '@/components/scrollables'


function All() {

    const [sortBy, setSortBy] = useState('difficulty');

    const handleSort = (event : any) => {
        setSortBy(event.target.value);
    }

  return (
    <div className='bg-black min-h-screen text-white md:px-[10%] lg:px-[15%]'>
        <h1 className='text-8xl font-bold p-6 pb-0 mb-2'>All</h1>
        <p className='pr-[20%] pl-6'>List of All Activies, Treks and Expeditions, that we Organise or have Documented.</p>
    
        <section className='mt-8'>
            <section className='bg-yellow-600 p-2 md:p-6'>
                <h2 className='text-4xl font-semibold'>Hikes</h2>
                <div className="mt-8 flex flex-wrap">
                    {mockdata.map((trek) => trek.tag.includes('hike')? <Scrollables {...trek} key={trek.Index}/>:null)}
                </div>
            </section>

            <section className='bg-green-950 pl-2 p-6 md:p-6'>
                <div className='flex justify-between items-baseline'>
                <h2 className='text-4xl font-semibold'>Treks</h2>

                <div className="flex justify-end mb-4">
                    <label htmlFor="sort-select" className="mr-2 font-semibold">Sort By:</label>
                    <select id="sort-select" onChange={handleSort} className='bg-transparent'>
                        <option value="difficulty" className='text-black'>Difficulty</option>
                        <option value="duration" className='text-black'>Duration</option>
                    </select>
                </div>
                </div>
        
                <div className="mt-8 flex flex-wrap">
                {mockdata
                    .filter(trek => trek.tag.includes('trek'))
                    .sort((a, b) => {
                        if (sortBy === 'difficulty') {
                            return (a.Difficulty || 0) - (b.Difficulty || 0);
                        } else if (sortBy === 'duration') {
                            return (a.Duration || 0) - (b.Duration || 0);
                        }
                        return 0;
                    })
                    .map((treks) => (<Scrollables {...treks} key={treks.Index} />))}
            </div>
            </section>

            <section className='bg-red-950 pl-2 p-6 md:p-6'>
                <h2 className='text-4xl font-semibold'>Expeditions</h2>
                <div className="mt-8 flex flex-wrap">
                {mockdata
                .filter(trek => trek.tag.includes('expedition'))
                .sort((a, b) => a.Difficulty - b.Difficulty).map((treks) => (<Scrollables {...treks} key={treks.Index} />))}
                </div>
            </section>

            <section className='bg-red-300 pl-2 p-6 md:p-6'>
                <h2 className='text-4xl font-semibold'>Camps</h2>
                <div className="mt-8 flex flex-wrap">
                    {mockdata.map((trek) => trek.tag.includes('camp')? <Scrollables {...trek} key={trek.Index}/>:null)}
                </div>
            </section>

            <section className='bg-orange-300 pl-2 p-6 md:p-6'>
                <h2 className='text-4xl font-semibold'>Week-End Plans</h2>
                <div className="mt-8 flex flex-wrap">
                    {mockdata.map((trek) => trek.tag.includes('weekend-plan')? <Scrollables {...trek} key={trek.Index}/>:null)}
                </div>
            </section>

        </section>
    
    
    </div>
  )
}

export default All