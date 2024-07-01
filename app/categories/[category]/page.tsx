import { getPage } from '@/lib/bigcommerce';
import Link from 'next/link';

export default async function Page({ params }: { params: { category: string } }) {
  const page = await getPage(params.category);

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 ">
      {page.products.edges.map((product, index) => {
        // console.log(product.node.id);

        return (
          <Link key={product.node.id} href={`/categories/${params.category}/${product.node.id}`}>
            <div className="bg-white">
              <img src={product.node.images.edges[0].node.url} className="h-full w-full" alt={product.node.images.edges[0].node.altText} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
