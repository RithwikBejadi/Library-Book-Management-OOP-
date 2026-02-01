import express, { Application } from "express";
import { connect } from "mongoose";
import { Routes } from "./utils/route.interface";
import ErrorMiddleware from "./middlewares/error.middleware";

class App {
  public app: Application;
  private errorMiddleware = new ErrorMiddleware();

  constructor(routes: Routes[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/api", route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(this.errorMiddleware.handleError);
  }

  public async connectDatabase(mongoUri: string) {
    try {
      await connect(mongoUri);
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Database connection failed:", error);
      process.exit(1);
    }
  }

  public listen(port: number) {
    this.app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
}

export default App;




