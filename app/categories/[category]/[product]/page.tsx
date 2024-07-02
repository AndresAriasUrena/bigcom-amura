import Link from 'next/link';
import { Suspense } from 'react';
import { GridTileImage } from '@/components/grid/tile';
import { Gallery } from '@/components/product/gallery';
import { getProduct, getProductRecommendations } from '@/lib/bigcommerce';
import { ProductDescription } from '@/components/product/product-description';

export default async function Page({ params }: { params: { product: string; category: string } }) {
  const decodedProductId = decodeURIComponent(params.product);
  const product = await getProduct(decodedProductId);
  console.log(params);

  return (
    <>
      <div
      // style={{
      //   background: 'linear-gradient(to bottom, #232323 0%, #313131 20%, #444444 40%, #707070 60%, #686767 80%, #525050 100%)',
      // }}
      >
        <div className="mx-auto max-w-screen-2xl px-4">
          <div className="grid overflow-hidden  rounded-lg py-4 md:p-12 lg:grid-cols-2 lg:gap-8 dark:border-neutral-800 dark:bg-black">
            <div className="h-full w-full basis-full ">
              <Gallery
                images={product.images.map((image) => ({
                  src: image.url,
                  altText: image.altText,
                }))}
              />
            </div>

            <div className="basis-full ">
              <ProductDescription product={product} />
            </div>
          </div>
          <Suspense>
            <RelatedProducts id={product.id} params={params} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
async function RelatedProducts({ id, params }: { id: string; params: { product: string; category: string } }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div className="py-8">
      <h2 className="py-12 pb-20 text-center text-3xl font-extralight uppercase  text-white lg:py-4 lg:pb-9">También te puede interesar</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pb-10 pt-1">
        {relatedProducts.map((product) => {
          console.log(product);

          return (
            <li key={product.handle} className="min-[475px]:w-1/2 aspect-square w-full flex-none sm:w-1/3 md:w-1/4 lg:w-1/5">
              <Link className="relative h-full w-full" href={`/categories/${params.category}/${product.id}`}>
                <GridTileImage
                  alt={product.title}
                  label={{
                    title: product.title,
                    amount: product.priceRange.maxVariantPrice.amount,
                    currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                  }}
                  src={product.featuredImage?.url}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
