'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import PatternImage from '@/assets/pattern.jpeg';
import { VercelMenu as Menu } from '@/lib/bigcommerce/types';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import Search from './search';

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button onClick={openMobileMenu} aria-label="Open mobile menu" className="absolute left-0 h-11 w-11 text-white lg:hidden maxlg:top-[90px]">
        <Bars3Icon />
      </button>

      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50 ">
          <Transition.Child as={Fragment} enter="transition-all ease-in-out duration-300" enterFrom="opacity-0 backdrop-blur-none" enterTo="opacity-100 backdrop-blur-[.5px]" leave="transition-all ease-in-out duration-200" leaveFrom="opacity-100 backdrop-blur-[.5px]" leaveTo="opacity-0 backdrop-blur-none">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child as={Fragment} enter="transition-all ease-in-out duration-300" enterFrom="translate-x-[-100%]" enterTo="translate-x-0" leave="transition-all ease-in-out duration-200" leaveFrom="translate-x-0" leaveTo="translate-x-[-100%]">
            <Dialog.Panel style={{ backgroundImage: `url(${PatternImage.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }} className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-black  pb-6 text-white">
              <div className="relative h-full p-4">
                <button className="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-neutral-700 text-white transition-colors" onClick={closeMobileMenu} aria-label="Close mobile menu">
                  <XMarkIcon className="h-6" />
                </button>

                <div className="my-14  hidden w-full items-center">
                  <Search />
                </div>

                {menu.length ? (
                  <ul className="flex h-[80%] w-full flex-col items-center justify-evenly">
                    {menu.map((item: Menu) => (
                      <li className="py-2 font-Julius_Sans_One text-xl tracking-widest text-white transition-colors hover:text-neutral-500" key={item.name}>
                        <Link href={'/categories' + item.path} onClick={closeMobileMenu}>
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
