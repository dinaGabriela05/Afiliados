import { Document } from "mongoose";

export interface IOtpLog extends Document {
  codigo: string;
  usado: boolean;
  fechaExpiracion: Date;
}
