import banner from 'assets/Assesoria.png';
import logo from 'assets/logo.png';
import Image from 'next/image';

export async function Banner() {
  return (
    <div
      className="grid  grid-cols-2 items-center justify-center gap-[10%]"
      style={{
        backgroundImage: `linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${banner.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div></div>
      <div className="flex flex-col items-center justify-center space-y-4 py-[4%] text-center text-white">
        <Image src={logo} alt="logo" className="h-20 w-auto" />
        <h2 className="text-5xl">Asesoría Amura</h2>
        <p className="text-xl font-extralight">
          Encontramos el perfume <br />
          perfecto para vos
        </p>
        <button className="bg-[#3E191D] px-12 py-4 text-white transition duration-300 hover:bg-[#2b0f12]">
          Consultar
        </button>
      </div>
    </div>
  );
}
