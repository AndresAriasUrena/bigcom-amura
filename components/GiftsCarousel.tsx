'use client';

import SlickSlider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { giftProducts } from '@/lib/bigcommerce/types';

import { default as image1, default as image5, default as image9 } from '../assets/Gift1.png';
import { default as image10, default as image2, default as image6 } from '../assets/Gift2.png';
import { default as image3, default as image7 } from '../assets/Gift3.png';
import { default as image4, default as image8 } from '../assets/Gift4.png';

export function GiftsCarousel({ gifts }: { gifts: giftProducts[] }) {
  const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10];

  const SampleNextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return <FaChevronRight className="absolute -right-4 bottom-0 top-0 my-auto h-8 w-8 cursor-pointer text-white/25 duration-200 hover:text-white  md:-right-8" onClick={onClick} />;
  };

  const SamplePrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return <FaChevronLeft className="absolute -left-4 bottom-0 top-0 my-auto h-8 w-8 cursor-pointer text-white/25 duration-200 hover:text-white md:-left-8" onClick={onClick} />;
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
    <SlickSlider {...settings} className="mx-2 sm:mx-6 sm:px-4">
      {gifts.map((item, index) => (
        <div className="group relative h-[600px] cursor-pointer overflow-hidden" key={index}>
          <img src={item.node.images.edges[0].node.url} alt="gift image" className="mx-auto h-full w-full max-w-[90%] object-cover sm:max-w-[95%]" />
          <div className="absolute inset-0 top-[calc(100%+400px)] flex items-center justify-center duration-300 group-hover:top-0 group-hover:bg-black/50">
            <div className="h-fit max-w-[400px] px-5 text-center">
              <h3 className="text-3xl">B683</h3>
              <p className="mt-4 text-2xl font-light">{item.node.name}</p>
            </div>
          </div>
        </div>
      ))}
    </SlickSlider>
  );
}
