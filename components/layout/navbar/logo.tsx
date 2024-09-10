'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import LogoSquare from '@/assets/logo.png';
import LogoSquareBlack from '@/assets/logo-black.png';

export default function Logo() {
  const params = useParams();

  return <>{params.product ? <Image src={LogoSquareBlack.src} alt="logo" width={200} height={200} className="w-[85px] lg:w-[120px] 2xl:w-[125px]" /> : <Image src={LogoSquare.src} alt="logo" width={200} height={200} className="w-[85px] lg:w-[120px] 2xl:w-[125px]" />}</>;
}
