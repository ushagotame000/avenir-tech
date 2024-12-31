import React, { useState } from "react";
import { Book } from "../models/Book";

interface AddBookFormProps {
  addBook: (book: Omit<Book, "id">) => void;
  isEditing: boolean;
  initialData: Omit<Book, "id">;
}

export const AddBookForm: React.FC<AddBookFormProps> = ({
  addBook,
  isEditing,
  initialData,
}) => {
  const [title, setTitle] = useState(initialData.title);
  const [author, setAuthor] = useState(initialData.author);
  const [genre, setGenre] = useState(initialData.genre);
  const [price, setPrice] = useState(initialData.price);
  const [publishedDate, setPublishedDate] = useState(initialData.publishedDate);
  const [stock, setStock] = useState(initialData.stock);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //  updated book
    const updatedBook: Omit<Book, "id"> = {
      title,
      author,
      genre,
      price,
      publishedDate,
      stock,
    };

    // If in edit modethen pass the updated book to the editBook function
    addBook(updatedBook);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4  lg:w-[40rem] md:w-[35rem]  bg-gray-200 px-10 py-10 rounded-lg"
    >
      <div className="">
        <label htmlFor="title" className="block">
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="author" className="block">
          Author
        </label>
        <input
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="genre" className="block">
          Genre
        </label>
        <select
          id="genre"
          value={genre}
          onChange={(e) =>
            setGenre(
              e.target.value as
                | "Fiction"
                | "Non-Fiction"
                | "Mystery"
                | "Science"
                | "Biography"
                | "Fantasy"
                | "Other"
            )
          }
          className="w-full p-2 border rounded"
        >
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Mystery">Mystery</option>
          <option value="Science">Science</option>
          <option value="Biography">Biography</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="price" className="block">
          Price
        </label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="publishedDate" className="block">
          Published Date
        </label>
        <input
          id="publishedDate"
          type="date"
          value={publishedDate.toISOString().split("T")[0]}
          onChange={(e) => setPublishedDate(new Date(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="stock" className="block">
          Stock
        </label>
        <input
          id="stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(parseInt(e.target.value, 10))}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        {isEditing ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
};
