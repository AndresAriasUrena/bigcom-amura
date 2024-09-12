'use client';

import React from 'react';
import { VercelMenu as Menu } from '@/lib/bigcommerce/types';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Cambiamos el nombre de 'links' a 'Links'
export default function Links({ menu }: { menu: Menu[] }) {
  const params = useParams();

  return (
    <div className="flex w-full justify-center lg:py-4 maxlg:hidden">
      {menu.length ? (
        <ul className="flex w-full max-w-[800px] justify-between px-16 pb-4 lg:max-w-[1000px]">
          {menu.map((item) => (
            <li key={item.name}>
              <Link 
                href={'/categories' + item.path} 
                className={`font-Julius_Sans_One text-base uppercase underline-offset-4 duration-200 hover:!text-c2 lg:text-lg ${params.product ? 'font-semibold text-black' : 'text-white'}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
