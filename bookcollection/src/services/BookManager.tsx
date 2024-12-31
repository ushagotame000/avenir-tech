import { Book } from "../models/Book";

class BookManager {
  private books: Book[] = [];
//todo : identify concept
  constructor(initialBooks: Book[] = []) {
    this.books = initialBooks;
  }

  addBook(book: Omit<Book, "id">): void {
    const newBook = { ...book, id: this.books.length + 1 };
    this.books.push(newBook);
  }

  editBook(id: number, updatedBook: Omit<Book, "id">): void {
    this.books = this.books.map((book) =>
      book.id === id ? { ...updatedBook, id } : book
    );
  }

  deleteBook(id: number): void {
    this.books = this.books.filter((book) => book.id !== id);
  }

  getBooks(): Book[] {
    return this.books;
  }
}

export default BookManager;
