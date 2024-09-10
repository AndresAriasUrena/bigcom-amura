import LogoSquare from '@/assets/logo.png';
import Cart from '@/components/cart';
import OpenCart from '@/components/cart/open-cart';
import { getMenu } from '@/lib/bigcommerce';
import { VercelMenu as Menu } from '@/lib/bigcommerce/types';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search from './search';
import Bg from './bg';
import Links from './links';
import Logo from './logo';

export default async function Navbar() {
  // Fetch the menu data from BigCommerce
  const res = await getMenu();
  // Filter the menu items to only include the ones with allowed paths
  const AllowedListItems = ['/para-el/', '/para-ella/', '/arabes/', '/dise-ador/', '/alta-gama/'];
  const menu = res.filter((item: Menu) => AllowedListItems.includes(item.path));

  return (
    <nav className="relative  text-white">
      <div className="w-full bg-black py-3 text-center text-xs"></div>
      {/* bg */}
      <Bg />

      <div className="relative mx-[5%] flex items-center justify-center pb-[80px] pt-4 lg:py-8">
        <Link href="/" className=" text-white">
          <Logo />
        </Link>
        {/* mobile menu */}
        <MobileMenu menu={menu} />
        <div className="absolute right-0 flex h-14 w-fit min-w-[100px] text-white lg:gap-4  maxlg:top-[85px]">
          <Search />
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
      {/* links */}
      <Links menu={menu} />
    </nav>
  );
}
