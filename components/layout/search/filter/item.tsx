'use client';

import clsx from 'clsx';
import { createUrl } from '@/lib/utils';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ListItem, PathFilterItem, SortFilterItem } from '.';
import { Suspense } from 'react';

function PathFilterItemComponent({ item, isSelected, onSelect }: { item: PathFilterItem; isSelected: boolean; onSelect: (path: string) => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const active = pathname === item.path || isSelected;
  const newParams = new URLSearchParams(searchParams.toString());

  newParams.delete('q');

  const handleCheckboxChange = () => {
    if (!active) {
      onSelect(item.path);
      router.push(createUrl(item.path, newParams));
    }
  };

  return (
    <Suspense>
      <li className="mt-2 flex items-center text-black dark:text-white" key={item.title} onClick={handleCheckboxChange}>
        <input
          type="checkbox"
          className="mr-2 h-[30px] w-[30px] border-2 border-black bg-transparent"
          checked={active}
          onChange={() => {}} // This is empty because checkbox state is handled by onClick
        />
        <Link
          href={createUrl(item.path, newParams)}
          className={clsx('w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100', {
            'underline underline-offset-4': active,
          })}
        >
          {item.title}
        </Link>
      </li>
    </Suspense>
  );
}

function SortFilterItemComponent({ item, isSelected, onSelect }: { item: SortFilterItem; isSelected: boolean; onSelect: (slug: string) => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const active = searchParams.get('sort') === item.slug || isSelected;
  const q = searchParams.get('q');
  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { q }),
      ...(item.slug && { sort: item.slug }), // Simplified condition
    })
  );

  const handleCheckboxChange = () => {
    if (!active && item.slug) {
      onSelect(item.slug);
      router.push(href);
    }
  };

  return (
    <li className="flex items-center text-sm text-black dark:text-white" key={item.title}>
      <input
        type="checkbox"
        className="mr-2 h-[30px] w-[30px] border-2 border-black bg-transparent"
        checked={active}
        onChange={() => {}} // This is empty because checkbox state is handled by onClick
      />
      <Link
        href={href}
        className={clsx('my-auto h-full w-full hover:underline hover:underline-offset-4', {
          'underline underline-offset-4': active,
        })}
      >
        {item.title}
      </Link>
    </li>
  );
}

export function FilterItem({ item, isSelected, onSelect }: { item: ListItem; isSelected: boolean; onSelect: (pathOrSlug: string) => void }) {
  return 'path' in item ? <PathFilterItemComponent item={item} isSelected={isSelected} onSelect={onSelect} /> : <SortFilterItemComponent item={item} isSelected={isSelected} onSelect={onSelect} />;
}
