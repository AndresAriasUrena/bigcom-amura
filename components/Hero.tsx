import el from 'assets/element1.png';
import el2 from 'assets/element2.png';
import Image from 'next/image';
export async function Hero() {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center"
      // style={{
      //   backgroundImage: `url(${BG.src})`,
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center'
      // }}
    >
      <video className="absolute left-0 top-0 hidden h-full w-full object-cover md:block" src="/herovideo.mp4" autoPlay loop muted />
      <video className="absolute left-0  top-0 h-full w-full object-cover md:hidden" src="/m-herovideo.mp4" autoPlay loop muted />
      <div className="relative w-full">
        <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-6 text-white lg:text-black">
          <Image src={el} alt="element" className="px-12 lg:px-0" />
          <div className="flex flex-col items-center justify-center gap-3">
            <h2 className="text-center text-3xl font-semibold lg:text-5xl">Amura Dreams</h2>
            <h2 className="text-center text-2xl font-light lg:text-5xl">el hogar de aromas extraordinarios</h2>
            <div className="relative flex flex-col items-center justify-center pt-6 md:w-full">
              <Image src={el2} alt="element" className="w-full" />
              <button className="lg:font-md absolute top-2 bg-[#4E014F] px-3 py-2 text-xs font-extralight text-white duration-300 hover:bg-[#4f013e] lg:top-0 lg:px-12 lg:py-4 lg:text-lg">IR A LA TIENDA</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
