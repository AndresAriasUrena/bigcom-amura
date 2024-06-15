'use client';
import background from 'assets/sliderBG.png';
import Image from 'next/image';
import { default as image1, default as image5, default as image9 } from '../assets/Gift1.png';
import { default as image10, default as image2, default as image6 } from '../assets/Gift2.png';
import { default as image3, default as image7 } from '../assets/Gift3.png';
import { default as image4, default as image8 } from '../assets/Gift4.png';

export async function Slider() {
  const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10];

  //   const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
  //     e.preventDefault();
  //     setStartIndex((prevIndex) => (prevIndex + 1) % images.length);
  //   };

  //   const handlePrevious = (e: React.MouseEvent<HTMLButtonElement>) => {
  //     e.preventDefault();
  //     setStartIndex((prevIndex) => (prevIndex === 0 ? images.length - 4 : prevIndex - 1));
  //   };

  return (
    <div
      className="relative flex min-h-screen flex-col items-center   py-[10%] text-center text-white"
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <h1 className="px-[12%] py-6 text-3xl font-extralight uppercase">Ideas para Regalar</h1>
      <div className="scrollbar-hide w-full overflow-x-auto px-[5%]">
        <div className="flex animate-carousel  gap-6  px-2">
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0">
              <Image src={image} alt="image" className="h-full w-auto" />
            </div>
          ))}
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
