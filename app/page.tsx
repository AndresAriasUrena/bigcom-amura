import { Banner } from 'components/Banner';
import { Boutique } from 'components/Boutiques';
import { Slider } from 'components/Carousel1';
import { GridSection } from 'components/GridSection';
import { Hero } from 'components/Hero';
import Footer from 'components/layout/footer';
import { Suspense } from 'react';

export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and BigCommerce.',
  openGraph: {
    type: 'website',
  },
};

export default async function HomePage() {
  return (
    <>
      <Hero />
      <GridSection />
      {/* <ThreeItemGrid /> */}
      <Suspense>
        {/* <Carousel /> old commented code */}
        <Banner />
        <Slider />
        <Boutique />
        <Suspense>
          <Footer />
        </Suspense>
      </Suspense>
    </>
  );
}
