import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/mongoose';
import Loans from '@/models/Loan';

export async function GET(){
  connectDB()
  const loans = await Loans.find()
  return NextResponse.json(
      loans
  );
}


export async function POST(req: Request) {
  try {
    const data = await req.json(); 
    const newLoans = new Loans({
      userId: data.userId,
      bookId: data.bookId,
      borrowDate: data.borrowDate,
      dueDate: data.dueDate,
      returnDate: data.returnDate,
      fine: data.fine,
    });
    const savedLoan = await newLoans.save();
    return NextResponse.json(savedLoan); 
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error al guardar el prestamo", error: error.message },
      { status: 400 }
    );
  }
}
