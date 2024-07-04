import { getCategories } from '@/lib/bigcommerce';
import Filters from './Filters';

export default async function Page() {
  const Categories = await getCategories();

  return (
    <>
      <div className="bg-white">
        <div className="mx-8 w-[90%] max-w-[1200px] py-16 sm:mx-auto">
          {Categories.length === 0 && <p className="col-span-4 py-3 text-center text-2xl font-semibold text-black">No collections found</p>}
          {Categories.length > 0 && <Filters categories={Categories} />}
        </div>
      </div>
    </>
  );
}
