import Image from 'next/image';
import { CiFacebook, CiInstagram } from 'react-icons/ci';
import { FaWhatsapp } from 'react-icons/fa';

import logo from '../../assets/completeLogo.png';

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <>
      <footer className="text-md hidden flex-col  bg-black/90 px-[7%] text-white md:flex dark:text-neutral-400">
        <div className="flex py-[8%]">
          <div className="grid w-[60%] grid-cols-3 gap-3">
            <ul className="space-y-3 font-extralight">
              <li className="pb-10">AROMAS</li>

              <li>AMBAR</li>
              <li>FRESCO</li>
              <li>AHUMADO</li>
              <li>FLORAL</li>
              <li>GOURMET</li>
              <li>ORIENTAL</li>
            </ul>
            <ul className="space-y-3 font-extralight">
              <li className="pb-10">COLECCIONES</li>

              <li>ÁRABES</li>
              <li>ALTA</li>
              <li>GAMA</li>
              <li>DISEÑADOR</li>
            </ul>
            <ul className="space-y-3 font-extralight">
              <li className="pb-10">SERVICIOS</li>

              <li>ENTREGAS</li>
              <li>DEVOLUCIONES Y</li>
              <li>CAMBIOS</li>
              <li>POLÍTICA DE PRIVACIDAD</li>
            </ul>
          </div>

          <div className="flex h-full w-2/4 items-center justify-center">
            <Image src={logo} alt="logo" className="h-[200px] w-auto" />
          </div>

          <div className="w-1/4 space-y-7  text-end font-extralight uppercase">
            <div className="flex justify-end gap-3">
              <CiFacebook size={35} />
              <CiInstagram size={35} />
              <FaWhatsapp size={35} />
            </div>
            <p> oficentro ejecutivola sabana</p>
            <p className="leading-7">
              {' '}
              horarios: <br />
              lunes a viernes 9am — 7pm <br />
              Sábado 8am — 6pm{' '}
            </p>
            <p> 6107-3851</p>
          </div>
        </div>
        <p className="pb-3 text-center text-neutral-400">
          &copy; {copyrightDate} {copyrightName}
          {copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All rights reserved.
        </p>
      </footer>
      <footer className="lg:text-md flex flex-col bg-black/90 px-[7%] py-[8%] text-sm  text-white md:flex lg:hidden lg:flex-row dark:text-neutral-400">
        <div className="flex  w-full flex-col items-center justify-center ">
          <Image src={logo} alt="logo" className="h-[200px] w-auto" />
        </div>
        <div className="flex w-full flex-col  items-center space-y-7 text-center font-extralight uppercase lg:w-1/4">
          <div className="flex justify-end gap-3">
            <CiFacebook size={35} />
            <CiInstagram size={35} />
            <FaWhatsapp size={35} />
          </div>
          <p> oficentro ejecutivola sabana</p>
          <p className="leading-7">
            {' '}
            horarios: <br />
            lunes a viernes 9am — 7pm <br />
            Sábado 8am — 6pm{' '}
          </p>
          <p> 6107-3851</p>
        </div>
        <div className="grid w-full grid-cols-3 gap-3 py-10">
          <ul className="space-y-3 font-extralight">
            <li className="pb-10">AROMAS</li>

            <li>AMBAR</li>
            <li>FRESCO</li>
            <li>AHUMADO</li>
            <li>FLORAL</li>
            <li>GOURMET</li>
            <li>ORIENTAL</li>
          </ul>
          <ul className="space-y-3  font-extralight">
            <li className="pb-10">COLECCIONES</li>

            <li>ÁRABES</li>
            <li>ALTA</li>
            <li>GAMA</li>
            <li>DISEÑADOR</li>
          </ul>
          <ul className="space-y-3 font-extralight">
            <li className="pb-10">SERVICIOS</li>

            <li>ENTREGAS</li>
            <li>DEVOLUCIONES Y</li>
            <li>CAMBIOS</li>
            <li>POLÍTICA DE PRIVACIDAD</li>
          </ul>
        </div>
      </footer>
    </>
  );
}
