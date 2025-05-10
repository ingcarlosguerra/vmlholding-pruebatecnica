
import mongoose from 'mongoose';
import Loan from '@/models/Loan';
import Book from '@/models/Book';
import User from '@/models/User';

const MAX_ACTIVE_LOANS = 3;          // límite de préstamos simultáneos
const DAILY_FINE = 5;                // multa diaria por retraso

const checkUserLimit = async (userId: string) => {
  const activeLoans = await Loan.countDocuments({ userId, status: 'active' });
  if (activeLoans >= MAX_ACTIVE_LOANS)
    throw new Error('El usuario alcanzó el límite de préstamos activos');
};

const calculateFine = (due: Date, returned: Date) => {
  const diffMs = returned.getTime() - due.getTime();
  const days = Math.ceil(diffMs / 86_400_000);
  return days > 0 ? days * DAILY_FINE : 0;
};

export const createLoan = async (userId: string, bookId: string, loanDays = 7) => {
  if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(bookId))
    throw new Error('ID de usuario o libro inválido');

  const [user, book] = await Promise.all([
    User.findById(userId),
    Book.findById(bookId)
  ]);

  if (!user) throw new Error('Usuario no existe');
  if (!book) throw new Error('Libro no existe');
  if (!book.availability) throw new Error('Libro no disponible');

  await checkUserLimit(userId);

  const borrowDate = new Date();
  const dueDate = new Date(borrowDate);
  dueDate.setDate(dueDate.getDate() + loanDays);

  const loan = await new Loan({
    userId,
    bookId,
    borrowDate,
    dueDate,
    status: 'active'
  }).save();

  await Book.findByIdAndUpdate(bookId, { availability: false });

  return loan;
};

export const returnLoan = async (loanId: string) => {
  if (!mongoose.Types.ObjectId.isValid(loanId))
    throw new Error('ID de préstamo inválido');

  const loan = await Loan.findById(loanId);
  if (!loan) throw new Error('Préstamo no encontrado');
  if (loan.status === 'returned') throw new Error('El libro ya fue devuelto');

  const returnDate = new Date();
  const fine = calculateFine(loan.dueDate, returnDate);

  loan.returnDate = returnDate;
  loan.status = 'returned';
  loan.fine = fine;
  await loan.save();

  await Book.findByIdAndUpdate(loan.bookId, { availability: true });

  return loan;
};

export const getActiveLoansByUser = (userId: string) =>
  Loan.find({ userId, status: 'active' }).populate('bookId');
