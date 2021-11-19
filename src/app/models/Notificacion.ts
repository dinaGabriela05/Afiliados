import { Schema, model } from "mongoose";

export enum ESTADOSNOTIFICACION {
  ACTIVO = "ACTIVO",
  INACTIVO = "INACTIVO"
}

export enum TIPONOTIFICACION {
  SMS = "SMS",
  EMAIL = "EMAIL"
}

const notificacionEsquema = new Schema({
  id: {
    type: Number,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: String,
  tipo: {
    type: String,
    required: true
  },
  parametrosEnvio: {
    type: Object
  },
  estado: {
    type: String,
    default: "ACTIVO"
  },
  fechaCreacion: {
    type: Date,
    default: Date.now()
  },
  fechaActualizacion: Date,
  fechaEliminacion: Date,
  codigoPlantilla: {
    type: String,
    required: true,
    unique: true
  }
});

export default model("Notificacion", notificacionEsquema);
