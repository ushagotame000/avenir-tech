import React from "react";
import { Book } from "../models/Book";
import { DataTable } from "./DataTable";

interface BookListProps {
  books: Book[];
  deleteBook?: (id: number) => void;
  handleEdit?: (book: Book) => void;
}

export const BookList: React.FC<BookListProps> = ({
  books,
  deleteBook,
  handleEdit,
}) => {
  const columns = [
    {
      key: "title",
      header: "Title",
      render: (book: Book) => <span className="font-bold">{book.title}</span>,
    },
    {
      key: "author",
      header: "Author",
      render: (book: Book) => <span>{book.author}</span>,
    },
    {
      key: "genre",
      header: "Genre",
      render: (book: Book) => <span>{book.genre}</span>,
    },
    {
      key: "price",
      header: "Price",
      render: (book: Book) => <span>Rs {book.price}</span>,
    },
    {
      key: "stock",
      header: "Stock",
      render: (book: Book) => <span>{book.stock}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      render: (book: Book) => (
        <div className="flex space-x-2">
          {handleEdit && (
            <button
              onClick={() => handleEdit(book)}
              className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-400"
            >
              Edit
            </button>
          )}
          {deleteBook && (
            <button
              onClick={() => deleteBook(book.id)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      {books.length === 0 ? (
        <p className="text-red-500">No books available</p>
      ) : (
        <DataTable<Book> data={books} columns={columns} />
      )}
    </div>
  );
};
