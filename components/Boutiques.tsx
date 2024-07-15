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
      <h2 className="pb-14 font-Julius_Sans_One text-3xl font-extralight uppercase">boutiques</h2>
      <p className=" space-y-4 text-2xl font-extralight capitalize leading-10">
        horarios <br />
        lunes a viernes 9am — 7pm <br />
        Sábado 8am — 6pm
      </p>
      <p className="pt-8 font-Raleway text-xl font-extralight lg:text-2xl">6107-3851 </p>

      <div className="col-span-full w-full max-w-[1440px] pt-[40%]">
        <SlickSlider {...settings}>
          <div className="px-2">
            <div className="relative h-[320px] border-2 border-white md:h-[400px] xl:h-[512px]">
              <h3 className="absolute bottom-[12%] w-full text-center text-2xl">Momentum</h3>
              <img src={momentum.src} className="size-full object-cover" alt="" />
            </div>
          </div>

          <div className="px-2">
            <div className="relative h-[320px] border-2 border-white md:h-[400px] xl:h-[512px]">
              <h3 className="absolute bottom-[12%] w-full text-center text-2xl">Sabana Sur</h3>
              <img src={sabana.src} className="size-full object-cover" alt="" />
            </div>
          </div>

          <div className="px-2">
            <div className="relative h-[320px] border-2 border-white md:h-[400px] xl:h-[512px]">
              <h3 className="absolute bottom-[12%] w-full text-center text-2xl">Escazú</h3>
              <img src={escazu.src} className="size-full object-cover" alt="" />
            </div>
          </div>
        </SlickSlider>
      </div>
    </div>
  );
}
