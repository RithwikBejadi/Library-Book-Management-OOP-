import { Request, Response, NextFunction } from "express";
import BookService from "../services/book.service";
import { NotFoundError } from "../utils/errors";

class BookController {
  private bookService = new BookService();

  public getBooks = async (req: Request, res: Response, next: NextFunction) => {
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
      next(err);
    }
  };

  public createBook = async (req: Request, res: Response, next: NextFunction) => {
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
      next(err);
    }
  };

  public getBookById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const book = await this.bookService.getBookById(id);
      
      if (!book) {
        throw new NotFoundError("Book not found");
      }
      
      return res.status(200).json(book);
    } catch (err) {
      next(err);
    }
  };

  public updateBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const book = await this.bookService.updateBook(id, updateData);
      
      if (!book) {
        throw new NotFoundError("Book not found");
      }
      
      return res.status(200).json(book);
    } catch (err) {
      next(err);
    }
  };

  public deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const book = await this.bookService.deleteBook(id);
      
      if (!book) {
        throw new NotFoundError("Book not found");
      }
      
      return res.status(200).json({ message: "Book deleted successfully" });
    } catch (err) {
      next(err);
    }
  };
}

export default BookController;