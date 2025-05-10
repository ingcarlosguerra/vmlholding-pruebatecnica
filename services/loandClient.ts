import axios from 'axios';
import { Book } from '@/types/book';
import { User } from '@/types/user';
import { Loan } from '@/types/loan';

const API = {
  books       : '/api/books/available', // GET  -> libros disponibles
  users       : '/api/users/register',            // GET  -> usuarios registrados
  loans       : '/api/loans',            // POST -> crear préstamo
  activeLoans : '/api/loans/active',     // GET  -> ?userId=
  returnLoan  : '/api/loans/return',     // PUT  -> { loanId }
};

// Obtener todos los usuarios
export const getUsers = async (): Promise<User[]> =>
  (await axios.get(API.users)).data;

// Obtener todos los libros disponibles (con availability: true)
export const getAvailableBooks = async (): Promise<Book[]> =>
  (await axios.get(API.books)).data;

// Obtener los préstamos activos de un usuario
export const getActiveLoans = async (userId: string): Promise<Loan[]> =>
  (await axios.get(`${API.activeLoans}?userId=${userId}`)).data;

// Crear un nuevo préstamo
export const createLoan = async (
  userId: string,
  bookId: string,
  days: number = 7               // por defecto 7 días
): Promise<Loan> => {
  const borrowDate = new Date();
  const dueDate = new Date(borrowDate.getTime() + days * 86_400_000); // calcular fecha de vencimiento

  const body = { userId, bookId, borrowDate, dueDate, loanDuration: days };

  try {
    // Crear el préstamo
    const loan = await axios.post(API.loans, body);

    // Actualizar la disponibilidad del libro y aumentar timesBorrowed
    await axios.put(`/api/books/${bookId}`, {
      availability: false,               // cambia availability a false
      timesBorrowed: 1                    // incrementar timesBorrowed en 1
    });

    return loan.data;
  } catch (error) {
    console.error('Error creando préstamo:', error);
    throw new Error('Error al crear el préstamo');
  }
};

// Devolver un libro
export const returnLoan = async (loanId: string): Promise<Loan> =>
  (await axios.put(API.returnLoan, { loanId })).data;
