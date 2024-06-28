import { getPage } from '@/lib/bigcommerce';
import Image from 'next/image';

export default async function Page({ params }: { params: { category: string } }) {
  const page = await getPage(params.category);

  console.log('------------------');
  console.log(page.products.edges.length);
  console.log('------------------');

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 ">
      {page.products.edges.map((product, index) => {
        console.log(product.node.images.edges);

        return (
          <div key={product.node.id}>
            <img src={product.node.images.edges[0].node.url} className="h-full w-full" alt={product.node.images.edges[0].node.altText} />
          </div>
        );
      })}
    </div>
  );
}
