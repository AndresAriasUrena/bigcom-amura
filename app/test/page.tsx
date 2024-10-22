import React from 'react';
import { GiftsCarousel } from '@/components/GiftsCarousel';
import { getPage } from '@/lib/bigcommerce';

const page = async () => {
  const gifts = await getPage('ideas-para-regalar');
  return (
    <div className="">
      <div className="mx-auto ">
        <h1 className="py-16 text-center text-3xl font-Julius_Sans_One uppercase lg:text-4xl">Ideas para Regalar</h1>
        <GiftsCarousel gifts={gifts.products.edges} />
      </div>
    </div>
  );
};

export default page;
