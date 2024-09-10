'use client';

import { GridTileImage } from '@/components/grid/tile';
import { createUrl } from '@/lib/utils';
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

  const previousSearchParams = new URLSearchParams(searchParams.toString());
  const previousImageIndex = imageIndex === 0 ? images.length - 1 : imageIndex - 1;
  previousSearchParams.set('image', previousImageIndex.toString());

  return (
    <>
      <div className="flex h-full flex-col-reverse gap-2 md:flex-row">
        <div className="flex max-w-full gap-2 overflow-hidden md:h-full md:flex-col">
          {images.length > 1 ? (
            <div className="grid gap-1 overflow-auto maxmd:grid-cols-5">
              {images.map((image, index) => {
                const isActive = index === imageIndex;
                const imageSearchParams = new URLSearchParams(searchParams.toString());

                imageSearchParams.set('image', index.toString());

                return (
                  <div key={index}>
                    <Link aria-label="Enlarge product image" href={createUrl(pathname, imageSearchParams)} scroll={false}>
                      <GridTileImage alt={image.altText} src={image.src} width={100} height={100} className="md:min-size-[120px] w-full object-cover" active={isActive} />
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        <div className="relative aspect-square w-full overflow-hidden ">{images[imageIndex] && <Image className="h-[20%] w-full bg-white object-cover lg:h-full" fill sizes="(min-width: 1024px) 66vw, 100vw" alt={images[imageIndex]?.altText as string} src={images[imageIndex]?.src as string} priority={true} />}</div>
      </div>
    </>
  );
}
