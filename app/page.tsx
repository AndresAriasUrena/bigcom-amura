import { Banner } from 'components/Banner';
import { GridSection } from 'components/GridSection';
import { Hero } from 'components/Hero';

import { Carousel } from 'components/carousel';
import Footer from 'components/layout/footer';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and BigCommerce.',
  openGraph: {
    type: 'website'
  }
};

export default async function HomePage() {
  return (
    <>
      <Hero />
      <GridSection />
      {/* <ThreeItemGrid /> */}
      <Suspense>
        <Banner />
        <Carousel />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
