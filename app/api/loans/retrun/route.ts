import { NextResponse } from 'next/server';
import Loan from '@/models/Loan';
import Book from '@/models/Book';

// Función para calcular la multa por días de retraso
const calculateFine = (dueDate: Date, returnDate: Date) => {
  const differenceInTime = returnDate.getTime() - dueDate.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays > 0 ? differenceInDays * 10 : 0;  // 10 es la multa diaria
};

export async function PUT(req: Request) {
  try {
    // Obtener el loanId desde el cuerpo de la solicitud
    const { loanId } = await req.json();

    // Buscar el préstamo en la base de datos
    const loan = await Loan.findById(loanId);
    if (!loan) {
      return NextResponse.json({ message: 'Préstamo no encontrado' }, { status: 404 });
    }

    // Si el préstamo ya fue devuelto, no hacemos nada
    if (loan.status === 'returned') {
      return NextResponse.json({ message: 'El libro ya fue devuelto' }, { status: 400 });
    }

    // Establecer la fecha de retorno
    const returnDate = new Date();

    // Calcular la multa si es que el libro está retrasado
    const fine = calculateFine(loan.dueDate, returnDate);

    // Actualizar el préstamo con la fecha de retorno, multa y estado
    loan.returnDate = returnDate;
    loan.status = fine > 0 ? 'overdue' : 'returned';  // Si hay multa, se marca como "overdue"
    loan.fine = fine;

    // Guardar los cambios en el préstamo
    await loan.save();

    // Actualizar la disponibilidad del libro (lo marcamos como disponible)
    await Book.findByIdAndUpdate(loan.bookId, { availability: true });

    // Retornar la respuesta con el préstamo actualizado
    return NextResponse.json(loan);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
