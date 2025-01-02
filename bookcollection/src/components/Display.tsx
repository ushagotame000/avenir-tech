import React, { useEffect, useState } from "react";
import { BookList } from "./BookList";
import { Book } from "../models/Book";
import { AddBookForm } from "./AddBookForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Display: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const navigate = useNavigate();

  // FROM AUTH get user role N useremail
  const { userRole, useremail, logout } = useAuth();

  // Load books from l/c storage
  useEffect(() => {
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  // Save books to l/c storage
  useEffect(() => {
    if (books.length > 0) {
      localStorage.setItem("books", JSON.stringify(books));
    }
  }, [books]);

  const addBook = (book: Omit<Book, "id">) => {
    const newBook = { ...book, id: books.length + 1 };
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const editBook = (id: number, updatedBook: Omit<Book, "id">) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === id ? { ...updatedBook, id } : book))
    );
    setEditMode(false);
    setCurrentBook(null);
  };

  const deleteBook = (id: number) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  const handleEdit = (book: Book) => {
    setCurrentBook(book);
    setEditMode(true);
  };

  const handleLogout = () => {
    // from auth
    logout();
    navigate("/login");
  };

  if (!userRole) {
    return (
      <div className=" mt-[20%] text-center justify-center md:text-xl text-base text-red-500">
        <p>Please log in to access the content.</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-50 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Book Inventory</h1>
      <p className="text-center mb-4">Welcome, {useremail}!</p>

      {(userRole === "Admin" || userRole === "Librarian") && (
        <>
          {editMode ? (
            <AddBookForm
              addBook={(updatedBook: Omit<Book, "id">) => {
                if (currentBook) {
                  editBook(currentBook.id, updatedBook);
                }
              }}
              initialData={
                currentBook || {
                  title: "",
                  author: "",
                  genre: "Fiction",
                  price: 0,
                  publishedDate: new Date(),
                  stock: 0,
                }
              }
              isEditing={true}
            />
          ) : (
            <AddBookForm
              addBook={addBook}
              initialData={{
                title: "",
                author: "",
                genre: "Fiction",
                price: 0,
                publishedDate: new Date(),
                stock: 0,
              }}
              isEditing={false}
            />
          )}
        </>
      )}

      <BookList
        books={books}
        handleEdit={
          userRole === "Guest"
            ? () => alert("Guests cannot edit books.")
            : handleEdit
        }
        deleteBook={
          userRole === "Guest"
            ? () => alert("Guests cannot delete books.")
            : deleteBook
        }
      />

      {userRole === "Guest" && (
        <p className="text-red-500 mt-4">
          You do not have permission to add, edit, or delete books.
        </p>
      )}

      <button
        onClick={handleLogout}
        className="mt-8 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};
