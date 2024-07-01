import { getProduct } from '@/lib/bigcommerce';
import { Suspense } from 'react';

import { Gallery } from '@/components/product/gallery';
import { ProductDescription } from '@/components/product/product-description';
import { Image } from '@/lib/bigcommerce/types';

export default async function Page({ params }: { params: { product: string } }) {
  const decodedProductId = decodeURIComponent(params.product);
  const product = await getProduct(decodedProductId);
  console.log(product);

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
                images={product.images.edges.map((image) => ({
                  src: image.node.url,
                  altText: image.node.altText,
                }))}
              />
            </div>

            <div className="basis-full ">
              <ProductDescription product={product} />
            </div>
          </div>
          {/* <Suspense>
            <RelatedProducts id={product.id} />
          </Suspense> */}
        </div>
      </div>
    </>
  );
  //   return <div>product {product.product.name}</div>;
}
