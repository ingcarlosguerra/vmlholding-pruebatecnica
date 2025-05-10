import { User } from './user';
import { Book } from './book'; 

export type LoanStatus = 'active' | 'returned' | 'overdue';

export interface Loan {

  _id: string;
  userId: string | User;
  bookId: string | Book;
  borrowDate: string;
  dueDate: string;
  returnDate: string | null;
  status: LoanStatus;
  fine: number;
}
