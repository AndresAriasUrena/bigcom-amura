'use client';
import background2 from '@/assets/SliderBG2.png';
import Sliderimg1 from '@/assets/slider21.png';
import Sliderimg2 from '@/assets/slider22.png';
import Sliderimg3 from '@/assets/slider23.png';
import Sliderimg4 from '@/assets/slider24.png';
import background from '@/assets/sliderBG.png';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import Slider1 from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { default as image1, default as image5, default as image9 } from '@/assets/Gift1.png';
import { default as image10, default as image2, default as image6 } from '@/assets/Gift2.png';
import { default as image3, default as image7 } from '@/assets/Gift3.png';
import { default as image4, default as image8 } from '@/assets/Gift4.png';

export async function Slider() {
  const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10];
  const images2 = [
    { src: Sliderimg1, title: 'Pure XS', brand: 'Paco Rabanne', price: '$500' },
    { src: Sliderimg2, title: 'Layton', brand: 'Parfums de Marly', price: '$330' },
    { src: Sliderimg3, title: 'Vetiver Parfum Cologne', brand: 'Roja Dove', price: '$260' },
    { src: Sliderimg4, title: 'Acqua di Giò Parfum', brand: 'Giorgio Armani', price: '$540' },
    { src: Sliderimg4, title: 'Acqua di Giò Parfum', brand: 'Giorgio Armani', price: '$540' },
  ];

  const SampleNextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <FaChevronRight
        className={className}
        style={{
          ...style,
          display: 'block',
          color: 'white',
          zIndex: 2,
          right: '-40px',
          top: '20px',
          height: '60px',
          width: '75px',
        }}
        onClick={onClick}
      />
    );
  };

  const SamplePrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <FaChevronLeft
        className={className}
        style={{
          ...style,
          display: 'block',
          color: 'white',
          zIndex: 2,
          left: '-40px',
          top: '20px',
          height: '60px',
          width: '75px',
        }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      className="relative flex min-h-screen flex-col items-center py-[10%] text-center text-white"
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="px-[12%] py-6 text-3xl font-extralight uppercase">Ideas para Regalar</h1>
      <div className="scrollbar-hide w-full overflow-x-auto px-[5%]">
        <div className="animate-carousel flex gap-6 px-2">
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0">
              <Image src={image} alt="image" className="h-full w-auto" />
            </div>
          ))}
        </div>
      </div>

      <h1 className="mt-12 px-[12%] py-12 text-3xl font-extralight uppercase">La colección de amura</h1>

      <div
        className="mx-auto w-[90%] lg:h-[650px]"
        style={{
          backgroundImage: `url(${background2.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="grid w-full grid-cols-3 text-xl font-light">
          <button className="bg-black/40 py-6">Diseñador</button>
          <button className="border border-white bg-black/40 py-6">Alta Gama</button>
          <button className="bg-black/40 py-6">Árabes</button>
        </div>

        <div className="px-[6%] py-[3%]">
          <Slider1 {...settings}>
            {images2.map((image, index) => (
              <div key={index} className="group relative mt-20 h-[400px] flex-shrink-0 cursor-pointer overflow-hidden">
                <Image src={image.src} alt="image" className="mx-2 h-full w-auto object-cover" />
                <div className="absolute bottom-0 mx-2 flex h-[30%] w-full flex-col justify-center bg-black/50 px-2 text-start font-light duration-500 group-hover:h-full group-hover:bg-black/80 group-hover:text-center">
                  <p className="font-extralight">{image.title}</p>
                  <p>{image.brand}</p>
                  <p>{image.price}</p>
                </div>
              </div>
            ))}
          </Slider1>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none; /* Chrome, Safari, and Opera */
        }
      `}</style>
    </div>
  );
}
