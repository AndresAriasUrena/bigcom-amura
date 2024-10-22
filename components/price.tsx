import clsx from 'clsx';

const Price = ({
  amount,
  className,
  currencyCode = 'USD',
  currencyCodeClassName,
  showCurrencyCode = false, // Add a prop to control if currencyCode is shown
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
  showCurrencyCode?: boolean; // Optional prop to control the display
} & React.ComponentProps<'p'>) => (
  <p suppressHydrationWarning={true} className={className}>
    {`${new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol',
      minimumFractionDigits: 0,  // Ensure no decimal points
      maximumFractionDigits: 0,  // Ensure no decimal points
    }).format(parseFloat(amount))}`}
    
    {/* Conditionally render the currency code if showCurrencyCode is true */}
    {showCurrencyCode && (
      <span className={clsx('ml-1 inline', currencyCodeClassName)}>
        {`${currencyCode}`}
      </span>
    )}
  </p>
);

export default Price;
