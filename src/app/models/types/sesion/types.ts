import { Document } from "mongoose";

export interface ISesion extends Document {
  usuario: string;
  contrasenia: string;
  estado: string;
  cambioClave: boolean;
}
