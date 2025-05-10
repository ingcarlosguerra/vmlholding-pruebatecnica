import axios from 'axios';
import { Book } from '@/types/book';
import { User } from '@/types/user';
import { Loan } from '@/types/loan';

const API = {
  books       : '/api/books/available',  
  users       : '/api/users/register',  
  loans       : '/api/loans',            
  activeLoans : '/api/loans/active',    
  returnLoan  : '/api/loans/return',    
};


export const getUsers = async (): Promise<User[]> =>
  (await axios.get(API.users)).data;

export const getAvailableBooks = async (): Promise<Book[]> =>
  (await axios.get(API.books)).data;

export const getActiveLoans = async (userId: string): Promise<Loan[]> =>
  (await axios.get(`${API.activeLoans}?userId=${userId}`)).data;


export const createLoan = async (
  userId: string,
  bookId: string,
  days: number = 7 
): Promise<Loan> => {
  const borrowDate = new Date();
  const dueDate = new Date(borrowDate.getTime() + days * 86_400_000);  

  const body = { userId, bookId, borrowDate, dueDate, loanDuration: days };

  try {

    const loan = await axios.post(API.loans, body);


    await axios.put(`/api/books/${bookId}`, {
      availability: false,
      timesBorrowed: 1     
    });

    return loan.data;
  } catch (error) {
    console.error('Error creando préstamo:', error);
    throw new Error('Error al crear el préstamo');
  }
};


export const returnLoan = async (loanId: string): Promise<Loan> => {
  try {
    const response = await axios.put(`/api/loans/return/${loanId}`, {
      loanId,
      status: 'returned',

    });
    



    return response.data;  
  } catch (error) {
    console.error('Error devolviendo préstamo:', error);
    throw new Error('Error al devolver el préstamo');
  }


};
