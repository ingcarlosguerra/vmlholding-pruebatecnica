
import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/mongoose';
import Book from '@/models/Book';

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  available: boolean;
}

export async function GET(){
  connectDB()
  const books = await Book.find()
  return NextResponse.json(
      books
  );
}




export async function POST(req: Request) {
  try {
    const data = await req.json(); 

    const newBook = new Book({
      name: data.name,
      authors: data.authors,
      genres: data.genres,
      availability: data.availability,
      timesBorrowed: data.timesBorrowed,
      loanDuration: data.loanDuration,
      lastLoanDate: data.lastLoanDate,
    });
    const savedBook = await newBook.save();
    return NextResponse.json(savedBook); 
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error al guardar el libro", error: error.message },
      { status: 400 }
    );
  }
}
