import React from 'react';
import { getProducts } from '@/lib/bigcommerce';
import Link from 'next/link';

// Add this function at the top of your file
function levenshteinDistance(str1: string, str2: string): number {
  const track = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null));

  for (let i = 0; i <= str1.length; i++) {
    track[0][i] = i;
  }
  for (let j = 0; j <= str2.length; j++) {
    track[j][0] = j;
  }

  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  return track[str2.length][str1.length];
}

// Add this function to calculate similarity percentage
function calculateSimilarity(str1: string, str2: string): number {
  const maxLength = Math.max(str1.length, str2.length);
  const distance = levenshteinDistance(str1, str2);
  return ((maxLength - distance) / maxLength) * 100;
}

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.',
};

export default async function page({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const { q: searchValue } = searchParams as { [key: string]: string };
  const productsRes = await getProducts();
  let products: any[] = [];

  const SIMILARITY_THRESHOLD = 60; // Adjust this value to make the search more or less strict

  const filteredArray = productsRes.filter((str) => {
    if (!searchValue) return false;

    const name = str.name.toLowerCase();
    const brand = str.brand?.name.toLowerCase() || '';
    const searchstr = searchValue.toLowerCase();

    // Check exact matches first
    if (name.includes(searchstr) || brand.includes(searchstr)) {
      return true;
    }

    // Split the product name into words for partial matching
    const nameWords = name.split(' ');
    const brandWords = brand.split(' ');
    const searchWords = searchstr.split(' ');

    // Check each search word against each word in the product name and brand
    for (const searchWord of searchWords) {
      for (const nameWord of nameWords) {
        if (calculateSimilarity(nameWord, searchWord) >= SIMILARITY_THRESHOLD) {
          return true;
        }
      }
      for (const brandWord of brandWords) {
        if (calculateSimilarity(brandWord, searchWord) >= SIMILARITY_THRESHOLD) {
          return true;
        }
      }
    }

    return false;
  });

  // Sort results by similarity (most similar first)
  filteredArray.sort((a, b) => {
    const aNameSimilarity = Math.max(
      ...searchValue
        .toLowerCase()
        .split(' ')
        .map((word) =>
          Math.max(
            ...a.name
              .toLowerCase()
              .split(' ')
              .map((nameWord) => calculateSimilarity(word, nameWord))
          )
        )
    );

    const bNameSimilarity = Math.max(
      ...searchValue
        .toLowerCase()
        .split(' ')
        .map((word) =>
          Math.max(
            ...b.name
              .toLowerCase()
              .split(' ')
              .map((nameWord) => calculateSimilarity(word, nameWord))
          )
        )
    );

    return bNameSimilarity - aNameSimilarity;
  });

  products = filteredArray;

  const resultsText = products.length > 1 ? 'resultados' : 'resultado';
  const displayProducts = products.length > 0 ? products : productsRes;

  return (
    <div className="bg-white">
      <div className="mx-auto w-[90%] max-w-[1200px] gap-4 py-8 text-black">
        {searchValue ? (
          <p className="mb-4">
            {products.length === 0
              ? 'No hay productos que coincidan '
              : `Mostrando ${products.length} ${resultsText} para `}
            <span className="font-bold">&quot;{searchValue}&quot;</span>
          </p>
        ) : (
          <h3 className="mb-8 text-center text-2xl font-semibold">
            Please type something to search
          </h3>
        )}

        {products.length === 0 && <h3 className="mt-6 text-base font-semibold">Our Products</h3>}

        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {displayProducts.map((product, index) => {
            const category = product.categories.edges[0].node.path;

            return (
              <div key={index} className="group overflow-hidden rounded-md border">
                <Link href={`/categories` + category + product.id} className="relative block h-full w-full">
                  {product.images.edges.length > 0 ? (
                    <img
                      src={product.images.edges[0].node.url}
                      className="size-full rounded-md object-cover"
                      alt={product.images.edges[0].node.altText}
                    />
                  ) : (
                    <div className="flex h-full min-h-[400px] items-center justify-center rounded-md border border-white/15 bg-black/75">
                      {product.name}
                    </div>
                  )}
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
