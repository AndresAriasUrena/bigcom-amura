import CartIon from '@/assets/icons/sale.png';
export default function OpenCart({ className, quantity }: { className?: string; quantity?: number }) {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-md  border-neutral-700 text-white transition-colors">
      {/* <ShoppingCartIcon
        className={clsx('h-4 transition-all ease-in-out hover:scale-110 ', className)}
      /> */}
      <img src={CartIon.src} className="size-8 min-w-8 lg:w-14 lg:min-w-14" alt="" />

      {quantity ? <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue-600 text-[11px] font-medium text-white">{quantity}</div> : null}
    </div>
  );
}
