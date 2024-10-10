'use client';

import Link from 'next/link';
import Marquee from 'react-fast-marquee';
import { giftProducts } from '@/lib/bigcommerce/types';

export function GiftsCarousel({ gifts }: { gifts: giftProducts[] }) {
  return (
    <Marquee pauseOnHover={true}>
      {gifts.map((item, index) => (
        <Link href={'categories/ideas-para-regalar/' + item.node.id} key={index}>
          <div className="group relative h-[500px] cursor-pointer overflow-hidden 2xl:h-[600px]">
            <img src={item.node.images.edges[0].node.url} alt="gift image" className="mx-auto h-full w-full max-w-[90%] object-cover sm:max-w-[95%]" />
            <div className="absolute inset-0 top-[calc(100%+400px)] flex items-end justify-center duration-300 group-hover:top-0 group-hover:bg-black/50">
              <div className="h-fit max-w-[400px] px-5 text-center font-Raleway mb-6">
                {/* <h3 className="text-3xl md:text-5xl">B683</h3> */}
                <p className="mt-4 text-2xl font-normal md:mt-8 md:text-4xl lg:mt-12">{item.node.name}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </Marquee>
  );
}
