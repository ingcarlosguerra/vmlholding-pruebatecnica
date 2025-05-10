'use client';

import React, { useEffect, useState } from 'react';
import {
  getUsers,
  getAvailableBooks,
  createLoan,
} from '@/services/loandClient';

interface Props {
  onSuccess: () => void;       // refrescar la lista tras crear un préstamo
}

const LoanForm: React.FC<Props> = ({ onSuccess }) => {
  const [users,  setUsers]  = useState<any[]>([]);
  const [books,  setBooks]  = useState<any[]>([]);

  const [userId, setUserId] = useState('');
  const [bookId, setBookId] = useState('');
  const [days,   setDays]   = useState(7);
  const [err,    setErr]    = useState('');

  useEffect(() => {
    (async () => {
      setUsers(await getUsers());
      setBooks(await getAvailableBooks());
    })();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await createLoan(userId, bookId, days);
      setBookId('');
      setDays(7);
      onSuccess();
    } catch (e: any) {
      setErr(e.response?.data?.message || 'Error al crear el préstamo');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow mb-6">
      <h3 className="text-lg font-semibold mb-3">Registrar préstamo</h3>

      {err && <p className="mb-2 text-red-600">{err}</p>}

      <select
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        required
        className="w-full mb-2 p-2 border rounded"
      >
        <option value="">Selecciona usuario</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.name} – {u.email}
          </option>
        ))}
      </select>

      <select
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        required
        className="w-full mb-2 p-2 border rounded"
      >
        <option value="">Selecciona libro</option>
        {books.map((b) => (
          <option key={b._id} value={b._id}>
            {b.name} – {b.authors.join(', ')}
          </option>
        ))}
      </select>

      <input
        type="number"
        min={1}
        value={days}
        onChange={(e) => setDays(+e.target.value)}
        className="w-full mb-4 p-2 border rounded"
        placeholder="Días de préstamo"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Guardar
      </button>
    </form>
  );
};

export default LoanForm;
