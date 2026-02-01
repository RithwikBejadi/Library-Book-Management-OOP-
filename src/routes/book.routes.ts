import { Router } from "express";
import { Routes } from "../utils/route.Interface";
import BookController from "../controllers/book.controller";
import ValidationMiddleware from "../middlewares/validation.middleware";

class BookRoutes implements Routes {
  path?: string = "/books";
  router: Router = Router();
  public bookController = new BookController();
  private validationMiddleware = new ValidationMiddleware();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.bookController.getBooks);
    this.router.get(`${this.path}/:id`, this.validationMiddleware.validateIdParam, this.bookController.getBookById);
    this.router.post(`${this.path}`, this.validationMiddleware.validateBookCreate, this.bookController.createBook);
    this.router.put(`${this.path}/:id`, this.validationMiddleware.validateIdParam, this.validationMiddleware.validateBookUpdate, this.bookController.updateBook);
    this.router.delete(`${this.path}/:id`, this.validationMiddleware.validateIdParam, this.bookController.deleteBook);
  }
}

export default BookRoutes;