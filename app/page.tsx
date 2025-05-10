import "./globals.css";

import BookList from "@/components/BookList";

const BooksPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Books CRUD</h1>
      <BookList />
    </div>
  );
};

export default BooksPage;