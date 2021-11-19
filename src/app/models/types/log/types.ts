import { Document } from "mongoose";

export interface ILog extends Document {
  codigo: string;
  usuario: string;
  atributos: any;
  fechaCreacion: Date;
}
