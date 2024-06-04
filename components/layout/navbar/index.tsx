import Cart from 'assets/bag.png';
import LogoSquare from 'assets/logo.png';
import PatternImage from 'assets/pattern.jpeg';
import Search from 'assets/search.png';
import { getMenu } from 'lib/bigcommerce';
import Image from 'next/image';
import Link from 'next/link';
import MobileMenu from './mobile-menu';
const { SITE_NAME } = process.env;

export default async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className="relative flex items-center justify-between bg-black/85 ">
      {/* Background Image */}

      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${PatternImage.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.8
        }}
      ></div>

      {/* Content */}
      <div className="absolute top-0 h-[20px] w-full bg-black">hiiiii</div>
      <div className="relative z-10 flex w-full items-center">
        <div className="block flex-none md:hidden">
          <MobileMenu menu={menu} />
        </div>
        <div className="flex w-full items-center">
          <div className="w-full ">
            <Link href="/" className="flex w-full items-center justify-center py-10">
              <Image src={LogoSquare} alt="" className="h-14 w-auto" />
            </Link>
            <div
              className="absolute right-14 top-14 flex items-center justify-center
       gap-4 text-white"
            >
              <Link href="/">
                <Image src={Search} alt="" className="h-10 w-10 text-white" />
              </Link>
              <Link href="/">
                <Image src={Cart} alt="" className="h-8 w-8 text-white" />
              </Link>
            </div>

            <div>
              <ul className="flex cursor-pointer items-center justify-between px-[20%] font-extralight text-white">
                <li>PARA ELLA</li>
                <li>PARA EL</li>
                <li>REGALAR</li>
                <li>COLECCION AMURA</li>
                <li>BOUTIQUE</li>
              </ul>
            </div>
            {/* {menu.length ? (
              <ul className="hidden gap-6 text-sm md:flex md:items-center">
                {menu.map((item: Menu) => (
                  <li key={item.title}>
                    <Link
                      href={item.path}
                      className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null} */}
          </div>
          {/* <div className="hidden justify-center md:flex md:w-1/3">
            <Search />
          </div> */}
          {/* <div className="flex justify-end md:w-1/3">
            <Suspense fallback={<OpenCart />}>
              <Cart />
            </Suspense>
          </div> */}
        </div>
      </div>
    </nav>
  );
}
