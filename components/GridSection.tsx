import PARAELLA from '@/assets/ella.png';
import PARAEL from '@/assets/parael.png';
import Link from 'next/link';

export async function GridSection() {
  return (
    <div className="grid min-h-[1000px] lg:min-h-screen lg:grid-cols-2">
      <div className="relative bg-cover bg-center" style={{ backgroundImage: `url(${PARAEL.src})`, backgroundSize: 'cover' }}>
        <div className="absolute -top-[25%] right-[10%] flex h-full items-center justify-center md:right-[20%] md:top-[-10%]">
          <Link href="/categories/para-el">
            <button className="bg-[#3E191D] px-12 py-4 text-white transition duration-300 hover:bg-[#2b0f12]">PARA ÉL</button>
          </Link>
        </div>
      </div>
      <div className="relative bg-cover bg-center" style={{ backgroundImage: `url(${PARAELLA.src})`, backgroundSize: 'cover' }}>
        <div className="absolute -top-32 left-[10%] flex h-full items-center justify-center md:left-[20%] md:top-12">
          <Link href="/categories/para-ella">
            <button className=" bg-[#4E014F] px-12 py-4 text-white transition duration-300 hover:bg-[#4e014fbb]">PARA ELLA</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
