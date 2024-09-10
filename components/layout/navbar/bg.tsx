'use client';

import PatternImage from '@/assets/pattern.jpeg';
import PatternImageWhite from '@/assets/navbar-pattern-white.png';
import { useParams } from 'next/navigation';

export default function Bg() {
  const params = useParams();

  return <div className="absolute inset-0 z-[-1]">{params.product ? <img src={PatternImageWhite.src} className="size-full object-cover object-center opacity-80" alt="" /> : <img src={PatternImage.src} className="size-full object-cover object-center " alt="" />}</div>;
}
