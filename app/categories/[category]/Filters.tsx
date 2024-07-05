'use client';

import { useState } from 'react';
import React from 'react';
import Link from 'next/link';
import { categoryItems, Product } from '@/lib/bigcommerce/types';

export default function Filters({ items, category }: { items: categoryItems; category: string }) {
  const [products, setProducts] = useState({ products: [...items.edges], totalItems: items.collectionInfo.totalItems });
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState('');

  const [filtersArr, setFiltersArr] = useState([
    { label: 'Para Él', key: 'para-el', active: false },
    { label: 'Para Ella', key: 'para-ella', active: false },
    { label: 'Árabes', key: 'arabes', active: false },
    { label: 'Diseñador', key: 'dise-ador', active: false },
    { label: 'Alta Gama', key: 'alta-gama', active: false },
  ]);

  const [filtersArr2, setFiltersArr2] = useState([
    { label: 'frutales', key: 'frutales', active: false },
    { label: 'florales', key: 'florales', active: false },
    { label: 'herbales', key: 'herbales', active: false },
    { label: 'maderosas', key: 'maderosas', active: false },
    { label: 'sensuales', key: 'sensuales', active: false },
    { label: 'especiadas', key: 'especiadas', active: false },
    { label: 'dulces', key: 'dulces', active: false },
    { label: 'cítricas', key: 'cítricas', active: false },
    { label: 'balsamos', key: 'balsamos', active: false },
  ]);

  const toggleFilters = () => {
    if (showFilters) {
      setShowFilters(false);
    } else {
      setShowFilters(true);
    }
  };

  const loadFilteredProducts = async (item: { label: string; key: string; active: boolean }) => {
    setActiveFilters(item.key);

    const res = await fetch('/api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ category: item.key }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.status === 'success') {
        setProducts({ products: data.products.edges, totalItems: data.products.collectionInfo.totalItems });
      } else {
        alert(data.message);
      }
    }
  };

  return (
    <>
      {/* show no collection found */}
      {products.totalItems === 0 && <p className="col-span-4 py-3 text-center text-2xl font-semibold text-black">No collections found</p>}
      {/* show the products if the collection have products */}
      {products.totalItems > 0 && (
        <>
          {/* filters */}
          <div className="mb-8 flex w-full justify-between text-black ">
            <button onClick={toggleFilters} className="text-sm font-bold sm:text-lg">
              Filtros <span className="text-sm">▼</span>
            </button>
            <p className="text-wrap text-sm font-semibold md:text-base">Ayudame a encontrar mi aroma ⓘ</p>
          </div>

          <div className="grid grid-cols-4 gap-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-8">
            {/* filters */}
            {showFilters && (
              <div className="col-span-2 space-y-3">
                {/* Coleccionesa */}
                <h4 className=" mt-0 text-[28px] font-light text-black">Colecciones</h4>
                {filtersArr.map((item, index) => (
                  <div className="flex cursor-pointer gap-3" key={index} onClick={() => loadFilteredProducts(item)}>
                    <div className={`custom-checkbox group h-8  w-8 cursor-pointer border-4 border-black ${item.key === activeFilters && 'active'} ${item.key === category && activeFilters === '' && 'active'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="hidden h-6 w-6 text-black group-[.active]:block" viewBox="0 0 24 24">
                        <path fill="currentColor" d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83z" />
                      </svg>
                    </div>
                    <span className="text-2xl font-light text-black">{item.label}</span>
                  </div>
                ))}
                {/* Notas */}
                <h4 className="!mt-8 text-[28px] font-light text-black">Notas</h4>
                {filtersArr2.map((item, index) => (
                  <div className="flex cursor-pointer gap-3" key={index}>
                    <div className={`custom-checkbox group h-8  w-8 cursor-pointer border-4 border-black ${item.key === activeFilters && 'active'} ${item.key === category && activeFilters === '' && 'active'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="hidden h-6 w-6 text-black group-[.active]:block" viewBox="0 0 24 24">
                        <path fill="currentColor" d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83z" />
                      </svg>
                    </div>
                    <span className="text-2xl font-light text-black">{item.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* cards */}
            <div className={`grid gap-4 ${showFilters ? 'col-span-2 grid-cols-1 md:col-span-3 md:grid-cols-2 lg:col-span-3 xl:col-span-6 xl:grid-cols-3' : 'col-span-4 grid-cols-1 sm:grid-cols-2 md:col-span-5 md:grid-cols-3 xl:col-span-8'}`}>
              {products.products.map((item, index) => (
                <div key={index}>
                  <Link href={`/categories/${category}/${item.node.id}`} className="block h-full w-full rounded-md border">
                    {item.node.images.edges[0].node.url ? <img src={item.node.images.edges[0].node.url} className="size-full rounded-md object-contain" alt={item.node.images.edges[0].node.altText} /> : <div className="flex h-full min-h-[175px] items-center justify-center rounded-md border border-white/15 bg-black sm:min-h-[275px] lg:min-h-[400px]">No Image Found</div>}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
