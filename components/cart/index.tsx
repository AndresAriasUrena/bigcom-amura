import { getCart } from '@/lib/bigcommerce';
import { cookies } from 'next/headers';
import CartModal from './modal';

export default async function Cart() {
  const cartId = cookies().get('cartId')?.value;
  let cart;
  console.log(cartId);

  // const reess = await getCart();
  // console.log(reess);

  // if (cartId) {
  //   cart = await getCart(cartId);
  // }
  return <CartModal cart={cart} />;
}
