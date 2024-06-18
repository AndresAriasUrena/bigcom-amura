import Collections from 'components/layout/search/collections';
import FilterList from 'components/layout/search/filter';
import { sorting } from 'lib/constants';

const Filters = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="md:text-md flex w-full justify-between px-[6%] py-[5%] text-sm">
        <button>Filtros ▼</button>
        <p>Ayudame a encontrar mi aroma ⓘ</p>
      </div>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8  px-[6%] pb-4 text-black md:flex-row dark:text-white">
        <div className="order-first w-full flex-none  md:max-w-[125px]">
          <Collections />
        </div>
        <div className="order-last min-h-screen w-full md:order-none">{children}</div>
        <div className="order-none hidden flex-none  md:w-[125px]">
          <FilterList list={sorting} title="Sort by" />
        </div>
      </div>
    </div>
  );
};

export default Filters;
