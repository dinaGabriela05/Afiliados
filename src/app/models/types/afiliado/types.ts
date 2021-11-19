import { Document } from "mongoose";

export interface IAfiliado extends Document {
  nombre: string;
  apellido: string;
  razonSocial: string;
  tipo: string;
  identificacion: object;
  representanteLegal: object;
  inicioActividades: Date;
  nombreComercial: string;
  direccion: any;
  ciudad: string;
  contacto: any;
  terminosCondiciones: boolean;
  cuentas: any;
  usuarios: any;
  estado: string;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  fechaEliminacion: Date;
}
