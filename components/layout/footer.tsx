import Image from 'next/image';
import logo from '../../assets/completeLogo.png';
import facebook from '@/assets/icons/facebook.png';
import instagram from '@/assets/icons/instagram.png';
import whatsapp from '@/assets/icons/whatsapp.png';
import Link from 'next/link';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <>
      <footer className="gap-8">
        <div className="grid bg-black/90 px-[5%] pb-6 md:grid-cols-2 xl:grid-cols-3">
          {/* left */}
          <div className="grid grid-cols-2">
            <ul className="space-y-2 font-Julius_Sans_One text-lg font-extralight xl:text-xl">
              <li className="pb-6">AROMAS</li>

              <li>
                <Link href="/">AMBAR</Link>
              </li>
              <li>
                <Link href="/">FRESCO</Link>
              </li>
              <li>
                <Link href="/">AHUMADO</Link>
              </li>
              <li>
                <Link href="/">FLORAL</Link>
              </li>
              <li>
                <Link href="/">GOURMET</Link>
              </li>
              <li>
                <Link href="/">ORIENTAL</Link>
              </li>
            </ul>
            <ul className="space-y-2 font-Julius_Sans_One text-lg font-extralight xl:text-xl">
              <li className="pb-6">COLECCIONES</li>

              <li>
                <Link href="/">ÁRABES</Link>
              </li>
              <li>
                <Link href="/">ALTA</Link>
              </li>
              <li>
                <Link href="/">GAMA</Link>
              </li>
              <li>
                <Link href="/">DISEÑADOR</Link>
              </li>
            </ul>
          </div>
          {/* center */}
          <div className="flex justify-center xl:items-center">
            <Image src={logo} alt="logo" className="h-[200px] w-auto lg:h-[260px]" />
          </div>
          {/* right */}
          <div className="space-y-7 text-end font-extralight uppercase md:col-span-2 xl:col-span-1">
            <div className="flex justify-center gap-3 xl:justify-end">
              <Link href="/">
                <img src={facebook.src} alt="" />
              </Link>
              <Link href="/">
                <img src={instagram.src} alt="" />
              </Link>
              <Link href="/">
                <img src={whatsapp.src} alt="" />
              </Link>
            </div>
            <div className="space-y-4 text-center text-xl tracking-widest xl:text-right">
              <p>oficentro ejecutivola sabana</p>
              <p className="leading-8">
                horarios: <br />
                lunes a viernes 9am — 7pm <br />
                Sábado 8am — 6pm{' '}
              </p>
              <p className="tracking-[8px]">6107-3851</p>
            </div>
          </div>
        </div>
        <div className="bg-c3 py-3 text-center text-white/25">
          <p>© 2023 Todos Los Derechos Reservados</p>
        </div>
      </footer>
    </>
  );
}
