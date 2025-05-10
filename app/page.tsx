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
import LoansPage from "@/app/pages/loans/page";
import Metrics from '@/components/MetricsComponent';
import RegisterUser from '@/app/pages/register/page'; // Suponiendo que tienes este componente para registrar usuarios

const BooksComponent = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">CRUD Libros</h1>
      <BookList />
    </div>
  );
};

const LoansComponent = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Préstamos</h1>
      <LoansPage />
    </div>
  );
};

const MetricsComponent = () => {
  return <div className="p-6">Componente de Métricas</div>;
};

const RegisterUserComponent = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Registrar Usuario</h1>
      <RegisterUser /> {/* Este es el componente donde manejarías el registro de usuarios */}
    </div>
  );
};

const Dashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState('books'); // Controlar cuál sección se muestra
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Controlar la visibilidad del menú lateral

  return (
    <div className="flex h-screen">
      {/* Barra lateral */}
      <div
        className={`lg:w-64 w-64 bg-gray-800 text-white p-4 space-y-4 transition-all duration-300 ${isSidebarOpen ? "block" : "hidden lg:block"}`}
      >
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
          <button
            onClick={() => setActiveSection('registerUser')}
            className="w-full p-3 bg-green-600 rounded hover:bg-green-700"
          >
            Registrar Usuario
          </button>
        </div>
      </div>

      {/* Botón hamburguesa para dispositivos móviles */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden p-4 text-white bg-gray-800 rounded-md absolute top-4 left-4"
      >
        <span className="text-xl">☰</span>
      </button>

      {/* Contenido principal */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeSection === 'books' && <BooksComponent />}
        {activeSection === 'loans' && <LoansComponent />}
        {activeSection === 'metrics' && <MetricsComponent />}
        {activeSection === 'registerUser' && <RegisterUserComponent />}
      </div>
    </div>
  );
};

export default Dashboard;
