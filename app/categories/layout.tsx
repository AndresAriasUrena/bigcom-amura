import { Suspense } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-8 w-[90%] max-w-[1200px] py-20 sm:mx-auto">
      <Suspense>{children}</Suspense>
    </div>
  );
}
