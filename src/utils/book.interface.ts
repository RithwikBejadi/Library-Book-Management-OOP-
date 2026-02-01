import { Document, Model } from "mongoose";

export interface IBook {
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre: string;
  available: boolean;
}

export interface IBookDocument extends Document, IBook {
  createdAt: Date;
  updatedAt: Date;
}

export type IBookModel = Model<IBookDocument>;