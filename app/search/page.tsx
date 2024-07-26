import React from 'react';
import { getProducts } from '@/lib/bigcommerce';
import Link from 'next/link';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.',
};
export default async function page({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const { q: searchValue } = searchParams as { [key: string]: string };
  // -----------------------------
  const productsRes = await getProducts();
  // -----------------------------
  let products: any[] = [];
  // -----------------------------

  const filteredArray = productsRes.filter((str) => {
    const name = str.name.toLowerCase();
    const brand = str.brand?.name.toLowerCase();
    const searchstr = searchValue.toLowerCase();

    // console.log(str.name);
    // console.log(name);

    return searchValue && (name.includes(searchstr) || brand?.includes(searchstr));

    // Return the condition if searchValue exists, otherwise include all items
    // return searchValue ? name.includes(searchValue) || brand?.includes(searchValue) : true;
  });
  products = filteredArray;
  // -----------------------------
  const resultsText = products.length > 1 ? 'results' : 'result';
  const displayProducts = products.length > 0 ? products : productsRes;

  return (
    <div className="bg-white">
      <div className="mx-auto w-[90%] max-w-[1200px] gap-4 py-8 text-black ">
        {searchValue ? (
          <p className="mb-4">
            {products.length === 0 ? 'There are no products that match ' : `Showing ${products.length} ${resultsText} for `}
            <span className="font-bold">&quot;{searchValue}&quot;</span>
          </p>
        ) : (
          <>
            <h3 className="mb-8 text-center text-2xl font-semibold">Please type something to search</h3>
          </>
        )}

        {products.length === 0 && <h3 className="mt-6 text-base font-semibold ">Our Products</h3>}

        <div className="mt-4 grid gap-4  md:grid-cols-2 lg:grid-cols-3">
          {displayProducts.map((product, index) => {
            const category = product.categories.edges[0].node.path;
            // console.log(category);
            // console.log(product.categories.edges[0].node.path);

            return (
              <div key={index} className="group overflow-hidden rounded-md border">
                <Link href={`/categories` + category + product.id} className="relative block h-full w-full">
                  {product.images.edges.length > 0 ? <img src={product.images.edges[0].node.url} className="size-full rounded-md object-cover" alt={product.images.edges[0].node.altText} /> : <div className="flex h-full min-h-[400px] items-center justify-center rounded-md border border-white/15 bg-black/75">{product.name}</div>}
                  <div className="absolute inset-0 z-[1] duration-200 hover:bg-black/35"></div>
                  <div className="absolute bottom-0 left-0 right-0 z-[2] bg-black/30 p-4 text-white duration-200 group-hover:bg-black/35">
                    <h4>{product.name}</h4>
                    <b>{product.brand?.name}</b>
                    <p>
                      {product.prices.price.value} {product.prices.price.currencyCode}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
