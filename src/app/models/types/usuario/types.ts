import { Document } from "mongoose";

export interface IUsuario extends Document {
  nombre: string;
  apellido: string;
  identificacion: string;
  email: string;
  telefono: string;
  cargo: string;
  estado: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  fechaEliminacion: Date;
  rol: any;
  password: string;
  username: string;
  ipUltimaConexion: string;
  fechaUltimaConexion: Date;
  scanReference: string;
  validacionFacial: boolean;
}
