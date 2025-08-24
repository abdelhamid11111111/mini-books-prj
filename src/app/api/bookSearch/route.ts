// app/api/bookSearch/route.ts
import { NextResponse } from 'next/server';
import { query } from '@/lib/db'; // adjust path to your actual DB helper

export async function GET(req: Request) {

  // EXTRACT VALUES FROM URL   LIKE -> //localhost:3000/api/bookSearch?query=harry -> query = harry
  const url = new URL(req.url);
  const searchQuery = url.searchParams.get('query');

  if (!searchQuery) {
    return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
  }

  try {
    const data = await query(
      'SELECT id, title, author, DATE_FORMAT(date, \'%Y-%m-%d\') as date, imagelink, genre, summary FROM book WHERE title LIKE ? OR author LIKE ?',
      [`%${searchQuery}%`, `%${searchQuery}%`]
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}
