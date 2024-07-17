import { getCategories, getPage } from '@/lib/bigcommerce';
import BannerImg from '@/assets/category-banner.png';
import Filters from './Filters';
import Image from 'next/image';

export async function generateMetadata({ params, searchParams }: { params: { category: string }; searchParams: URLSearchParams }) {
  const page = await getPage(params.category);
  return {
    title: page.name,
  };
}

export default async function Page({ params }: { params: { category: string } }) {
  const page = await getPage(params.category);
  console.log(page);

  return (
    <>
      <div className="aspect-video h-[240px] w-full sm:h-[320px] md:h-[375px] lg:h-[475px] xl:h-[500px] co2xl:h-[570px] 2xl:h-[640px] 3xl:h-[740px] max:h-[1000px]">
        <Image src={BannerImg.src} width={1920} height={1080} className="size-full object-cover" alt="" />
      </div>
      <div className="bg-white">
        <div className="mx-auto w-[90%] max-w-[1200px] py-16">
          <Filters items={page.products} category={params.category} />
        </div>
      </div>
    </>
  );
}
