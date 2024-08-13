'use client';

import CartIon from '@/assets/icons/sale.png';
import CartIonBlack from '@/assets/icons/sale-black.png';
import { useParams } from 'next/navigation';

export default function OpenCart({ className, quantity }: { className?: string; quantity?: number }) {
  const params = useParams();

  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md  border-neutral-700 text-white transition-colors">
      {params.product ? <img src={CartIonBlack.src} className="size-8 h-fit min-w-8 lg:w-14 lg:min-w-14" alt="" /> : <img src={CartIon.src} className="size-8 h-fit min-w-8 lg:w-14 lg:min-w-14" alt="" />}

      {quantity ? <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue-600 text-[11px] font-medium text-white">{quantity}</div> : null}
    </div>
  );
}
