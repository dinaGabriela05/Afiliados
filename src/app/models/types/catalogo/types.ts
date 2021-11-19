import { Document } from "mongoose";

export interface ICatalogo extends Document {
  codigo: string;
  nombre: string;
  descripcion: string;
  infoAdicional: object;
  tipo: string;
  estado: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  fechaEliminacion: Date;
}
