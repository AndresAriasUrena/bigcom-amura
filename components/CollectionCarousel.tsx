'use client';
import { useState } from 'react';
import SlickSlider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import background from '@/assets/SliderBG2.png';
import arrow from '../assets/icons/right-arrow.png';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

import { default as image1, default as image5, default as image9 } from '../assets/Gift1.png';
import { default as image10, default as image2, default as image6 } from '../assets/Gift2.png';
import { default as image3, default as image7 } from '../assets/Gift3.png';
import { default as image4, default as image8 } from '../assets/Gift4.png';

export function CollectionCarousel() {
  const [tab, setTab] = useState(2);
  const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10];

  const SampleNextArrow = (props: any) => {
    const { onClick } = props;
    return <img onClick={onClick} src={arrow.src} className="absolute -top-16 right-4 h-9  w-11 cursor-pointer duration-200" alt="arrow-right" />;
  };

  const SamplePrevArrow = (props: any) => {
    const { onClick } = props;
    return <img onClick={onClick} src={arrow.src} className="absolute -top-16 left-4 h-9 w-11  rotate-180 cursor-pointer duration-200" alt="arrow-left" />;
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative pb-12 ">
      <img src={background.src} className="absolute inset-0 z-[-1] h-full w-full object-cover " alt="carousle background" />
      {/* tabs */}
      <div className="mx-auto flex w-full bg-black/25 px-[5%]">
        <div onClick={() => setTab(1)} className={`grow cursor-pointer border-2 p-4 text-center text-2xl font-light duration-200 hover:bg-black/50 ${tab === 1 ? 'border-white' : 'border-transparent'}`}>
          Diseñador
        </div>
        <div onClick={() => setTab(2)} className={`grow cursor-pointer border-2 p-4 text-center text-2xl font-light duration-200 hover:bg-black/50 ${tab === 2 ? 'border-white' : 'border-transparent'}`}>
          Alta Gama
        </div>
        <div onClick={() => setTab(3)} className={`grow cursor-pointer border-2 p-4 text-center text-2xl font-light duration-200 hover:bg-black/50 ${tab === 3 ? 'border-white' : 'border-transparent'}`}>
          Árabes
        </div>
      </div>
      <SlickSlider {...settings} className="mx-2 mt-24 sm:mx-6 sm:px-4">
        {images.map((image, index) => (
          <div className="h-[600px]" key={index}>
            <img src={image.src} alt="gift image" className="mx-auto h-full w-full max-w-[90%] object-cover sm:max-w-[95%]" />
          </div>
        ))}
      </SlickSlider>
    </div>
  );
}
