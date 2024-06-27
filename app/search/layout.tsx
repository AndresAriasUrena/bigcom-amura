import backgroung from '@/assets/items.png';
import Footer from '@/components/layout/footer';

import Image from 'next/image';
import Filters from './Filters';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  // let open = false;
  return (
    <>
      <div className="min w-full">
        <Image src={backgroung} alt="bg" />
      </div>

      <Filters children={children} />
      <Footer />
    </>
  );
}
