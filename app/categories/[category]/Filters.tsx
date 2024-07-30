'use client';

import { useState, useEffect } from 'react';
import React from 'react';
import Link from 'next/link';
import { categoryItems, Product } from '@/lib/bigcommerce/types';

export default function Filters({ items, category, brands }: { items: categoryItems; category: string; brands: any }) {
  const [products, setProducts] = useState({ products: [...items.edges], totalItems: items.collectionInfo.totalItems });
  const [showFilters, setShowFilters] = useState(false);
  const [activeBrandFilter, setActiveBrandFilter] = useState('');
  const [selectedMobileFilter, setSelectedMobileFilter] = useState('');
  const [selectedMobileFilterBrand, setSelectedMobileFilterBrand] = useState('');
  const [selectedMobileFilterSort, setSelectedMobileFilterSort] = useState('');
  const [toda, setToda] = useState(false);
  // modals
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showBrandModal, setShowBrandModal] = useState(false);

  const [filtersArr, setFiltersArr] = useState([
    { label: 'Para Él', key: 'para-el', active: false },
    { label: 'Para Ella', key: 'para-ella', active: false },
    { label: 'Árabes', key: 'arabes', active: false },
    { label: 'Diseñador', key: 'dise-ador', active: false },
    { label: 'Alta Gama', key: 'alta-gama', active: false },
  ]);

  const [sortBy, setSortBy] = useState([
    { label: 'Bajo a alto', key: 'lth', active: false },
    { label: 'De alto a bajo', key: 'htl', active: false },
  ]);

  useEffect(() => {
    if (window.innerWidth > 1200) {
      setShowFilters(true);
    }
    const updatedFilterscategory: any = filtersArr.map((item) => {
      if (item.key === category) {
        setSelectedMobileFilter(item.key);
        return { ...item, active: true };
      }
      return item;
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
      setActiveBrandFilter('');
      // @ts-ignore
      setSelectedMobileFilter(item.key);

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
    }

    if (type === 'brands') {
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
            // @ts-ignore
            setSelectedMobileFilterBrand(item);

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

    if (type === 'sortBy') {
      const updatedSortFilters = sortBy.map((sortitem: { label: string; key: string; active: boolean }, i) => {
        if (i === index) {
          // @ts-ignore
          setSelectedMobileFilterSort(item.label);
        }
        return { ...sortitem, active: index === i ? true : false };
      });

      setSortBy(updatedSortFilters);
      // @ts-ignore
      if (item.key === 'lth') {
        // @ts-ignore
        products.products.sort((a, b) => a.node.prices.price.value - b.node.prices.price.value);
      }
      // @ts-ignore
      if (item.key === 'htl') {
        // @ts-ignore
        products.products.sort((a, b) => b.node.prices.price.value - a.node.prices.price.value);
      }
    }
    setToda(false);
  };

  const loadall = async () => {
    try {
      const res = await fetch('/api/get-all-products');
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'success') {
          const updatedFilters = filtersArr.map((product: { label: string; key: string; active: boolean }, i) => {
            return { ...product, active: false };
          });
          setFiltersArr(updatedFilters);
          setToda(true);
          const allProducts = data.products.map((product: any) => ({ node: product }));
          setProducts({ products: allProducts, totalItems: data.products.length });
        } else {
          alert(data.message);
        }
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  return (
    <>
      {/* show the products if the collection have products */}
      <>
        {/* filters */}
        <div className="sticky top-0 z-10 mb-4 flex w-full justify-between bg-white py-4 text-black lg:mb-8 ">
          <button onClick={toggleFilters} className="text-sm font-bold sm:text-lg">
            Filtros <span className="text-sm">▼</span>
          </button>
          <p className="text-wrap text-sm font-semibold md:text-base">Ayudame a encontrar mi aroma ⓘ</p>
        </div>
        {showFilters && (
          <>
            {/* mobile filters  */}
            <div className="sticky top-12 grid grid-cols-2 gap-2 bg-white pb-4 lg:hidden ">
              {/* collections */}
              <div>
                <h3 className="mb-2 font-medium text-black">Colecciones</h3>
                <div className="relative flex h-[42px] items-center border-2 pl-3" onClick={() => setShowCategoryModal(true)}>
                  <span className="capitalize text-black">{selectedMobileFilter}</span>
                  <div className="absolute bottom-0 right-3 top-0 my-auto h-fit  text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                      <g transform="rotate(-90 12 12)">
                        <path fill="none" stroke="currentColor" strokeDasharray="10" strokeDashoffset="10" strokeLinecap="round" strokeWidth="2" d="M8 12L15 5M8 12L15 19">
                          <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="10;0" />
                        </path>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              {/* Marcas */}
              <div>
                <h3 className="mb-2 font-medium text-black">Marcas</h3>
                <div className="relative flex h-[42px] items-center border-2 pl-3" onClick={() => setShowBrandModal(true)}>
                  <span className="text-black">{selectedMobileFilterBrand ? selectedMobileFilterBrand : 'Seleccionar Marca'}</span>
                  <div className="absolute bottom-0 right-3 top-0 my-auto h-fit  text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                      <g transform="rotate(-90 12 12)">
                        <path fill="none" stroke="currentColor" strokeDasharray="10" strokeDashoffset="10" strokeLinecap="round" strokeWidth="2" d="M8 12L15 5M8 12L15 19">
                          <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="10;0" />
                        </path>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              {/* Ordenar por */}
              <div className="col-span-full">
                <h3 className="mb-2 font-medium text-black">Ordenar por</h3>
                <div className="relative flex h-[42px] items-center border-2 pl-3" onClick={() => setShowSortModal(true)}>
                  <span className="text-black">{selectedMobileFilterSort ? selectedMobileFilterSort : 'Seleccionar Ordenar por'}</span>
                  <div className="absolute bottom-0 right-3 top-0 my-auto h-fit  text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                      <g transform="rotate(-90 12 12)">
                        <path fill="none" stroke="currentColor" strokeDasharray="10" strokeDashoffset="10" strokeLinecap="round" strokeWidth="2" d="M8 12L15 5M8 12L15 19">
                          <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="10;0" />
                        </path>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {/* mobile filter modals */}
        {showCategoryModal && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/75">
            <div className="relative h-[85%] w-[85%] rounded-md bg-white shadow-xl">
              {/* close icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-4 top-6 size-6 text-black" viewBox="0 0 24 24" onClick={() => setShowCategoryModal(false)}>
                <path fill="none" stroke="currentColor" strokeDasharray="12" strokeDashoffset="12" strokeLinecap="round" strokeWidth="2" d="M12 12L19 19M12 12L5 5M12 12L5 19M12 12L19 5">
                  <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="12;0" />
                </path>
              </svg>
              <div className=" space-y-3 p-8 pt-4 text-black">
                <h4 className="mb-8 text-[28px] font-light text-black">Colecciones</h4>
                {filtersArr.map((item, index) => (
                  <div
                    className="flex cursor-pointer items-center gap-3"
                    key={index}
                    onClick={() => {
                      loadFilteredProducts(item, index, 'collection', '');
                      setShowCategoryModal(false);
                    }}
                  >
                    <div className={`custom-checkbox group size-6 cursor-pointer border-[3px] border-black ${item.active && 'active'} `}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="hidden size-[18px] text-black group-[.active]:block" viewBox="0 0 24 24">
                        <path fill="currentColor" d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83z" />
                      </svg>
                    </div>
                    <span className="text-xl font-light text-black">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {showBrandModal && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/75">
            <div className="relative h-[85%] w-[85%] rounded-md bg-white shadow-xl">
              {/* close icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-4 top-6 size-6 text-black" viewBox="0 0 24 24" onClick={() => setShowBrandModal(false)}>
                <path fill="none" stroke="currentColor" strokeDasharray="12" strokeDashoffset="12" strokeLinecap="round" strokeWidth="2" d="M12 12L19 19M12 12L5 5M12 12L5 19M12 12L19 5">
                  <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="12;0" />
                </path>
              </svg>
              <div className=" space-y-3 p-8 pt-4 text-black">
                <h4 className=" text-[28px] font-light text-black">Marcas</h4>
                {brands.map((item: { node: { id: string; name: string } }, index: number) => (
                  <div
                    className="flex cursor-pointer items-center gap-3"
                    key={index}
                    onClick={() => {
                      loadFilteredProducts(item.node.name, index, 'brands', item.node.id);
                      setShowBrandModal(false);
                    }}
                  >
                    <div className={`custom-checkbox group size-6 cursor-pointer border-[3px] border-black ${item.node.id === activeBrandFilter && 'active'} `}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="hidden size-[18px] text-black group-[.active]:block" viewBox="0 0 24 24">
                        <path fill="currentColor" d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83z" />
                      </svg>
                    </div>
                    <span className="text-xl font-light text-black">{item.node.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {showSortModal && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/75">
            <div className="relative h-[85%] w-[85%] rounded-md bg-white shadow-xl">
              {/* close icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="absolute right-4 top-6 size-6 text-black" viewBox="0 0 24 24" onClick={() => setShowSortModal(false)}>
                <path fill="none" stroke="currentColor" strokeDasharray="12" strokeDashoffset="12" strokeLinecap="round" strokeWidth="2" d="M12 12L19 19M12 12L5 5M12 12L5 19M12 12L19 5">
                  <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="12;0" />
                </path>
              </svg>

              <div className=" space-y-3 p-8 pt-4 text-black">
                <h4 className="mb-9 text-[28px] font-light text-black">Ordenar por</h4>
                {sortBy.map((item: { label: string; key: string; active: boolean }, index: number) => (
                  <div
                    className="flex cursor-pointer items-center gap-3"
                    key={index}
                    onClick={() => {
                      loadFilteredProducts(item, index, 'sortBy', '');
                      setShowSortModal(false);
                    }}
                  >
                    <div className={`custom-checkbox group size-6 cursor-pointer border-[3px] border-black ${item.active && 'active'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="hidden size-[18px] text-black group-[.active]:block" viewBox="0 0 24 24">
                        <path fill="currentColor" d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83z" />
                      </svg>
                    </div>
                    <span className="text-xl font-light text-black">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------- */}
        <div className="flex gap-8">
          {/* filters */}
          {showFilters && (
            <>
              {/*  desktop filters */}
              <div className="sticky top-12 h-fit min-w-[200px] space-y-3  maxlg:hidden">
                {/* Coleccionesa */}
                <h4 className=" mt-0 text-[28px] font-light text-black">Colecciones</h4>
                <div className="flex cursor-pointer items-center gap-3" onClick={loadall}>
                  <div className={`custom-checkbox group size-6 cursor-pointer border-[3px] border-black ${toda && 'active'} `}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="hidden size-[18px] text-black group-[.active]:block" viewBox="0 0 24 24">
                      <path fill="currentColor" d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83z" />
                    </svg>
                  </div>
                  <span className="text-xl font-light text-black">Toda</span>
                </div>
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
            </>
          )}

          {/* cards */}
          {products.totalItems > 0 ? (
            <div className={`grid w-full gap-4 xs:grid-cols-2 md:grid-cols-3 ${showFilters ? 'lg:grid-cols-2 co2xl:grid-cols-3' : 'lg:grid-cols-3 co2xl:grid-cols-4'}`}>
              {products.products.map((item, index) => (
                <div key={index}>
                  <Link href={`/categories/${category}/${item.node.id}`} className="block h-full max-h-[358px] w-full rounded-md border p-4">
                    {item.node.images.edges[0].node.url ? <img src={item.node.images.edges[0].node.url} className="size-full rounded-md object-cover" alt={item.node.images.edges[0].node.altText} /> : <div className="flex h-full min-h-[175px] items-center justify-center rounded-md border border-white/15 bg-black sm:min-h-[275px] lg:min-h-[400px]">No Image Found</div>}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="w-full py-3 text-center text-2xl font-semibold text-black">No Products found</p>
          )}
          {/* sort by */}
          {showFilters && (
            <div className="sticky top-12 h-fit min-w-[200px] space-y-3 maxlg:hidden">
              <h4 className=" mt-0 text-[28px] font-light text-black">Ordenar por</h4>
              {sortBy.map((item: { label: string; key: string; active: boolean }, index: number) => (
                <div className="flex cursor-pointer items-center gap-3" key={index} onClick={() => loadFilteredProducts(item, index, 'sortBy', '')}>
                  <div className={`custom-checkbox group size-6 cursor-pointer border-[3px] border-black ${item.active && 'active'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="hidden size-[18px] text-black group-[.active]:block" viewBox="0 0 24 24">
                      <path fill="currentColor" d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83z" />
                    </svg>
                  </div>
                  <span className="text-xl font-light text-black">{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    </>
  );
}
