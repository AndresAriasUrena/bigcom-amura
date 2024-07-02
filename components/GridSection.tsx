import PARAELLA from 'assets/ella.png';
import PARAEL from 'assets/parael.png';
import Link from 'next/link';

export async function GridSection() {
  return (
    <div className="grid min-h-[1000px] lg:min-h-screen lg:grid-cols-2">
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url(${PARAEL.src})`, backgroundSize: 'cover' }}
      >
        <div className="absolute right-[20%] top-[-10%] flex h-full items-center justify-center">
          <Link href="search/para-el">
            <button className="bg-[#3E191D] px-12 py-4 text-white transition duration-300 hover:bg-[#2b0f12]">
              PARA ÉL
            </button>
          </Link>
        </div>
      </div>
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url(${PARAELLA.src})`, backgroundSize: 'cover' }}
      >
        <div className="absolute left-[20%] top-12 flex h-full items-center justify-center">
          <Link href="search/para-ella">
            <button className=" bg-[#4E014F] px-12 py-4 text-white transition duration-300 hover:bg-[#4e014fbb]">
              PARA ELLA
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
