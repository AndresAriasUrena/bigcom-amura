import el from '@/assets/element1.png';
import el2 from '@/assets/element2.png';
import Image from 'next/image';
import Link from 'next/link';

export async function Hero() {
  return (
    <div className="relative flex h-[400px] items-center justify-center xs:h-[500px] sm:h-[600px] md:h-[700px]">
      <video className="absolute left-0 top-0 hidden h-full w-full object-cover md:block" src="/herovideo.mp4" autoPlay loop muted />
      <video className="absolute left-0 top-0  h-full w-full object-cover md:hidden" src="/m-herovideo.mp4" autoPlay loop muted />
      <div className="relative w-full">
        <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-6 text-white lg:text-black">
          <Image src={el.src} width={400} height={400} alt="element" className="px-12 lg:px-0" />
          <div className="flex flex-col items-center justify-center gap-3">
            <h2 className="text-center font-Raleway text-3xl font-medium lg:text-5xl">Amura Dreams</h2>
            <h2 className="text-center text-2xl font-light lg:text-5xl ">el hogar de aromas extraordinarios</h2>
            <div className="relative mt-8 flex flex-col items-center justify-center pt-6 md:w-full">
              <Image width={400} height={400} src={el2.src} alt="element" className="w-full" />
              <Link href={'/categories'} className="lg:font-md absolute top-2 bg-[#4E014F] px-3 py-2 font-Julius_Sans_One text-xs font-extralight text-white duration-300 hover:bg-[#4f013e] lg:top-0 lg:px-12 lg:py-4 lg:text-lg">
                IR A LA TIENDA
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
