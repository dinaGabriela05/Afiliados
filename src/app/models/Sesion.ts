import { Schema, model } from "mongoose";

const sesionEsquema = new Schema({
  id: {
    type: Number,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  usuario: {
    type: String,
    required: true
  },
  contrasenia: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    required: true
  },
  cambioClave: {
    type: Boolean,
    required: true
  }
});

export default model("Sesion", sesionEsquema);
