import { getCategories } from '@/lib/bigcommerce';
import Link from 'next/link';

export const metadata = {
  title: 'Categories',
  description: 'Categories in the store.',
  openGraph: {
    type: 'website',
  },
};

export default async function Page() {
  const Categories = await getCategories();

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto grid w-[90%] max-w-[1200px] gap-4 py-8 md:grid-cols-2 lg:grid-cols-3">
          {Categories.map((category, index) => (
            <div key={index}>
              <Link href={`/categories${category.path}`} className="block h-full w-full">
                {category.image ? <img src={category.image.urlOriginal} className="size-full rounded-md object-cover" alt={category.image.urlOriginal} /> : <div className="flex h-full min-h-[400px] items-center justify-center rounded-md border border-white/15 bg-black/75">{category.name}</div>}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
