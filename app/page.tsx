import { getPage } from '@/lib/bigcommerce';
import { Banner } from '@/components/Banner';
import { Boutique } from '@/components/Boutiques';
import { GiftsCarousel } from '@/components/GiftsCarousel';
import { CollectionCarousel } from '@/components/CollectionCarousel';
import { GridSection } from '@/components/GridSection';
import { Hero } from '@/components/Hero';
import { CollectionProducts } from '@/lib/bigcommerce/types';
import Head from 'next/head';

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
      <Hero />
      <GridSection />
      <div className="relative w-full px-4 pb-16 md:px-16">
        <img src={background.src} className="absolute inset-0 z-[-1] h-full w-full object-cover object-left-top" alt="" />
        <div className="mx-auto pt-8">
          <h2 className="2xl:6xl py-16 text-center font-Raleway text-3xl font-normal uppercase tracking-wider lg:text-4xl xl:text-5xl 2xl:text-6xl">Ideas para Regalar</h2>
          <GiftsCarousel gifts={gifts.products.edges} />
          <h2 className="2xl:6xl py-16 text-center font-Raleway text-3xl font-normal uppercase tracking-wider lg:py-24 lg:text-4xl xl:text-5xl 2xl:text-6xl">La colección de amura</h2>
          <CollectionCarousel collections={collections} />
        </div>
      </div>
      <Banner />
      <Boutique />
    </>
  );
}
