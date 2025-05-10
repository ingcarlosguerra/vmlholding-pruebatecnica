import { NextResponse } from 'next/server';
import Loan from '@/models/Loan';
import Book from '@/models/Book';

const calculateFine = (dueDate: Date, returnDate: Date) => {
  const differenceInTime = returnDate.getTime() - dueDate.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays > 0 ? differenceInDays * 10 : 0;  
};

export async function PUT(req: Request) {
  try {

    const { loanId } = await req.json();
    const loan = await Loan.findById(loanId);
    if (!loan) {
      return NextResponse.json({ message: 'Préstamo no encontrado' }, { status: 404 });
    }

    if (loan.status === 'returned') {
      return NextResponse.json({ message: 'El libro ya fue devuelto' }, { status: 400 });
    }


    const returnDate = new Date();
    const fine = calculateFine(loan.dueDate, returnDate);
    loan.returnDate = returnDate;
    loan.status = fine > 0 ? 'overdue' : 'returned'; 
    loan.fine = fine;
    await loan.save();
    await Book.findByIdAndUpdate(loan.bookId, { availability: true });
    return NextResponse.json(loan);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
