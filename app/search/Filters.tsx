import Collections from 'components/layout/search/collections';
import React from 'react';
import './styles.css';

const Filters = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="filters">
      <input type="checkbox" id="toggleFilters" className="toggle-checkbox" />
      <div className="filter-toggle w-full">
        <div className="flex w-full justify-between px-[6%] py-[5%]">
          <label htmlFor="toggleFilters" className="toggle-label">
            Filtros ▼
          </label>
          <p>Ayudame a encontrar mi aroma ⓘ</p>
        </div>
        <div className="">
          <div className="mx-auto flex max-w-screen-2xl  gap-8 px-[6%] pb-4 text-black  dark:text-white">
            <div className="filter-content order-first w-[50%] flex-none lg:w-[33%]">
              <Collections />
            </div>
            <div className="filter-cards order-last min-h-screen  w-full md:order-none ">{children}</div>
            {/* <div className="order-none hidden flex-none md:w-[125px]">
              <FilterList list={sorting} title="Sort by" />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
