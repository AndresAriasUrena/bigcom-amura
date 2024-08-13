import LogoSquare from '@/assets/logo.png';
import PatternImage from '@/assets/pattern.jpeg';
import Cart from '@/components/cart';
import OpenCart from '@/components/cart/open-cart';
import { getMenu } from '@/lib/bigcommerce';
import { VercelMenu as Menu } from '@/lib/bigcommerce/types';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search from './search';

export default async function Navbar() {
  // Fetch the menu data from BigCommerce
  const res = await getMenu();
  // Filter the menu items to only include the ones with allowed paths
  const AllowedListItems = ['/para-el/', '/para-ella/', '/arabes/', '/dise-ador/', '/alta-gama/'];
  const menu = res.filter((item: Menu) => AllowedListItems.includes(item.path));

  return (
    <nav className="relative bg-black/85 text-white" style={{ backgroundImage: `url(${PatternImage.src})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.8 }}>
      <div className="w-full bg-black py-3 text-center text-xs"></div>
      <div className="relative mx-[5%] flex items-center justify-center pb-[80px] pt-4 lg:py-8">
        <Link href="/" className=" text-white">
          <Image src={LogoSquare} alt="logo" className="w-[85px] lg:w-[120px] 2xl:w-[125px]" />
        </Link>
        {/* mobile menu */}
        <MobileMenu menu={menu} />
        <div className="absolute right-0 flex h-14 w-fit min-w-[100px] text-white  maxlg:top-[85px]">
          <Search />
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
      {/* links */}
      <div className="flex w-full justify-center lg:py-4 maxlg:hidden">
        {menu.length ? (
          <ul className="flex w-full max-w-[800px] justify-between px-16 pb-4 lg:max-w-[1000px]">
            {menu.map((item) => (
              <li key={item.name}>
                <Link href={'/categories' + item.path} className="hover:!text-c2 font-Julius_Sans_One text-base uppercase tracking-wider text-white underline-offset-4 ">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </nav>
  );
}
