// import Navbar from '@/components/layout/navbar';
import { ensureStartsWith } from '@/lib/utils';
import { ReactNode, Suspense } from 'react';
import Footer from '@/components/layout/footer';
import { Raleway, Julius_Sans_One, Charm, Judson, Urbanist } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';

const { TWITTER_CREATOR, TWITTER_SITE, SITE_NAME } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000';
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined;
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined;

const Navbar = dynamic(() => import('@/components/layout/navbar'), {
  ssr: false,
});

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite,
      },
    }),
};

const Julius_Sans_One_Font = Julius_Sans_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-julius-sans-one',
});

const Raleway_Font = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-Raleway',
});

const Charm_Font = Charm({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-Charm',
});

const Judson_Font = Judson({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-Judson',
});

const Urbanist_Font = Urbanist({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-Urbanist',
});

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={''}>
      <body className={`bg-neutral-900 text-black selection:bg-pink-500 selection:text-white dark:text-white ${Julius_Sans_One_Font.variable} ${Raleway_Font.variable} ${Charm_Font.variable} ${Judson_Font.variable} ${Urbanist_Font.variable}`}>
        <Navbar />
        <Suspense>
          <main>{children}</main>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
