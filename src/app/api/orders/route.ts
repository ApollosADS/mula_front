import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Fetch orders from database
  return NextResponse.json([]);
}

export async function POST(request: Request) {
  // TODO: Create order in database
  const body = await request.json();
  return NextResponse.json({ message: 'Order created', data: body }, { status: 201 });
}

