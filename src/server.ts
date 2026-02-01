import App from "./app";
import BookRoutes from "./routes/book.routes";

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

const app = new App([new BookRoutes()]);

app.connectDatabase(MONGO_URI);
app.listen(Number(PORT));