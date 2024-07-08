import { getCategories, getPage } from '@/lib/bigcommerce';
import BannerImg from '@/assets/category-banner.png';
import Filters from './Filters';

export default async function Page({ params }: { params: { category: string } }) {
  const page = await getPage(params.category);

  return (
    <>
      <div className="aspect-video h-[240px] w-full sm:h-[320px] md:h-[375px] lg:h-[475px] xl:h-[500px] co2xl:h-[570px] 2xl:h-[640px] 3xl:h-[740px] max:h-[1000px]">
        <img src={BannerImg.src} className="size-full object-cover" alt="" />
      </div>
      <div className="bg-white">
        <div className="mx-auto w-[90%] max-w-[1200px] py-16">
          <Filters items={page.products} category={params.category} />
        </div>
      </div>
    </>
  );
}
