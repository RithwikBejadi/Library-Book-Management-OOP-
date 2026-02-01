import BookModel from "../models/book.model";
import { IBook } from "../utils/book.interface";

class BookService {
  public async getAllBooks(filters?: any) {
    const query: any = {};
    
    // Search by title or author
    if (filters?.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { author: { $regex: filters.search, $options: 'i' } }
      ];
    }
    
    // Filter by genre
    if (filters?.genre) {
      query.genre = filters.genre;
    }
    
    // Filter by publishedYear
    if (filters?.publishedYear) {
      query.publishedYear = Number(filters.publishedYear);
    }
    
    // Filter by availability
    if (filters?.available !== undefined) {
      query.available = filters.available === 'true';
    }
    
    return await BookModel.find(query);
  }

  public async getBookById(id: string) {
    return await BookModel.findById(id);
  }

  public async createBook(bookData: IBook) {
    return await BookModel.create(bookData);
  }

  public async updateBook(id: string, bookData: Partial<IBook>) {
    return await BookModel.findByIdAndUpdate(id, bookData, { new: true });
  }

  public async deleteBook(id: string) {
    return await BookModel.findByIdAndDelete(id);
  }
}

export default BookService;
