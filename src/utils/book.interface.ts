import { Document, Model } from "mongoose";

export interface IBook {
  title: string;
  author: string;
}

export interface IBookDocument extends Document, IBook {
  createdAt: Date;
  updatedAt: Date;
}

export type IBookModel = Model<IBookDocument>;