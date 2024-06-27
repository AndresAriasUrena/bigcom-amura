'use client';
import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { VercelProduct as Product } from 'lib/bigcommerce/types';
import Image from 'next/image';
import { useState } from 'react';
import elem from '../../assets/Group 11.png';
import p1 from '../../assets/p1.png';
import p2 from '../../assets/p2.png';
import p3 from '../../assets/p3.png';
import p4 from '../../assets/p4.png';
import p5 from '../../assets/p5.png';

export function ProductDescription({ product }: { product: Product }) {
  const options: string[] = [p1, p2, p3, p4, p5].map((path) => path.src);
  const [selectedImage, setSelectedImage] = useState(options[0]); // Set initial selected image URL

  return (
    <>
      <div className="flex flex-col gap-2 text-start text-white">
        <div className="space-y-2">
          <h1 className="text-[30px] font-bold text-white lg:text-3xl">{product.title}</h1>
          {product.descriptionHtml ? <Prose className="font-sm py-3 font-light text-white" html={product.descriptionHtml} /> : null}
          <div className="text-2xl">
            <Price amount={product.priceRange.maxVariantPrice.amount} currencyCode={product.priceRange.maxVariantPrice.currencyCode} />
          </div>
        </div>
        <div>
          <div className="flex gap-2">
            <select className="border-2 border-white bg-transparent px-[4%] py-3 ">
              <option value="" className="bg-gray-700 px-[4%] py-3 text-white ">
                100 ml
              </option>
              <option value="" className="bg-gray-700 px-[4%] py-3 text-white ">
                200 ml
              </option>
              <option value="" className="bg-gray-700 px-[4%] py-3 text-white ">
                500 ml
              </option>
            </select>
            <AddToCart variants={product.variants} availableForSale={product.availableForSale} />
          </div>
          <Image src={elem} alt="none" className="w-full pt-3 lg:w-3/4" />
        </div>

        <div>
          <p>{product?.options ? '' : 'Notas principales:'}</p>
          <div className="grid w-[80%] grid-cols-5 gap-[2px] lg:w-[60%]">
            {options.map((img, index) => (
              <div key={index} className={`cursor-pointer ${selectedImage === img ? 'border-2 border-white' : ''}`} onClick={() => setSelectedImage(img)}>
                <Image src={img} alt={`image-${index}`} />
              </div>
            ))}
          </div>
        </div>

        <div>
          <p>Acordes:</p>
          <div className="flex flex-col gap-2 space-x-[1px] lg:flex-row lg:gap-3">
            <button className="w-[80%] border-2 border-white bg-[#DDDDDD]/50 px-[10%] py-1 lg:w-full">intenso</button>
            <button className="w-[65%] border-2 border-white bg-[#DDDDDD]/50 px-[10%] py-1 lg:w-full">sensual</button>
            <button className="w-[50%] border-2 border-white bg-[#DDDDDD]/50 px-[10%] py-1 lg:w-full">cálido</button>
          </div>
        </div>
      </div>
    </>
  );
}
