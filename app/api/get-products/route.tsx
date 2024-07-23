import { NextResponse } from 'next/server';
import { getPage } from '@/lib/bigcommerce';

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const page = await getPage(body.category);
    return NextResponse.json({ status: 'success', message: 'products fetched successfully', products: page.products });
  } catch (error) {
    // console.log(error);
    return NextResponse.json({ status: 'error', message: 'error while fetching products' });
  }
}
