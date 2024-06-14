import PatternImage from 'assets/pattern.jpeg';
import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
// import LogoSquare from 'components/logo-square';
import LogoSquare from 'assets/logo.png';
import { getMenu } from 'lib/bigcommerce';
import { VercelMenu as Menu } from 'lib/bigcommerce/types';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search from './search';
const { SITE_NAME } = process.env;

export default async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className="relative flex items-center justify-between bg-black/85 text-white">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${PatternImage.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.8
        }}
      ></div>
      <div className="absolute top-0 h-[40px] w-full bg-black"></div>
      <div className="block flex-none md:hidden">
        <MobileMenu menu={menu} />
      </div>
      <div className="z-20 w-full">
        <Link href="/" className="mt-4 flex w-full items-center justify-center py-8 text-white">
          <Image src={LogoSquare} alt="" className="h-14 w-auto" />
        </Link>
        <div className="flex w-full">
          {menu.length ? (
            <ul className="hidden w-full cursor-pointer items-center justify-around px-[20%] pb-4 font-extralight text-white lg:flex">
              {menu.map((item: Menu) => (
                <li key={item.title}>
                  <Link href={item.path} className="text-white underline-offset-4 ">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div
          className="absolute right-14 top-14 flex items-center justify-center
       gap-4 text-white"
        >
          <Search />
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>

        {/* <div className="hidden justify-center md:flex md:w-1/3"></div> */}
      </div>
    </nav>
  );
}
