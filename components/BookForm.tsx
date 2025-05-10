'use client'

import React, { useState, useEffect } from "react";
import { Book } from "@/types/book"; 
import { createBook, updateBook } from "@/services/bookService"; 

interface BookFormProps {
  book?: Book | null; 
  onSave: () => void; 
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

        await updateBook(book._id, formData); 
      } else {
  
        await createBook(formData);
      }
      onSave(); 
    } catch (error) {
      console.error("Error saving book:", error); 
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
