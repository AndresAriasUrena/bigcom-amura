// components/product/product-description.tsx
'use client';

import { useState, useEffect } from 'react';
import { AddToCart } from '@/components/cart/add-to-cart';
import Price from '@/components/price';
import Prose from '@/components/prose';
import { VercelProduct as Product } from '@/lib/bigcommerce/types';
import Image from 'next/image';
import elem from '../../assets/Group 11.png';
import { notasImages, getNormalizedImageKey } from '@/lib/nota-images';

const acordeColors: { [key: string]: string } = {
  "Cacao": "#4B2E1E",
  "Café": "#6F4E37",
  "Ambar": "#FFBF00",
  "Balsámico": "#8A5E34",
  "Cuero": "#6A3D2B",
  "Canela": "#D2691E",
  "Oud": "#523A28",
  "Amielado": "#FFD700",
  "Amaderado": "#A0522D",
  "Ahumado": "#708090",
  "Afrutado": "#FF6347",
  "Atalcado": "#E6E6FA",
  "Rosa": "#FF69B4",
  "Rosas": "#792021",
  "Lavanda": "#8787C6",
  "Cítrico": "#FFD700",
  "Iris": "#5A4FCF",
  "Chocolate": "#3D2B1F",
  "Violeta": "#8A2BE2",
  "Floral": "#FFB6C1",
  "Dulce": "#FFA07A",
  "Tabaco": "#8B4513",
  "Vainilla": "#F3E5AB",
  "Terroso": "#7B3F00",
  "Verde": "#228B22",
  "Floral Blanco": "#FFFAF0",
  "Ron": "#8B3A62",
  "Caramelo": "#AF6E4D",
  "Fresco": "#00CED1",
  "Leñoso": "#A0522D",
  "Marina": "#4682B4",
  "Almizclado": "#C0C0C0",
  "default": "#D3D3D3"
};

const getAcordeColor = (acorde: string) => acordeColors[acorde] || acordeColors["default"];

export function ProductDescription({ product, productURL }: { product: Product; productURL: { decodedProductId: string; category: string } }) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    console.log("Full HTML Description:", product.description);
    console.log("Plain Text Description:", product.plainTextDescription);
  }, [product]);

  const notasarr = product.customFields.edges[0].node.value.split(',');
  const finalnotas = notasarr.map((nota) => nota.replace(/ /g, ''));

  const acordes = product.customFields.edges[1].node.value.split(',').map(acorde => acorde.trim());
  console.log(acordes)

  const handleChange = (event: any) => {
    const quantity = Number(event.target.value);
    setSelectedQuantity(quantity);
  };

  const gradientStyle = {
    background: `linear-gradient(to right, ${getAcordeColor(acordes[0])} 25%, ${getAcordeColor(acordes[1])} 50%, ${getAcordeColor(acordes[2])} 75%)`
  };

  return (
    <>
      <div className="flex flex-col gap-2 text-start text-white">
        <div className="space-y-2">
          <h1 className="font-Raleway text-[30px] font-bold text-white lg:text-3xl maxlg:mt-8">{product.title}</h1>
          {product.description ? <Prose className="font-sm py-3 font-Raleway font-light tracking-wider text-white lg:text-xl" html={product.descriptionHtml} /> : null}

          <div className="font-Raleway text-2xl">
            <Price amount={product.priceRange.maxVariantPrice.amount} currencyCode={product.priceRange.maxVariantPrice.currencyCode} />
          </div>
        </div>
        <div>
          <div className="mt-6 flex gap-2">
            <div className="relative">
              <span className="absolute bottom-0 right-4 top-0 my-auto flex items-center text-xs">▼</span>

              <select value={selectedQuantity} onChange={handleChange} className="appearance-none border-2 border-white bg-transparent py-3 pl-6 pr-8 font-Julius_Sans_One">
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num} className="bg-gray-700 px-[4%] py-3 text-white">
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <AddToCart variants={product.variants} availableForSale={product.availableForSale} quantity={selectedQuantity} productURL={productURL} />
          </div>
          <Image src={elem} alt="none" className="mt-5 w-full max-w-[450px]" />
        </div>

        <div>
          <p className="font-Raleway text-xl">Notas Principales:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {finalnotas.map((nota, index) => (
              <div className="relative group w-24 h-24" key={index}>
                <Image
                  src={notasImages[getNormalizedImageKey(nota)]}
                  className="w-full h-full object-cover"
                  alt={nota}
                  width={96}
                  height={96}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {nota}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="font-Raleway text-xl">Acordes:</p>
          <div className="mt-2 flex flex-wrap">
            <div className="flex w-full h-12 w-[80%]" style={gradientStyle}>
              {acordes.map((acorde, index) => (
                <button 
                  key={index}
                  className="font-Charm h-full p-2 text-lg tracking-wider text-white"
                  style={{ flex: '2 1 0%' }}
                >
                  {acorde}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}