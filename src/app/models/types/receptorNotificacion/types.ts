import { Document } from "mongoose";

export interface IReceptorNotificacion extends Document {
  nombre: string;
  email: string;
  contacto: string;
  estado: string;
  notificacion: object;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  fechaEliminacion: Date;
}
