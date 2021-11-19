import { Document } from "mongoose";

export interface IRol extends Document {
  nombre: string;
  codigo: string;
  reglas: any;
  estado: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}
