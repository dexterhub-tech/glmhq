import { NextResponse } from 'next/server';

// This will be set at build time
const BUILD_ID = process.env.NEXT_PUBLIC_BUILD_ID || Date.now().toString();

export async function GET() {
  return NextResponse.json(
    { version: BUILD_ID },
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    }
  );
}

// Ensure this route is always dynamic
export const dynamic = 'force-dynamic';
export const revalidate = 0;
