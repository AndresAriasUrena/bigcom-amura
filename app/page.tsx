import { getPage } from '@/lib/bigcommerce';
import { Banner } from '@/components/Banner';
import { Boutique } from '@/components/Boutiques';
import { GiftsCarousel } from '@/components/GiftsCarousel';
import { CollectionCarousel } from '@/components/CollectionCarousel';
import { GridSection } from '@/components/GridSection';
import { Hero } from '@/components/Hero';
import { CollectionProducts } from '@/lib/bigcommerce/types';

import background from '@/assets/sliderBG.png';

export const metadata = {
  title: 'Bigcom Amura',
  description: 'Bigcom Amura is the best scent shop in the world',
  openGraph: {
    type: 'website',
  },
};

export default async function HomePage() {
  const gifts = await getPage('ideas-para-regalar');
  // collections
  const designer = await getPage('dise-ador');
  const highEnd = await getPage('alta-gama');
  const arabs = await getPage('arabes');
  const collections: CollectionProducts = { designer: designer, highEnd: highEnd, arabs: arabs };

  return (
    <>
      {/* <Hero /> */}
      {/* <GridSection /> */}
      <div className="relative w-full px-4 md:px-16">
        <img src={background.src} className="absolute inset-0 z-[-1] h-full w-full object-cover object-left-top" alt="" />
        <div className="mx-auto max-w-[1400px]">
          <h1 className="py-16 text-center text-3xl font-normal uppercase lg:text-4xl">Ideas para Regalar</h1>
          <GiftsCarousel gifts={gifts.products.edges} />
          <h1 className="py-16 text-center text-3xl font-normal uppercase md:py-20 lg:py-24 lg:text-4xl">La colección de amura</h1>
          <CollectionCarousel collections={collections} />
        </div>
      </div>
      {/* <Banner /> */}
      {/* <Boutique /> */}
    </>
  );
}
