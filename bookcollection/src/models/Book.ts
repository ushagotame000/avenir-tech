import { Genre } from "./Genre";
export interface Book {
  id: number;
  title: string;
  author: string;
  genre: Genre;
  price: number;
  stock: number;
  publishedDate: Date;
}
