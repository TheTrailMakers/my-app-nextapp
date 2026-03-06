"use client";

import Link from 'next/link';
import React, { useState } from 'react';

type Batch = {
  day: string;
  batchSize: number;
  available: number;
};

function Calendar({ month, batches, trekSlug }: { month: string; batches: Batch[]; trekSlug?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-2 flex-col w-full bg-amber-500 rounded-lg py-1 hover:bg-amber-600 transition-colors">
      <button onClick={() => setOpen(!open)} className="flex justify-between items-center w-full px-2 py-1 font-semibold">
        <span className="text-stone-900 text-left">{month}</span>
        <span className="text-2xl leading-4">{open ? '-' : '+'}</span>
      </button>

      <div className={`grid overflow-hidden transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'} bg-amber-800 text-neutral-300 rounded-b-lg`}>
        <div className="overflow-hidden">
          {batches.map((batch, index) => {
            const href = trekSlug ? `/treks/${trekSlug}` : "https://wa.me/7980426832";
            return (
              <Link href={href} key={index}>
                <div className="flex justify-between items-left text-xs px-4 py-2 border-b border-amber-700 last:border-b-0 hover:bg-amber-700 transition-colors cursor-pointer">
                  <span>{batch.day}</span>
                  <span>Seats: {batch.batchSize}</span>
                  <span>Left: {batch.available}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Calendar;