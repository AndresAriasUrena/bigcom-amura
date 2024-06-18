'use client';
import { SortFilterItem } from 'lib/constants';
import { useState } from 'react';
import FilterItemDropdown from './dropdown';
import { FilterItem } from './item';
export type ListItem = SortFilterItem | PathFilterItem;
export type PathFilterItem = { title: string; path: string };

function FilterItemList({ list }: { list: ListItem[] }) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleSelect = (itemPath: string) => {
    setSelectedItem(itemPath);
  };
  return (
    <>
      {list.map((item: ListItem, i) => (
        <FilterItem
          key={i}
          item={item}
          isSelected={selectedItem === ('path' in item ? item.path : item.slug)}
          onSelect={handleSelect}
        />
      ))}
    </>
  );
}

export default function FilterList({ list, title }: { list: ListItem[]; title?: string }) {
  return (
    <>
      <nav>
        {title ? <h3 className="hidden py-4 font-extralight uppercase md:block">{title}</h3> : null}
        <ul className="block ">
          <FilterItemList list={list} />
        </ul>
        <ul className="hidden">
          <FilterItemDropdown list={list} />
        </ul>
      </nav>
    </>
  );
}
