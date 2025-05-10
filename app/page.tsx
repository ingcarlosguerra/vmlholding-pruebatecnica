// import "./globals.css";

// import BookList from "@/components/BookList";

// const BooksPage: React.FC = () => {
//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">Books CRUD</h1>
//       <BookList />
//     </div>
//   );
// };

// export default BooksPage;

'use client';
import "./globals.css";
import { useState } from 'react';
import BookList from "@/components/BookList";
import LoansPage from "@/app/pages/loans/page"
const BooksComponent = () => {
  return (
      <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Books CRUD</h1>
      <BookList />
    </div>

  )
};


const LoansComponent = () => {
  return 
};


const MetricsComponent = () => {
  return <div className="p-6">Componente de Métricas</div>;
};

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('books'); // Controlar cuál sección se muestra

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-2xl font-bold text-center mb-8">Dashboard</h2>
        <div className="space-y-4">
          <button
            onClick={() => setActiveSection('books')}
            className="w-full p-3 bg-blue-600 rounded hover:bg-blue-700"
          >
            Libros
          </button>
          <button
            onClick={() => setActiveSection('loans')}
            className="w-full p-3 bg-blue-600 rounded hover:bg-blue-700"
          >
            Préstamos
          </button>
          <button
            onClick={() => setActiveSection('metrics')}
            className="w-full p-3 bg-blue-600 rounded hover:bg-blue-700"
          >
            Métricas
          </button>
        </div>
      </div>


      <div className="flex-1 p-6 overflow-y-auto">
        {activeSection === 'books' && <BooksComponent />}
        {activeSection === 'loans' && <LoansPage />}
        {activeSection === 'metrics' && <MetricsComponent />}
      </div>
    </div>
  );
};

export default Dashboard;
