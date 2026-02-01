import { model, Schema } from "mongoose";
import { IBookDocument, IBookModel } from "../utils/book.interface";

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const BookModel = model<IBookDocument, IBookModel>('Book', bookSchema);

export default BookModel;