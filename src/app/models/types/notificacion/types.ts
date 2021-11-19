import { Document } from "mongoose";

export interface INotificacion extends Document {
  nombre: string;
  tipo: string;
  estado: string;
  parametrosEnvio: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  fechaEliminacion: Date;
  codigoPlantilla: string;
}
