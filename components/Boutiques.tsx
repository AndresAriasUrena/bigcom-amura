'use client';

import Curridabat from '@/assets/Curridabat.png';
import escazu from '@/assets/Escazu.png';
import sabana from '@/assets/Sabana.png';
import boutique from '@/assets/boutiques.webp';
import momentum from '@/assets/mementum.png';

import SlickSlider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

export function Boutique() {
  const settings = {
    infinite: true,
    speed: 500,
    nav: false,
    arrows: false,
    slidesToScroll: 1,
    slidesToShow: 3,
    responsive: [
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
    <div className=" flex min-h-screen flex-col items-center gap-[10%] px-[12%] py-[10%] text-center text-white" style={{ backgroundImage: `url(${boutique.src})`, backgroundSize: 'cover', backgroundPosition: 'top center' }}>
      <h2 className="pb-14 font-Julius_Sans_One text-3xl font-thin uppercase md:text-4xl lg:text-5xl xl:text-[56px]">boutiques</h2>
      <p className="space-y-4 font-Raleway text-2xl font-normal capitalize leading-[50px] tracking-widest lg:text-3xl xl:text-4xl">
        <span className="font-medium">horarios</span> <br />
        lunes a viernes 9am — 7pm <br />
        Sábado 8am — 6pm
      </p>
      <p className="pt-8 font-Raleway text-2xl font-normal capitalize tracking-[10px] lg:text-3xl xl:text-4xl">6107-3851 </p>

      <div className="col-span-full w-full max-w-[1440px] pt-[40%]">
        <SlickSlider {...settings}>
          <div className="px-2">
            <div className="relative h-[320px] border-2 border-white md:h-[400px] xl:h-[512px]">
              <h3 className="font-Urbanist absolute bottom-[12%] w-full text-center text-2xl font-semibold tracking-wider lg:text-3xl">Momentum</h3>
              <img src={momentum.src} className="size-full object-cover" alt="" />
            </div>
          </div>

          <div className="px-2">
            <div className="relative h-[320px] border-2 border-white md:h-[400px] xl:h-[512px]">
              <h3 className="font-Urbanist absolute bottom-[12%] w-full text-center text-2xl font-semibold tracking-wider lg:text-3xl">Sabana Sur</h3>
              <img src={sabana.src} className="size-full object-cover" alt="" />
            </div>
          </div>

          <div className="px-2">
            <div className="relative h-[320px] border-2 border-white md:h-[400px] xl:h-[512px]">
              <h3 className="font-Urbanist absolute bottom-[12%] w-full text-center text-2xl font-semibold tracking-wider lg:text-3xl">Escazú</h3>
              <img src={escazu.src} className="size-full object-cover" alt="" />
            </div>
          </div>
        </SlickSlider>
      </div>
    </div>
  );
}
