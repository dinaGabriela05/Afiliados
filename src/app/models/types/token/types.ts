import { Document } from "mongoose";

export interface IToken extends Document {
  nombre: string;
}
