import { Schema, model } from "mongoose";

const rolEsquema = new Schema({
  id: {
    type: Number,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: String,
    required: true
  },
  codigo: {
    type: String,
    required: true
  },
  reglas: {
    type: Array
  },
  estado: {
    type: String,
    default: "ACTIVO"
  },
  fechaCreacion: {
    type: Date,
    default: Date.now()
  },
  fechaActualizacion: Date
});

export default model("Rol", rolEsquema);
