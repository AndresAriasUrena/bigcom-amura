'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import Link from 'next/link';
import { categoryItems, Product } from '@/lib/bigcommerce/types';

export default function Filters({ items, category, brands }: { items: categoryItems; category: string; brands: any }) {
  const [products, setProducts] = useState({ products: [...items.edges], totalItems: items.collectionInfo.totalItems });
  const [showFilters, setShowFilters] = useState(false);
  const [activeBrandFilter, setActiveBrandFilter] = useState('');

  const [filtersArr, setFiltersArr] = useState([
    { label: 'Para Él', key: 'para-el', active: false },
    { label: 'Para Ella', key: 'para-ella', active: false },
    { label: 'Árabes', key: 'arabes', active: false },
    { label: 'Diseñador', key: 'dise-ador', active: false },
    { label: 'Alta Gama', key: 'alta-gama', active: false },
  ]);

  useEffect(() => {
    if (window.innerWidth > 1200) {
      setShowFilters(true);
    }
    const updatedFilterscategory: any = filtersArr.map((item) => {
      return item.key === category ? { ...item, active: true } : item;
    });
    setFiltersArr(updatedFilterscategory);
  }, [items]);

  const toggleFilters = () => {
    if (showFilters) {
      setShowFilters(false);
    } else {
      setShowFilters(true);
    }
  };

  const loadFilteredProducts = async (item: { label: string; key: string; active: boolean } | string, index: number, type: string, brandID: string) => {
    if (type === 'collection') {
      const updatedFilters = filtersArr.map((product: { label: string; key: string; active: boolean }, i) => {
        if (i === index) {
          return { ...product, active: !product.active };
        }
        return product;
      });

      setFiltersArr(updatedFilters);

      let allProducts: any[] = [];
      let totalItemsCount = 0;

      for (const filter of updatedFilters) {
        if (filter.active) {
          try {
            const res = await fetch('/api/get-products', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ category: filter.key }),
            });

            if (res.ok) {
              const data = await res.json();
              if (data.status === 'success') {
                allProducts = [...allProducts, ...data.products.edges];
                totalItemsCount += data.products.collectionInfo.totalItems;
              } else {
                alert(data.message);
              }
            }
          } catch (error) {
            console.error('Failed to fetch products:', error);
          }
        }
      }

      setProducts({ products: allProducts, totalItems: totalItemsCount });
    } else {
      try {
        const res = await fetch('/api/get-all-products');
        if (res.ok) {
          const data = await res.json();
          if (data.status === 'success') {
            const updatedFilters = filtersArr.map((product: { label: string; key: string; active: boolean }, i) => {
              return { ...product, active: false };
            });

            setFiltersArr(updatedFilters);
            setActiveBrandFilter(brandID);

            const brandProducts = data.products.filter((product: any) => product.brand.name === item).map((product: any) => ({ node: product }));

            // totalItemsCount += data.products.collectionInfo.totalItems;
            setProducts({ products: brandProducts, totalItems: brandProducts.length });
          } else {
            alert(data.message);
          }
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    }
  };

  return (
    <>
      {/* show the products if the collection have products */}
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
            <div className="sticky top-0 col-span-2 h-fit space-y-3">
              {/* Coleccionesa */}
              <h4 className=" mt-0 text-[28px] font-light text-black">Colecciones</h4>
              {filtersArr.map((item, index) => (
                <div className="flex cursor-pointer items-center gap-3" key={index} onClick={() => loadFilteredProducts(item, index, 'collection', '')}>
                  <div className={`custom-checkbox group size-6 cursor-pointer border-[3px] border-black ${item.active && 'active'} `}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="hidden size-[18px] text-black group-[.active]:block" viewBox="0 0 24 24">
                      <path fill="currentColor" d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83z" />
                    </svg>
                  </div>
                  <span className="text-xl font-light text-black">{item.label}</span>
                </div>
              ))}
              {/* marcas */}
              <h4 className="!mt-8 text-[28px] font-light text-black">Marcas</h4>
              {brands.map((item: { node: { id: string; name: string } }, index: number) => (
                <div className="flex cursor-pointer items-center gap-3" key={index} onClick={() => loadFilteredProducts(item.node.name, index, 'brands', item.node.id)}>
                  <div className={`custom-checkbox group size-6 cursor-pointer border-[3px] border-black ${item.node.id === activeBrandFilter && 'active'} `}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="hidden size-[18px] text-black group-[.active]:block" viewBox="0 0 24 24">
                      <path fill="currentColor" d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83z" />
                    </svg>
                  </div>
                  <span className="text-xl font-light text-black">{item.node.name}</span>
                </div>
              ))}
            </div>
          )}

          {/* cards */}
          {products.totalItems > 0 ? (
            <div className={`grid gap-4 ${showFilters ? 'col-span-2 grid-cols-1 md:col-span-3 md:grid-cols-2 lg:col-span-3 xl:col-span-6 xl:grid-cols-3' : 'col-span-4 grid-cols-1 sm:grid-cols-2 md:col-span-5 md:grid-cols-3 xl:col-span-8'}`}>
              {products.products.map((item, index) => (
                <div key={index}>
                  <Link href={`/categories/${category}/${item.node.id}`} className="block h-full max-h-[358px] w-full rounded-md border">
                    {item.node.images.edges[0].node.url ? <img src={item.node.images.edges[0].node.url} className="size-full rounded-md object-cover" alt={item.node.images.edges[0].node.altText} /> : <div className="flex h-full min-h-[175px] items-center justify-center rounded-md border border-white/15 bg-black sm:min-h-[275px] lg:min-h-[400px]">No Image Found</div>}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="col-span-2 py-3 text-center text-2xl font-semibold text-black xl:col-span-6">No Products found</p>
          )}
        </div>
      </>
    </>
  );
}
