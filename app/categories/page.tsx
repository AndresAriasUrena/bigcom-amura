import { getCategories } from '@/lib/bigcommerce';
import Link from 'next/link';
import Image from 'next/image';
import React, { Suspense } from 'react';

export const metadata = {
  title: 'Categories',
  description: 'Categories in the store.',
  openGraph: {
    type: 'website',
  },
};

async function CategoriesComponent() {
  const categories = await getCategories();

  return (
    <div className="bg-white">
      <div className="mx-auto grid w-[90%] max-w-[1200px] gap-4 py-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <div key={index}>
            <Link href={`/categories${category.path}`} className="block h-full w-full">
              {category.image ? <Image src={category.image.urlOriginal} className="size-full rounded-md object-cover" alt={category.image.urlOriginal} /> : <div className="flex h-full min-h-[400px] items-center justify-center rounded-md border border-white/15 bg-black/75">{category.name}</div>}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading categories...</div>}>
      <CategoriesComponent />
    </Suspense>
  );
}
