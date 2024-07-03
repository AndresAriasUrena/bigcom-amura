import { getCategories } from '@/lib/bigcommerce';
import Link from 'next/link';

export default async function Page() {
  const Categories = await getCategories();

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {Categories.map((category, index) => {
          console.log(category);
          return (
            <div key={index}>
              <Link href={`/categories${category.path}`} className="block h-full w-full">
                {category.image ? <img src={category.image.urlOriginal} className="size-full object-cover" alt={category.image.urlOriginal} /> : <div className="flex min-h-[400px] items-center justify-center rounded-md border border-white/15 bg-black/75">{category.name}</div>}
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
