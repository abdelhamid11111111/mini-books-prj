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

export async function GET(req: Request) {
    try {
        const data = await query<Task[]>('SELECT id, title, author, DATE_FORMAT(date, \'%Y-%m-%d\') as date, imagelink, genre, summary FROM book ORDER BY id DESC', [])
        
        // Format dates for all books
        const booksWithFormattedDates = data.map(book => {
            if (book.date) {
                const dateObj = new Date(book.date);
                book.date = dateObj.toISOString().split('T')[0];
            }
            return book;
        });
        
        return NextResponse.json(booksWithFormattedDates)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch books' },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const { title, author, date, imagelink, genre, summary } = await req.json()

        if (!title || !author || !date || !imagelink || !genre || !summary) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
        }

        // Clean the date to ensure it's in YYYY-MM-DD format only
        let cleanDate = date;
        if (date.includes('T')) {
            cleanDate = date.split('T')[0]; // Remove time part if present
        }

        const bookCreated = await query(
            'INSERT INTO book (title, author, date, imagelink, genre, summary) VALUES (?,?,?,?,?,?)', 
            [title, author, cleanDate, imagelink, genre, summary]
        )

        return NextResponse.json({
            message: 'Book added successfully', 
            id: bookCreated.insertId, 
            title, 
            author, 
            date: cleanDate, // Return the clean date
            imagelink, 
            genre, 
            summary
        })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create book' }, { status: 500 })
    }
}