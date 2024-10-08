'use client';
import { createUrl } from '@/lib/utils';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

export default function Search() {
  const router = useRouter();
  const params = useParams();

  const searchParams = useSearchParams();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set('q', search.value);
    } else {
      newParams.delete('q');
    }

    router.push(createUrl('/search', newParams));
  }

  return (
    <form onSubmit={onSubmit} className="group relative w-full max-w-[60px] cursor-pointer duration-500 hover:max-w-[550px] ">
      <input key={searchParams?.get('q')} type="text" name="search" placeholder="Search for products..." autoComplete="off" defaultValue={searchParams?.get('q') || ''} className="mt-2 hidden w-full rounded-lg border border-neutral-800 bg-transparent px-4 py-2 text-sm text-white placeholder:text-neutral-400 group-hover:block" />
      <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-8 duration-500 group-hover:size-5 lg:size-12 ${params.product ? 'text-[#494949]' : 'text-white'}`}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>
    </form>
  );
}
