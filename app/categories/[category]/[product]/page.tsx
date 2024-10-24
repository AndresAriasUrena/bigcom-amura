import Link from 'next/link';
import { Suspense } from 'react';
import { GridTileImage } from '@/components/grid/tile';
import { Gallery } from '@/components/product/gallery';
import { getProduct, getProductRecommendations } from '@/lib/bigcommerce';
import { ProductDescription } from '@/components/product/product-description';
import Background from '@/assets/product-page-background.png';
import Marquee from 'react-fast-marquee';
import PatternImage from '@/assets/navbar-pattern-white.png';

export async function generateMetadata({ params }: { params: { product: string; category: string } }) {
  const decodedProductId = decodeURIComponent(params.product);
  const product = await getProduct(decodedProductId);

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function Page({ params }: { params: { product: string; category: string } }) {
  const decodedProductId = decodeURIComponent(params.product);
  const product = await getProduct(decodedProductId);

  // Log the plainTextDescription
  // console.log("plainTextDescription:", product.plainTextDescription);
  // console.log("Description:", product.description);
  // console.log("Product passed to ProductDescription:", product);

  let productJsonLd = {};

  if (product) {
    productJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      description: product.description,
      image: product.featuredImage.url,
      offers: {
        '@type': 'AggregateOffer',
        availability: product.availableForSale ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        priceCurrency: product.priceRange.minVariantPrice.currencyCode,
        highPrice: product.priceRange.maxVariantPrice.amount,
        lowPrice: product.priceRange.minVariantPrice.amount,
      },
    };
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <div className="relative">
        {/* background  */}
        <img src={Background.src} className="absolute z-[-1] size-full object-fill object-left-top" alt="" />
        {/* back to button */}
        <Link href={`/categories/${params.category}`} className="absolute left-4 top-8 sm:left-6 md:left-9">
          <svg xmlns="http://www.w3.org/2000/svg" className="size-8" viewBox="0 0 12 24">
            <path fill="currentColor" fillRule="evenodd" d="m3.343 12l7.071 7.071L9 20.485l-7.778-7.778a1 1 0 0 1 0-1.414L9 3.515l1.414 1.414z" />
          </svg>
        </Link>
        {/* product */}
        <div className="mx-auto grid w-[90%] max-w-[1485px] overflow-hidden rounded-lg py-4 !pt-[90px] md:p-12 lg:grid-cols-2 lg:gap-8">
          <div className="h-full w-full basis-full ">
            <Gallery images={product.images.map((image) => ({ src: image.url, altText: image.altText }))} />
          </div>

          <div className="basis-full ">
            <ProductDescription product={product} productURL={{ decodedProductId, category: params.category }} />
          </div>
        </div>
        <Suspense>
          <RelatedProducts id={product.id} params={params} />
        </Suspense>
      </div>
    </>
  );
}

async function RelatedProducts({ id, params }: { id: string; params: { product: string; category: string } }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div className="py-8">
      <h2 className="py-12 pb-20 text-center text-3xl font-Julius_Sans_One font-extralight uppercase  text-white lg:py-4 lg:pb-9">También te puede interesar</h2>
      <div className="w-full pb-10 pt-1">
        <Marquee autoFill={true}>
          {relatedProducts.map((product) => {
            // console.log(product);

            return (
              <div key={product.handle} className="aspect-square h-72 w-full pr-5">
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
              </div>
            );
          })}
        </Marquee>
      </div>
    </div>
  );
}
