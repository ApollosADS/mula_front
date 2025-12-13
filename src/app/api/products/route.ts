import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/constants';

export async function GET() {
  // TODO: Fetch from database
  return NextResponse.json(PRODUCTS);
}

export async function POST(request: Request) {
  // TODO: Create product in database
  const body = await request.json();
  return NextResponse.json({ message: 'Product created', data: body }, { status: 201 });
}

