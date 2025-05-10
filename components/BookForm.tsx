'use client'

import React, { useState, useEffect } from "react";
import { Book } from "@/types/book"; // Tipo de libro que importas desde tu archivo de tipos
import { createBook, updateBook } from "@/services/bookService"; // Servicios para crear y actualizar el libro

interface BookFormProps {
  book?: Book | null; // Si existe, es para editar un libro
  onSave: () => void; // Función que se llama cuando se guarda el libro (para refrescar la lista)
}

const BookForm: React.FC<BookFormProps> = ({ book, onSave }) => {
  const [formData, setFormData] = useState<Book>({
    _id: book ? book._id : "",
    name: book ? book.name : "",
    authors: book ? book.authors : [],
    genres: book ? book.genres : [],
    availability: book ? book.availability : true,
    timesBorrowed: book ? book.timesBorrowed : 0,
    loanDuration: book ? book.loanDuration : 7,
    lastLoanDate: book ? book.lastLoanDate : null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejar cambios específicos para autores y géneros para convertirlos en arrays
  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData({
      ...formData,
      [field]: e.target.value.split(',').map(item => item.trim())
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    try {
      if (book) {
        // Si el libro ya existe, actualízalo
        await updateBook(book._id, formData); 
      } else {
        // Si no existe, crea un nuevo libro
        await createBook(formData);
      }
      onSave(); // Llamar a la función para refrescar la lista de libros
    } catch (error) {
      console.error("Error saving book:", error); // Capturar posibles errores
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 rounded-md shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-4">
        {book ? "Edit Book" : "Create Book"}
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700">Book Title</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter book title"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Authors</label>
        <input
          type="text"
          name="authors"
          value={formData.authors.join(", ")}
          onChange={(e) => handleArrayChange(e, 'authors')}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter authors (comma separated)"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Genres</label>
        <input
          type="text"
          name="genres"
          value={formData.genres.join(", ")}
          onChange={(e) => handleArrayChange(e, 'genres')}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter genres (comma separated)"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Loan Duration (days)</label>
        <input
          type="number"
          name="loanDuration"
          value={formData.loanDuration}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter loan duration"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-400 text-black py-2 px-4 rounded-md hover:bg-blue-500"
      >
        {book ? "Update Book" : "Create Book"}
      </button>
    </form>
  );
};

export default BookForm;
