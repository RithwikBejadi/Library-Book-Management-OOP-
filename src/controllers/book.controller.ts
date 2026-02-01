import { Request, Response } from "express";
import BookService from "../services/book.service";

class BookController {
  private bookService = new BookService();

  public getBooks = async (req: Request, res: Response) => {
    try {
      const { search, genre, publishedYear, available } = req.query;
      
      const filters = {
        search,
        genre,
        publishedYear,
        available
      };
      
      const books = await this.bookService.getAllBooks(filters);
      return res.status(200).json(books);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch books" });
    }
  };

  public createBook = async (req: Request, res: Response) => {
    try {
      const { title, author, isbn, publishedYear, genre, available } = req.body;

      if (!title || typeof title !== "string") {
        return res
          .status(400)
          .json({ message: "title is required and must be a string" });
      }

      if (!author || typeof author !== "string") {
        return res
          .status(400)
          .json({ message: "author is required and must be a string" });
      }

      if (!isbn || typeof isbn !== "string") {
        return res
          .status(400)
          .json({ message: "isbn is required and must be a string" });
      }

      if (!publishedYear || typeof publishedYear !== "number") {
        return res
          .status(400)
          .json({ message: "publishedYear is required and must be a number" });
      }

      if (!genre || typeof genre !== "string") {
        return res
          .status(400)
          .json({ message: "genre is required and must be a string" });
      }

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