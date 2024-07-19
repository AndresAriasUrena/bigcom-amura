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
              <Link href={`/categories${category.path}`} className="group relative block h-full w-full overflow-hidden rounded-md">
                {category.image ? <img src={category.image.urlOriginal} className="size-full rounded-md object-cover duration-300 hover:scale-105" alt={category.image.urlOriginal} /> : ''}
                <div className={'flex items-center justify-center rounded-md border border-white/15 bg-black/50 text-xl duration-300 ' + (category.image ? 'pointer-events-none absolute bottom-0 left-0 right-0 top-3/4 py-6 group-hover:top-0' : 'h-full min-h-[400px]')}>{category.name}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
