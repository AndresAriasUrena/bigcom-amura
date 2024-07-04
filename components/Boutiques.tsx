import Curridabat from '@/assets/Curridabat.png';
import escazu from '@/assets/Escazu.png';
import sabana from '@/assets/Sabana.png';
import boutique from '@/assets/boutiques.webp';
import momentum from '@/assets/mementum.png';

export async function Boutique() {
  return (
    <div className=" flex min-h-screen flex-col items-center gap-[10%] px-[12%] py-[10%] text-center text-white" style={{ backgroundImage: `url(${boutique.src})`, backgroundSize: 'cover', backgroundPosition: 'top center' }}>
      <h2 className="pb-14 text-3xl font-extralight uppercase">boutiques</h2>
      <p className="space-y-4 text-2xl font-extralight capitalize leading-10">
        horarios <br />
        lunes a viernes 9am — 7pm <br />
        Sábado 8am — 6pm
      </p>
      <p className="pt-8 text-xl font-extralight lg:text-2xl">6107-3851 </p>

      <div className="hidden w-full grid-cols-3 gap-4 pt-[40%] lg:grid">
        <div className="relative min-h-[400px] border-2 border-white " style={{ backgroundImage: `url(${sabana.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <h3 className="absolute bottom-[12%] w-full text-center text-2xl">Sabana Sur</h3>
        </div>
        <div className="relative min-h-[400px] border-2 border-white " style={{ backgroundImage: `url(${momentum.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <h3 className="absolute bottom-[12%] w-full text-center text-2xl">Momentum</h3>
        </div>
        <div className="relative min-h-[400px] border-2 border-white " style={{ backgroundImage: `url(${escazu.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <h3 className="absolute bottom-[12%] w-full text-center text-2xl">Escazú</h3>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-4 pt-[40%] lg:hidden">
        <div className="relative min-h-[400px] border-2 border-white " style={{ backgroundImage: `url(${Curridabat.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <h3 className="absolute bottom-[12%] w-full text-center text-2xl">Curridabat</h3>
        </div>
      </div>
    </div>
  );
}
