'use client';

import clsx from 'clsx';
import { createUrl } from 'lib/utils';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type {
  ListItem,
  PathFilterItem as PathFilterItemType,
  SortFilterItem as SortFilterItemType
} from '.';

function PathFilterItem({
  item,
  isSelected,
  onSelect
}: {
  item: PathFilterItemType;
  isSelected: boolean;
  onSelect: (path: string) => void;
}) {
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
    <li
      className="mt-2 flex items-center text-black dark:text-white"
      key={item.title}
      onClick={handleCheckboxChange}
    >
      <input
        type="checkbox"
        className="mr-2 h-[30px] w-[30px] border-2 border-black bg-transparent"
        checked={active}
      />
      <Link
        href={createUrl(item.path, newParams)}
        className={clsx(
          'w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100',
          {
            'underline underline-offset-4': active
          }
        )}
      >
        {item.title}
      </Link>
    </li>
  );
}

function SortFilterItem({
  item,
  isSelected,
  onSelect
}: {
  item: SortFilterItemType;
  isSelected: boolean;
  onSelect: (slug: string) => void;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const active = searchParams.get('sort') === item.slug || isSelected;
  const q = searchParams.get('q');
  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { q }),
      ...(item.slug && item.slug.length && { sort: item.slug })
    })
  );

  const handleCheckboxChange = () => {
    if (!active) {
      onSelect(item.slug);
      router.push(href);
    }
  };

  return (
    <li className="flex items-center text-sm text-black dark:text-white" key={item.title}>
      <input type="checkbox" className="mr-2" checked={active} onChange={handleCheckboxChange} />
      <Link
        href={href}
        className={clsx('my-auto h-full w-full hover:underline hover:underline-offset-4', {
          'underline underline-offset-4': active
        })}
      >
        {item.title}
      </Link>
    </li>
  );
}

export function FilterItem({
  item,
  isSelected,
  onSelect
}: {
  item: ListItem;
  isSelected: boolean;
  onSelect: (pathOrSlug: string) => void;
}) {
  return 'path' in item ? (
    <PathFilterItem item={item} isSelected={isSelected} onSelect={onSelect} />
  ) : (
    <SortFilterItem item={item} isSelected={isSelected} onSelect={onSelect} />
  );
}
