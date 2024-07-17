'use client';

import Link from 'next/link';
import SlickSlider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Image from 'next/image';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { giftProducts } from '@/lib/bigcommerce/types';

export function GiftsCarousel({ gifts }: { gifts: giftProducts[] }) {
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
    slidesToShow: 5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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

  return (
    <SlickSlider {...settings} className="mx-2 sm:mx-6 sm:px-4">
      {gifts.map((item, index) => (
        <Link href={'categories/ideas-para-regalar/' + item.node.id} key={index}>
          <div className="group relative h-[600px] cursor-pointer overflow-hidden">
            <Image src={item.node.images.edges[0].node.url} width={500} height={500} alt="gift image" className="mx-auto h-full w-full max-w-[90%] object-cover sm:max-w-[95%]" />
            <div className="absolute inset-0 top-[calc(100%+400px)] flex items-center justify-center duration-300 group-hover:top-0 group-hover:bg-black/50">
              <div className="h-fit max-w-[400px] px-5 text-center">
                <h3 className="text-3xl">B683</h3>
                <p className="mt-4 text-2xl font-light">{item.node.name}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </SlickSlider>
  );
}
