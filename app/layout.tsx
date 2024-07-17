// import Navbar from '@/components/layout/navbar';
import { ensureStartsWith } from '@/lib/utils';
import { ReactNode, Suspense } from 'react';
import Footer from '@/components/layout/footer';
import { Raleway, Julius_Sans_One } from 'next/font/google';
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

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={''}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <Navbar />
        <Suspense>
          <main>{children}</main>
        </Suspense>
        <Footer />
      </body>
    </html>
  );
}
