import banner from 'assets/Assesoria.png';
import logo from 'assets/logo.png';
import Image from 'next/image';

export async function Banner() {
  return (
    <div
      className="grid items-center justify-center gap-[10%] py-4 lg:grid-cols-2 lg:py-0"
      style={{
        backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${banner.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="hidden lg:block"></div>
      <div className="flex flex-col items-center justify-center space-y-4 py-[4%] text-center text-white">
        <Image src={logo} alt="logo" className="h-12 w-auto lg:h-20 " />
        <h2 className="text-3xl lg:text-5xl">Asesoría Amura</h2>
        <p className="text-sm font-extralight lg:text-xl">
          Encontramos el perfume <br />
          perfecto para vos
        </p>
        <button className="bg-[#3E191D] px-6 py-2 text-white transition duration-300 hover:bg-[#2b0f12] lg:px-12 lg:py-4">
          Consultar
        </button>
      </div>
    </div>
  );
}
