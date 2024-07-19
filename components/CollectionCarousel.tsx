'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SlickSlider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import background from '@/assets/SliderBG2.png';
import arrow from '../assets/icons/right-arrow.png';

import { CollectionProducts } from '@/lib/bigcommerce/types';

export function CollectionCarousel({ collections }: { collections: CollectionProducts }) {
  const [tab, setTab] = useState('designer');
  const [data, setData] = useState([]);

  const NextArrow = (props: any) => {
    const { onClick } = props;
    return <img onClick={onClick} src={arrow.src} className="absolute -top-16 right-4 h-9  w-11 cursor-pointer duration-200" alt="arrow-right" />;
  };

  const PrevArrow = (props: any) => {
    const { onClick } = props;
    return <img onClick={onClick} src={arrow.src} className="absolute -top-16 left-4 h-9 w-11  rotate-180 cursor-pointer duration-200" alt="arrow-left" />;
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 5,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    // @ts-ignore
    setData([...collections[tab].products.edges, ...collections[tab].products.edges, ...collections[tab].products.edges]);
  }, [tab]);

  return (
    <div className="relative pb-12 ">
      <img src={background.src} className="absolute inset-0 z-[-1] h-full w-full object-cover " alt="carousle background" />
      {/* tabs */}
      <div className=" mx-auto flex w-full flex-wrap bg-black/50 px-[5%] uppercase">
        <div onClick={() => setTab('designer')} className={`grow cursor-pointer border-2 p-4 text-center text-2xl font-light duration-200 hover:bg-black/50 ${tab === 'designer' ? 'border-white' : 'border-transparent'}`}>
          Diseñador
        </div>
        <div onClick={() => setTab('highEnd')} className={`grow cursor-pointer border-2 p-4 text-center text-2xl font-light duration-200 hover:bg-black/50 ${tab === 'highEnd' ? 'border-white' : 'border-transparent'}`}>
          Alta Gama
        </div>
        <div onClick={() => setTab('arabs')} className={`grow cursor-pointer border-2 p-4 text-center text-2xl font-light duration-200 hover:bg-black/50 ${tab === 'arabs' ? 'border-white' : 'border-transparent'}`}>
          Árabes
        </div>
      </div>
      <SlickSlider {...settings} className="mx-2 mt-24 sm:mx-6 sm:px-4">
        {/* @ts-ignore */}
        {data.length > 0 &&
          data.map((item: any, index: number) => (
            // @ts-ignore
            <Link href={'/categories' + collections[tab].path + item.node.id} className={''} key={index}>
              <div className="group relative">
                <div className="mx-auto h-[600px] max-w-[90%] sm:max-w-[95%]">
                  <img src={item.node.images.edges[0].node.url} alt="gift image" className="mx-auto h-full w-full  object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 mx-auto flex max-w-[90%] items-center justify-center bg-black/50 duration-300 sm:max-w-[95%] ">
                    <div className="w-full px-6 py-4 lg:h-[144px]">
                      <h3 className="text-lg font-extralight uppercase md:text-xl">{item.node.brand.name}</h3>
                      <p className="mt-2 truncate text-base font-normal italic lg:text-lg">{item.node.name}</p>
                      <p className="mt-2 truncate text-base font-light lg:text-lg ">{item.node.prices.price.formatted}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </SlickSlider>
    </div>
  );
}
