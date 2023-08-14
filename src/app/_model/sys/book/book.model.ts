
import { GenreBook } from "./genreBook.model";
export interface DauSach {
    bookCode: string;
    title: string;
    publisher: string;
    price: number;
    pages: number;
    description: string;
    status: number;
    author: string;
    createdYear: number;
    category: number;
    img: string;
    genres: GenreBook[];
  }

export interface Sach {
  bookId?: any;
  bookCode?: any;
  status?: number;
}