'use client';

import React, { useEffect, useState } from 'react';
import LoanForm from '@/components/LoanForm';
import LoanList from '@/components/LoanList';
import { getActiveLoans } from '@/services/loandClient';

const LoansPage: React.FC = () => {
  const [loans, setLoans] = useState<any[]>([]);

  const loadLoans = async () =>
    setLoans(await (await fetch('/api/loans')).json());

  useEffect(() => {
    loadLoans();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Administrador de Préstamos</h1>

      {/* registrar préstamo */}
      <LoanForm onSuccess={loadLoans} />

      <h2 className="text-xl font-semibold mb-2">Préstamos activos</h2>
      <LoanList loans={loans} refresh={loadLoans} />
    </div>
  );
};

export default LoansPage;
