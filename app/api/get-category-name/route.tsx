import { NextResponse } from 'next/server';
import { getCategoryName } from '@/lib/bigcommerce';

export const GET = async function () {
  try {
    const categoryName = await getCategoryName();
    return NextResponse.json({ status: 'success', message: 'categoryName fetched successfully', categoryName });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ status: 'error', message: 'Error while fetching categoryName' });
  }
};
