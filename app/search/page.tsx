import React from 'react';
import { searchProducts } from '@/lib/bigcommerce';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.',
};
export default async function page({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const { q: searchValue } = searchParams as { [key: string]: string };

  const products = await searchProducts({ query: searchValue });
  const resultsText = products.length > 1 ? 'results' : 'result';

  return (
    <div className="bg-white">
      <div className="mx-auto grid w-[90%] max-w-[1200px] gap-4 py-8 text-black md:grid-cols-2 lg:grid-cols-3">
        {searchValue ? (
          <p className="mb-4">
            {products.length === 0 ? 'There are no products that match ' : `Showing ${products.length} ${resultsText} for `}
            <span className="font-bold">&quot;{searchValue}&quot;</span>
          </p>
        ) : null}
        <div>
          <h1 className="text-center text-xl font-semibold">Search page</h1>
        </div>
      </div>
    </div>
  );
}
