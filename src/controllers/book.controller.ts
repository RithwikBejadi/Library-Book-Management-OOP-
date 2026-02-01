import { Request, Response } from "express";
import BookModel from "../models/book.model";

class BookController {
  public getBooks = async function (req: Request, res: Response) {
    try {
      const books = await BookModel.find();
      return res.status(200).json(books);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch books" });
    }
  };

  public createBook = async function (req: Request, res: Response) {
    try {
      const { title, author } = req.body;

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

      const book = await BookModel.create({
        title,
        author,
      });
      return res.status(201).json(book);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to create book" });
    }
  };
}

export default BookController;