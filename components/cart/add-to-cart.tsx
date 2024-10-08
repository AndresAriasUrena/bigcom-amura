'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { addItem } from '@/components/cart/actions';
import LoadingDots from '@/components/loading-dots';
import { VercelProductVariant as ProductVariant } from '@/lib/bigcommerce/types';
import { useSearchParams } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';

function SubmitButton({ availableForSale, selectedVariantId }: { availableForSale: boolean; selectedVariantId: string | undefined }) {
  const { pending } = useFormStatus();
  const buttonClasses = 'border-2 border-white px-4 sm:px-8 xs:uppercase py-3 text-white relative flex justify-center w-full text-nowrap max-w-[250px] ';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return (
      <button aria-disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button aria-label="Please select an option" aria-disabled className={clsx(buttonClasses, disabledClasses)}>
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Agregar al carrito
      </button>
    );
  }

  return (
    <button
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label="Add to cart"
      aria-disabled={pending}
      className={clsx(buttonClasses)}
    >
      <div className="absolute left-0 ml-4">{pending && <LoadingDots className="mb-3 bg-white" />}</div>
      Agregar al carrito
    </button>
  );
}

export function AddToCart({ variants, availableForSale, quantity, productURL }: { variants: ProductVariant[]; availableForSale: boolean; quantity: number; productURL: { decodedProductId: string; category: string } }) {
  const [message, formAction] = useFormState(addItem, null);
  const searchParams = useSearchParams();

  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const defaultProductId = variants.length === 1 ? variants[0]?.parentId : undefined;
  const variant = variants.find((variant: ProductVariant) => variant.selectedOptions.every((option) => option.value === searchParams.get(option.name.toLowerCase())));
  const selectedVariantId = variant?.id || defaultVariantId;
  const selectedProductId = variant?.parentId || defaultProductId;
  const actionWithVariant = formAction.bind(null, { selectedProductId, selectedVariantId, quantity, productURL });

  return (
    <form action={actionWithVariant} className="font-Julius_Sans_One">
      <SubmitButton availableForSale={availableForSale} selectedVariantId={selectedVariantId} />
      <p aria-live="polite" className="sr-only" role="status">
        {message}
      </p>
    </form>
  );
}
