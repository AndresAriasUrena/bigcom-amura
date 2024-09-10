import React from 'react';

export default function FilterChecbox({ active, item, setActiveFilter }: { active: boolean; item: [{ label: string; active: boolean }, index: number]; setActiveFilter: (item: [{ label: string; active: boolean }, index: number]) => void }) {
  return (
    <div className="flex cursor-pointer gap-3" onClick={() => setActiveFilter(item)}>
      <div className={`custom-checkbox group h-8  w-8 cursor-pointer border-4 border-black ${item[0].active && 'active'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="hidden h-6 w-6 text-black group-[.active]:block" viewBox="0 0 24 24">
          <path fill="currentColor" d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83z" />
        </svg>
      </div>
      <span className="text-2xl font-normal text-black">
        {item[0].label} {item[0].active && '✓'}
      </span>
    </div>
  );
}
