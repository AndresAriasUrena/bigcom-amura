import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/bigcommerce';

export const GET = async function () {
  try {
    const products = await getProducts();
    return NextResponse.json({ status: 'success', message: 'Products fetched successfully', products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ status: 'error', message: 'Error while fetching products' });
  }
};
