import { Schema, model } from "mongoose";

export enum ESTADOSCATALOGO {
  ACTIVO = "ACTIVO",
  INACTIVO = "INACTIVO"
}

const catalogoEsquema = new Schema({
  id: {
    type: Number,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  codigo: {
    type: String,
    required: true,
    unique: true
  },
  nombre: {
    type: String,
    required: true
  },
  descripcion: String,
  infoAdicional: {
    type: Object
  },
  tipo: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    default: "ACTIVO"
  },
  fechaCreacion: {
    type: Date,
    required: true
  },
  fechaActualizacion: Date,
  fechaEliminacion: Date
});

export default model("Catalogo", catalogoEsquema);
