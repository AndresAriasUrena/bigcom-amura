'use client';

import { useState } from 'react';
import banner from '@/assets/Assesoria.png';
import logo from '@/assets/logo.png';
import Image from 'next/image';

export function Banner() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="grid items-center justify-center gap-[10%] py-4 lg:grid-cols-2 lg:py-0" style={{ backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${banner.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="hidden lg:block"></div>
        <div className="flex flex-col items-center justify-center space-y-4 py-[4%] text-center text-white lg:scale-[0.85] xl:scale-100 xl:py-12">
          <Image src={logo} alt="logo" className="h-12 w-auto lg:h-20 " />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl">Asesoría Amura</h2>
          <p className="text-base font-extralight sm:text-lg md:text-xl">
            Encontramos el perfume <br />
            perfecto para vos
          </p>
          <button onClick={() => setOpen(true)} className="bg-[#3E191D] px-10 py-2 text-white transition duration-300 hover:bg-[#2b0f12] lg:px-16 lg:py-3">
            Consultar
          </button>
        </div>
      </div>
      <div style={{ right: open ? '0' : '-100%' }} className="fixed bottom-16 top-16 w-[85vw] bg-white duration-500 lg:w-[60vw] xl:w-[40vw]">
        <button className="absolute left-6 top-6 z-30 cursor-pointer" onClick={() => setOpen(false)}>
          <svg width="20" height="20" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.34992 22.3C1.74992 22.3 1.23992 22.18 0.819922 21.94C0.379922 21.7 0.159922 21.45 0.159922 21.19C0.159922 20.95 0.329922 20.6 0.669922 20.14C1.00992 19.66 1.36992 19.25 1.74992 18.91C2.14992 18.55 2.40992 18.41 2.52992 18.49C2.72992 18.67 2.90992 18.81 3.06992 18.91C3.22992 18.99 3.43992 19.03 3.69992 19.03C4.39992 19.03 5.19992 18.51 6.09992 17.47C7.01992 16.41 8.00992 14.72 9.06992 12.4L9.30992 11.95L7.92992 6.49C7.70992 5.57 7.51992 4.94 7.35992 4.6C7.19992 4.24 6.95992 4.06 6.63992 4.06C6.23992 4.06 5.89992 4.28 5.61992 4.72C5.33992 5.16 5.05992 5.76 4.77992 6.52C4.63992 6.9 4.45992 7.09 4.23992 7.09C4.15992 7.09 4.09992 7.05 4.05992 6.97C4.01992 6.89 3.99992 6.74 3.99992 6.52C3.99992 5.76 4.17992 4.94 4.53992 4.06C4.89992 3.16 5.38992 2.41 6.00992 1.81C6.62992 1.19 7.30992 0.879998 8.04992 0.879998C9.22992 0.879998 10.0199 1.7 10.4199 3.34L11.7099 8.41L12.4299 7.09C13.5899 4.93 14.6899 3.36 15.7299 2.38C16.7699 1.38 17.8499 0.879998 18.9699 0.879998C19.4299 0.879998 19.8299 0.949999 20.1699 1.09C20.5299 1.23 20.8099 1.39 21.0099 1.57C21.2099 1.75 21.3099 1.9 21.3099 2.02C21.3099 2.18 21.1199 2.5 20.7399 2.98C20.3599 3.44 19.9599 3.86 19.5399 4.24C19.1199 4.6 18.8699 4.74 18.7899 4.66C18.5299 4.48 18.3299 4.36 18.1899 4.3C18.0499 4.22 17.8699 4.18 17.6499 4.18C17.3899 4.18 17.1499 4.24 16.9299 4.36C16.7299 4.48 16.5099 4.68 16.2699 4.96C15.7499 5.56 15.1399 6.43 14.4399 7.57C13.7599 8.69 13.1199 9.84 12.5199 11.02L13.9599 16.42C14.2199 17.4 14.4599 18.09 14.6799 18.49C14.9199 18.89 15.2499 19.09 15.6699 19.09C16.0299 19.09 16.3999 18.91 16.7799 18.55C17.1799 18.17 17.5299 17.63 17.8299 16.93C17.9099 16.73 17.9799 16.59 18.0399 16.51C18.0999 16.43 18.1999 16.39 18.3399 16.39C18.5199 16.39 18.6099 16.56 18.6099 16.9C18.6099 17.64 18.3999 18.44 17.9799 19.3C17.5599 20.14 16.9999 20.85 16.2999 21.43C15.6199 22.01 14.9099 22.3 14.1699 22.3C13.6899 22.3 13.2599 22.14 12.8799 21.82C12.5199 21.5 12.1599 20.92 11.7999 20.08C11.4599 19.24 11.0799 18.04 10.6599 16.48L10.2399 14.92L10.1199 15.13C8.97992 17.43 7.71992 19.2 6.33992 20.44C4.97992 21.68 3.64992 22.3 2.34992 22.3Z" fill="black" />
          </svg>
        </button>
        <div className="relative flex size-full items-center justify-center">
          <div className="max-w-[240px] text-center text-lg">
            <p className="text-xl text-black">Escribemos a nuestro whatsapp y te ayudaremos a encontrar el aroma ideal.</p>
            <div className="mt-8 ">
              <a href="#" className=" border-2 border-black px-12 py-3 font-bold text-black">
                ir a whatsapp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
