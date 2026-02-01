import { Request, Response, NextFunction } from "express";

class ValidationMiddleware {
  public validateBookCreate = (req: Request, res: Response, next: NextFunction) => {
    const { title, author, isbn, publishedYear, genre } = req.body;

    if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ message: "title is required and must be a non-empty string" });
    }

    if (!author || typeof author !== "string" || author.trim() === "") {
      return res.status(400).json({ message: "author is required and must be a non-empty string" });
    }

    if (!isbn || typeof isbn !== "string" || isbn.trim() === "") {
      return res.status(400).json({ message: "isbn is required and must be a non-empty string" });
    }

    if (!publishedYear || typeof publishedYear !== "number") {
      return res.status(400).json({ message: "publishedYear is required and must be a number" });
    }

    if (publishedYear < 1000 || publishedYear > new Date().getFullYear()) {
      return res.status(400).json({ message: "publishedYear must be a valid year" });
    }

    if (!genre || typeof genre !== "string" || genre.trim() === "") {
      return res.status(400).json({ message: "genre is required and must be a non-empty string" });
    }

    next();
  };

  public validateBookUpdate = (req: Request, res: Response, next: NextFunction) => {
    const { title, author, isbn, publishedYear, genre, available } = req.body;

    if (title !== undefined && (typeof title !== "string" || title.trim() === "")) {
      return res.status(400).json({ message: "title must be a non-empty string" });
    }

    if (author !== undefined && (typeof author !== "string" || author.trim() === "")) {
      return res.status(400).json({ message: "author must be a non-empty string" });
    }

    if (isbn !== undefined && (typeof isbn !== "string" || isbn.trim() === "")) {
      return res.status(400).json({ message: "isbn must be a non-empty string" });
    }

    if (publishedYear !== undefined) {
      if (typeof publishedYear !== "number") {
        return res.status(400).json({ message: "publishedYear must be a number" });
      }
      if (publishedYear < 1000 || publishedYear > new Date().getFullYear()) {
        return res.status(400).json({ message: "publishedYear must be a valid year" });
      }
    }

    if (genre !== undefined && (typeof genre !== "string" || genre.trim() === "")) {
      return res.status(400).json({ message: "genre must be a non-empty string" });
    }

    if (available !== undefined && typeof available !== "boolean") {
      return res.status(400).json({ message: "available must be a boolean" });
    }

    next();
  };

  public validateIdParam = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id || id.length !== 24) {
      return res.status(400).json({ message: "Invalid book ID format" });
    }

    next();
  };
}

export default ValidationMiddleware;
