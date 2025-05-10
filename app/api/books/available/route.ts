import { NextResponse } from 'next/server';
import Book from '@/models/Book'; 


export async function GET() {
  try {
  
    const books = await Book.find({ availability: true });

    return NextResponse.json(books);
  } catch (error: any) {
    return NextResponse.json({ message: 'Error al obtener los libros', error: error.message }, { status: 500 });
  }
}
