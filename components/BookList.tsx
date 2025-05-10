'use client'

import React, { useState, useEffect } from "react";
import { Book } from "@/types/book";
import { getBooks, deleteBook } from "@/services/bookService";
import BookForm from "./BookForm";


const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksFromAPI = await getBooks();
        setBooks(booksFromAPI);
        setFilteredBooks(booksFromAPI); // Inicializamos con todos los libros
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);


  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id);
      setBooks(books.filter((book) => book._id !== id)); // Eliminar libro de la lista
      setFilteredBooks(filteredBooks.filter((book) => book._id !== id)); // Eliminar libro de los libros filtrados
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };


  const handleEdit = (book: Book) => {
    setSelectedBook(book); // Cargar el libro para editar
  };

  // Guardar cambios en un libro (después de crear o editar)
  const handleSave = () => {
    setSelectedBook(null); // Cerrar el formulario de edición
    // Volver a cargar los libros
    const fetchBooks = async () => {
      try {
        const booksFromAPI = await getBooks();
        setBooks(booksFromAPI);
        setFilteredBooks(booksFromAPI); // Actualizar los libros filtrados
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  };

  // Buscar libros por nombre
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const filtered = books.filter((book) =>
      book.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredBooks(filtered); // Filtrar libros según el nombre
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Book List</h2>

      {/* Buscador */}
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search books by name"
        />
      </div>

      {/* Lista de libros */}
      <ul className="space-y-4">
        {filteredBooks.map((book) => (
          <li
            key={book._id}
            className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200"
          >
            <div>
              <h3 className="text-lg font-semibold">{book.name}</h3>
              <p className="text-gray-600">{book.authors.join(", ")}</p>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => handleEdit(book)}
                className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book._id)}
                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Formulario de creación o edición de libros */}
      {selectedBook ? (
        <BookForm book={selectedBook} onSave={handleSave} />
      ) : (
        <BookForm book={null} onSave={handleSave} />
      )}
    </div>
  );
};

export default BookList;
