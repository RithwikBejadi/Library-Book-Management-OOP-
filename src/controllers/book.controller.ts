import { Request, Response } from "express";
import BookService from "../services/book.service";

class BookController {
  private bookService = new BookService();

  public getBooks = async (req: Request, res: Response) => {
    try {
      const { search, genre, publishedYear, available, page, limit, sortBy, order } = req.query;
      
      const filters = {
        search,
        genre,
        publishedYear,
        available,
        page,
        limit,
        sortBy,
        order
      };
      
      const result = await this.bookService.getAllBooks(filters);
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch books" });
    }
  };

  public createBook = async (req: Request, res: Response) => {
    try {
      const { title, author, isbn, publishedYear, genre, available } = req.body;

      const book = await this.bookService.createBook({
        title,
        author,
        isbn,
        publishedYear,
        genre,
        available: available !== undefined ? available : true,
      });
      return res.status(201).json(book);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to create book" });
    }
  };

  public getBookById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const book = await this.bookService.getBookById(id);
      
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      
      return res.status(200).json(book);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch book" });
    }
  };

  public updateBook = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const book = await this.bookService.updateBook(id, updateData);
      
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      
      return res.status(200).json(book);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to update book" });
    }
  };

  public deleteBook = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const book = await this.bookService.deleteBook(id);
      
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      
      return res.status(200).json({ message: "Book deleted successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to delete book" });
    }
  };
}

export default BookController;