import { Book } from "@/types/book";
import axios from "axios";

const API_URL = "/api/books"; 


export const getBooks = async (): Promise<Book[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching books");
  }
};


export const createBook = async (book: Book): Promise<Book> => {
  try {
    const response = await axios.post(API_URL, book);
    return response.data;
  } catch (error) {
    throw new Error("Error creating book");
  }
};


export const updateBook = async (id: string, book: Book): Promise<Book> => {
  try {
   
    const data = {
      name: book.name, 
      authors: book.authors,
      genres: book.genres,
      availability: book.availability,
      timesBorrowed: book.timesBorrowed,
      loanDuration: book.loanDuration,
      lastLoanDate: book.lastLoanDate,
    };
 
    const response = await axios.put(`${API_URL}/${id}`, data, {
      headers: {
        "Content-Type": "application/json",  
      },
    });

    return response.data;  
  } catch (error) {
   
    console.error("Error updating book:", error);
    throw new Error("Error updating book");
  }
};

export const deleteBook = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw new Error("Error deleting book");
  }
};
