import { getCategories, getPage } from '@/lib/bigcommerce';
import Filters from './Filters';

export default async function Page({ params }: { params: { category: string } }) {
  const page = await getPage(params.category);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto w-[90%] max-w-[1200px] py-16">
          <Filters items={page.products} category={params.category} />
        </div>
      </div>
    </>
  );
}
