'use client';

import React from 'react';
import { returnLoan } from '@/services/loandClient';

interface Props {
  loans:   any[];
  refresh: () => void;
}

const LoanList: React.FC<Props> = ({ loans, refresh }) => {
  if (!loans.length)
    return <p className="text-gray-600">Sin préstamos activos.</p>;

  const doReturn = async (id: string) => {
    await returnLoan(id);
    refresh();
  };

  return (
    <ul className="space-y-3">
      {loans.map((l) => {
        const isReturned = l.status === 'returned';
        const isOverdue = l.status === 'overdue';

        return (
          <li
            key={l._id}
            className="p-4 bg-gray-100 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{l.bookId.name}</p>
              <p className="text-sm text-gray-500">
                Usuario: {l.userId.name}
              </p>
              <p className="text-sm text-gray-500">
                Vence: {new Date(l.dueDate).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => doReturn(l._id)}
              disabled={isReturned || isOverdue}
              className={`px-3 py-1 rounded ${isReturned ? 'bg-yellow-500 hover:bg-yellow-600' : isOverdue ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'} text-white`}
            >
              {isReturned ? 'Devuelto' : isOverdue ? 'Vencido' : 'Devolver'}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default LoanList;
