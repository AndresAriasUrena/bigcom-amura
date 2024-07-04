'use client';
import { useState } from 'react';
import React from 'react';
import Link from 'next/link';
import { BigCommerceCategoryWithId } from '@/lib/bigcommerce/types';

export default function Filters({ categories }: { categories: BigCommerceCategoryWithId[] }) {
  const [showFilters, setShowFilters] = useState(false);
  // console.log(categories);
  const toggleFilters = () => {
    if (showFilters) {
      setShowFilters(false);
    } else {
      setShowFilters(true);
    }
  };
  return (
    <>
      {/* filters */}
      <div className="mb-8 flex w-full justify-between text-black ">
        <button onClick={toggleFilters} className="text-lg font-bold">
          Filtros <span className="text-sm">▼</span>
        </button>
        <p className="font-semibold">Ayudame a encontrar mi aroma ⓘ</p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {/* filters */}
        {showFilters && <div className="bg-red-500"></div>}
        {/* cards */}
        <div className={`grid gap-4 ${showFilters ? 'col-span-3 grid-cols-1 md:grid-cols-2' : 'col-span-4  grid-cols-1 md:grid-cols-4'}`}>
          {categories.map((category, index) => (
            <div key={index}>
              <Link href={`/categories${category.path}`} className="block h-full w-full">
                {category.image ? <img src={category.image.urlOriginal} className="size-full rounded-md object-cover" alt={category.image.urlOriginal} /> : <div className="flex h-full min-h-[400px] items-center justify-center rounded-md border border-white/15 bg-black/75">{category.name}</div>}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
