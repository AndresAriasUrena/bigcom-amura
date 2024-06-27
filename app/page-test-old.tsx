import { getMenu, getProducts } from '@/lib/bigcommerce';
import Link from 'next/link';
import { BigCommerceProduct } from '@/lib/bigcommerce/types';

type Menu = { name: string; path: string };

export default async function Home() {
  const menu = await getMenu();
  const products = await getProducts();

  return (
    <>
      <div className="maxlg:hidden flex w-full justify-center">
        {menu.length ? (
          <ul className="flex w-full max-w-[800px] justify-between px-16 pb-4 font-extralight">
            {menu.map((item: Menu) => (
              <li key={item.name}>
                <Link href={item.path} className="hover:!text-c2 text-white underline-offset-4 ">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {/* products */}
      {products.length ? (
        <div>
          <ul>
            {products.map((product: BigCommerceProduct, index) => {
              console.log('product => ' + index);

              return <li key={product.id}>{product.name}</li>;
            })}
          </ul>
        </div>
      ) : null}
    </>
  );
}
