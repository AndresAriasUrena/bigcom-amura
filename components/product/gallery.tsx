'use client';

import { GridTileImage } from 'components/grid/tile';
import { createUrl } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const imageSearchParam = searchParams.get('image');
  const imageIndex = imageSearchParam ? parseInt(imageSearchParam) : 0;

  const nextSearchParams = new URLSearchParams(searchParams.toString());
  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  nextSearchParams.set('image', nextImageIndex.toString());
  const nextUrl = createUrl(pathname, nextSearchParams);

  const previousSearchParams = new URLSearchParams(searchParams.toString());
  const previousImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1;
  previousSearchParams.set('image', previousImageIndex.toString());
  const previousUrl = createUrl(pathname, previousSearchParams);

  const buttonClassName = 'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center';

  return (
    <>
      <div className="mb-8 flex h-full flex-col gap-2 lg:mb-0 lg:flex-row">
        <div className="flex  max-w-full gap-2 overflow-hidden lg:h-full  lg:flex-col">
          {images.length > 1 ? (
            <ul className="flex h-full w-full items-end justify-between gap-3 overflow-auto lg:h-full  lg:w-[70%]  lg:flex-col">
              {images.map((image, index) => {
                const isActive = index === imageIndex;
                const imageSearchParams = new URLSearchParams(searchParams.toString());

                imageSearchParams.set('image', index.toString());

                return (
                  <li key={image.src} className="h-full w-full">
                    <Link aria-label="Enlarge product image" href={createUrl(pathname, imageSearchParams)} scroll={false} className="h-full w-full overflow-hidden">
                      <GridTileImage alt={image.altText} src={image.src} width={150} height={150} className="h-full object-cover" active={isActive} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
        <div className="relative aspect-square h-[75%] w-full overflow-hidden lg:h-full">
          {images[imageIndex] && <Image className="h-[20%] w-full bg-white object-cover lg:h-full" fill sizes="(min-width: 1024px) 66vw, 100vw" alt={images[imageIndex]?.altText as string} src={images[imageIndex]?.src as string} priority={true} />}

          {/* {images.length > 1 ? (
            <div className="absolute bottom-[5%] flex w-full justify-center">
              <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80">
                <Link
                  aria-label="Previous product image"
                  href={previousUrl}
                  className={buttonClassName}
                  scroll={false}
                >
                  <ArrowLeftIcon className="h-5" />
                </Link>
                <div className="mx-1 h-6 w-px bg-neutral-500"></div>
                <Link
                  aria-label="Next product image"
                  href={nextUrl}
                  className={buttonClassName}
                  scroll={false}
                >
                  <ArrowRightIcon className="h-5" />
                </Link>
              </div>
            </div>
          ) : null} */}
        </div>
      </div>
    </>
  );
}
