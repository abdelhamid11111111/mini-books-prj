import { NextResponse } from "next/server";
import { query } from "@/lib/db";


interface Task{
    id: number,
    title: string,
    author: string,
    date: string,
    imagelink: string,
    genre: 'Fantasy' | 'Horror' | 'Adventure' | 'Thriller' | 'Biography',
    summary: string
} 

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    await query('DELETE FROM book WHERE id = ?', [id]);
    return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 });  // <-- 200 OK with JSON body
  }

  export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        // Await params as required by Next.js
        const { id } = await params
        
        // Debug: Log the received ID
        console.log('GET request - Received ID:', id, 'Type:', typeof id)
        
        // Validate ID exists and is not 'undefined' string
        if (!id || id === 'undefined' || id === undefined) {
            console.log('GET validation failed - ID is invalid:', id)
            return NextResponse.json(
                { error: 'Invalid or missing book ID' }, 
                { status: 400 }
            )
        }
        
        // Query for the specific book by ID, not all books
        const data = await query<Task[]>(
            'SELECT id, title, author, DATE_FORMAT(date, \'%Y-%m-%d\') as date, imagelink, genre, summary FROM book WHERE id = ?', 
            [id]
        )
        
        if (data.length === 0) {
            return NextResponse.json(
                { error: 'Book not found' },
                { status: 404 }
            );
        }
        
        const book = data[0];
        
        // The date should already be formatted by DATE_FORMAT, but add safety check
        if (book.date && typeof book.date !== 'string') {
            const dateObj = new Date(book.date);
            book.date = dateObj.toISOString().split('T')[0];
        }
        
        console.log('Returning book:', book)
        return NextResponse.json(book)
        
    } catch (error) {
        console.error('GET request failed:', error)
        return NextResponse.json(
            { error: 'Failed to fetch book' },
            { status: 500 }
        );
    }
}


export async function PUT(req: Request, {params}: {params: Promise<{id: string}>}){
  try{
      // CRITICAL: Await params first
      const { id } = await params
      
      // Debug: Log the received ID
      console.log('Received ID:', id, 'Type:', typeof id)
      
      // Validate ID exists and is not 'undefined' string
      if (!id || id === 'undefined' || id === undefined) {
          console.log('Validation failed - ID is invalid:', id)
          return NextResponse.json(
              { error: 'Invalid or missing book ID' }, 
              { status: 400 }
          )
      }
      
      const { title, author, date, imagelink, genre, summary } = await req.json()
      
      // Use the awaited 'id' variable, NOT params.id
      console.log('Using ID for query:', id)
      
      await query(
          'UPDATE book SET title = ?, author = ?, date = ?, imagelink = ?, genre = ?, summary = ? WHERE id = ?', 
          [title, author, date, imagelink, genre, summary, id]
      )
      
      // Use the awaited 'id' variable, NOT params.id
      return NextResponse.json({
          id: id, 
          title, 
          author, 
          date, 
          imagelink, 
          genre, 
          summary 
      })
  } catch(error){
      console.error('Query failed:', error)
      return NextResponse.json(
          { error: 'Failed to update book' }, 
          { status: 500 }
      )
  }
}