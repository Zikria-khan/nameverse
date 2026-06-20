import { NextResponse } from 'next/server';

export async function GET(request) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/dstar', '') || '/88/tag.min.js';

  const monetagUrl = `https://quge5.com${path}`;

  try {
    const response = await fetch(monetagUrl, { next: { revalidate: 0 } });

    const headers = new Headers();
    headers.set('Content-Type', 'application/javascript; charset=utf-8');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', '*');
    headers.set('Cache-Control', 'public, max-age=0, must-revalidate');

    return new NextResponse(response.body, {
      status: response.status,
      headers,
    });
  } catch (error) {
    return new NextResponse('// Monetag script unavailable', {
      status: 500,
      headers: { 'Content-Type': 'application/javascript' },
    });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  });
}