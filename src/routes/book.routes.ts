import { Router } from "express";
import { Routes } from "../utils/route.Interface";
import BookController from "../controllers/book.controller";

class BookRoutes implements Routes {
  path?: string = "/books";
  router: Router = Router();
  public bookController = new BookController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.bookController.getBooks);
    this.router.post(`${this.path}`, this.bookController.createBook);
  }
}

export default BookRoutes;