import { Schema, model } from "mongoose";

const logEsquema = new Schema({
  id: {
    type: Number,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  codigo: {
    type: String,
    required: true
  },
  usuario: {
    type: String,
    required: true
  },
  atributos: {
    type: Array,
    required: true
  },
  fechaCreacion: {
    type: Date,
    required: true
  }
});

export default model("Log", logEsquema);
