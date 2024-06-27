'use client';
import { SortFilterItem as SortFilterItemType } from 'lib/constants'; // Renamed import for clarity
import { useState } from 'react';
import FilterItemDropdown from './dropdown';
import { FilterItem } from './item';

// Define type aliases for clarity
export type ListItem = SortFilterItemType | PathFilterItem;
export type PathFilterItem = { title: string; path: string };

// Export SortFilterItem with alias
export type SortFilterItem = SortFilterItemType;

function FilterItemList({ list }: { list: ListItem[] }) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleSelect = (itemPath: string) => {
    setSelectedItem(itemPath);
  };

  return (
    <>
      {list.map((item: ListItem, i) => (
        <FilterItem key={i} item={item} isSelected={selectedItem === ('path' in item ? item.path : item.slug)} onSelect={handleSelect} />
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
