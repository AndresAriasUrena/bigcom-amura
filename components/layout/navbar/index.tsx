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
  const menu = await getMenu();
  return (
    <nav className="relative bg-black/85 text-white" style={{ backgroundImage: `url(${PatternImage.src})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.8 }}>
      <div className="w-full bg-black py-3 text-center text-xs">Lorem ipsum dolor sit amet consectetur adipiscing elit</div>
      <div className="relative mx-[5%] flex items-center justify-center pb-[80px] pt-4 lg:py-8">
        <Link href="/" className=" text-white">
          <Image src={LogoSquare} alt="logo" className="w-[85px]" />
        </Link>
        {/* mobile menu */}
        <MobileMenu menu={menu} />
        <div className="maxlg:top-[85px] absolute right-0 flex h-14 w-fit min-w-[100px]  text-white">
          <Search />
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
      {/* links */}
      <div className="maxlg:hidden flex w-full justify-center">
        {menu.length ? (
          <ul className="flex w-full max-w-[800px] justify-between px-16 pb-4 font-extralight">
            {menu.map((item: Menu) => (
              <li key={item.name}>
                <Link href={'/categories' + item.path} className="hover:!text-c2 text-white underline-offset-4 ">
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
