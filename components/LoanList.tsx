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
      {loans.map((l) => (
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
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Devolver
          </button>
        </li>
      ))}
    </ul>
  );
};

export default LoanList;
