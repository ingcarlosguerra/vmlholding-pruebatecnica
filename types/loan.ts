import { User } from './user';
import { Book } from './book'; // si ya tienes el tipo Book

export type LoanStatus = 'active' | 'returned' | 'overdue';

export interface Loan {
  /** MongoDB _id en formato string */
  _id: string;

  /** Referencia al usuario que hizo el préstamo  */
  userId: string | User;

  /** Referencia al libro prestado */
  bookId: string | Book;

  /** Fecha en que se realizó el préstamo (ISO string) */
  borrowDate: string;

  /** Fecha límite de devolución (ISO string) */
  dueDate: string;

  /** Fecha real de devolución, null si aún no se devuelve */
  returnDate: string | null;

  /** Estado actual del préstamo */
  status: LoanStatus;

  /** Multa total calculada en caso de retraso */
  fine: number;
}
