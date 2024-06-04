import BG from 'assets/Hero.jpg';
import el from 'assets/element1.png';
import el2 from 'assets/element2.png';
import Image from 'next/image';
export async function Hero() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{
        backgroundImage: `url(${BG.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="flex flex-col items-center justify-center gap-6">
        <Image src={el} alt="element" />
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="text-center text-5xl font-semibold">Amura Dreams</h2>
          <h2 className="text-center text-5xl font-light">el hogar de aromas extraordinarios</h2>
          <div className="relative flex flex-col items-center justify-center pt-6">
            <Image src={el2} alt="element" />
            <button
              className="absolute top-0 bg-[#4E014F] px-12 py-4
font-extralight text-white  duration-300 hover:bg-[#4f013e]"
            >
              IR A LA TIENDA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
