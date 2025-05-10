import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getAvailableBooks } from "@/services/loandClient"; // Servicio para obtener los libros

const MetricsComponent: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]); // Para almacenar los libros
  const [chartData, setChartData] = useState<any[]>([]); // Para almacenar los datos para el gráfico

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getAvailableBooks(); // Llamada al servicio para obtener los libros
        setBooks(booksData);
        const data = booksData.map((book) => ({
          name: book.name,
          value: book.timesBorrowed || 0, // Usamos `timesBorrowed` como el valor para el gráfico
        }));
        setChartData(data);
      } catch (error) {
        console.error("Error cargando los libros: ", error);
      }
    };

    fetchBooks();
  }, []); // Ejecutar solo al montar el componente

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Métricas de Libros</h1>

      {/* Componente de gráfico */}
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Mostrar listado de libros más prestados */}
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Libros más prestados</h2>
        <ul className="list-disc pl-6">
          {books.map((book, index) => (
            <li key={index} className="mb-2">
              {book.name}: {book.timesBorrowed} veces
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MetricsComponent;
