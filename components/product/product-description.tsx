'use client';

import { useState } from 'react';
import { AddToCart } from '@/components/cart/add-to-cart';
import Price from '@/components/price';
import Prose from '@/components/prose';
import { VercelProduct as Product } from '@/lib/bigcommerce/types';
import Image from 'next/image';
import elem from '../../assets/Group 11.png';

export function ProductDescription({ product, productURL }: { product: Product; productURL: { decodedProductId: string; category: string } }) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const notasarr = product.customFields.edges[0].node.value.split(',');
  const finalnotas = notasarr.map((nota) => nota.replace(/ /g, ''));

  const acordes = product.customFields.edges[1].node.value.split(',');

  const handleChange = (event: any) => {
    const quantity = Number(event.target.value);
    setSelectedQuantity(quantity);
  };

  return (
    <>
      <div className="flex flex-col gap-2 text-start text-white">
        <div className="space-y-2">
          <h1 className="font-Raleway text-[30px] font-bold text-white lg:text-3xl maxlg:mt-8">{product.title}</h1>
          {product.description ? <Prose className="font-sm py-3 font-Raleway font-light tracking-wider text-white lg:text-xl" html={product.description} /> : null}
          <div className="font-Raleway text-2xl">
            <Price amount={product.priceRange.maxVariantPrice.amount} currencyCode={product.priceRange.maxVariantPrice.currencyCode} />
          </div>
        </div>
        <div>
          <div className="mt-6 flex gap-2">
            <div className="relative">
              <span className="absolute bottom-0 right-4 top-0 my-auto flex items-center text-xs">▼</span>

              <select value={selectedQuantity} onChange={handleChange} className="appearance-none border-2 border-white bg-transparent py-3 pl-6 pr-8 font-Julius_Sans_One">
                <option value="1" className="bg-gray-700 px-[4%] py-3 text-white ">
                  1
                </option>
                <option value="2" className="bg-gray-700 px-[4%] py-3 text-white ">
                  2
                </option>
                <option value="3" className="bg-gray-700 px-[4%] py-3 text-white ">
                  3
                </option>
                <option value="4" className="bg-gray-700 px-[4%] py-3 text-white ">
                  4
                </option>
                <option value="5" className="bg-gray-700 px-[4%] py-3 text-white ">
                  5
                </option>
              </select>
            </div>
            <AddToCart variants={product.variants} availableForSale={product.availableForSale} quantity={selectedQuantity} productURL={productURL} />
          </div>
          <Image src={elem} alt="none" className="mt-5 w-full max-w-[450px] " />
        </div>

        <div>
          <p className="font-Raleway text-xl">Notas Principales:</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {finalnotas.map((nota, index) => (
              <img src={`/notas/${nota}.png`} className="size-16" alt={nota} key={index} />
            ))}
          </div>
        </div>

        <div>
          <p className="font-Raleway text-xl">Acordes:</p>
          <div className="mt-2 flex gap-1 maxlg:max-w-[240px] maxlg:flex-col">
            <button className="font-Charm block grow border-2  border-white bg-[#DDDDDD]/50 p-2 text-lg tracking-wider lg:w-[40%] maxlg:w-full">{acordes[0]}</button>
            <button className="font-Charm block grow border-2 border-white  bg-[#DDDDDD]/50 p-2 text-lg tracking-wider lg:w-[35%] maxlg:w-4/5">{acordes[1]}</button>
            <button className="font-Charm block grow border-2 border-white  bg-[#DDDDDD]/50 p-2 text-lg tracking-wider lg:w-[25%] maxlg:w-2/3">{acordes[2]}</button>
          </div>
        </div>
      </div>
    </>
  );
}
