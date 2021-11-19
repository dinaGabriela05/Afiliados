import { Schema, model } from "mongoose";

const usuarioEsquema = new Schema({
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
  apellido: {
    type: String,
    required: true
  },
  identificacion: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  cargo: {
    type: String
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
  cambioEstado: {
    type: Boolean
  },
  username: {
    type: String
  },
  ipUltimaConexion: {
    type: String
  },
  fechaUltimaConexion: {
    type: Date
  },
  scanReference: {
    type: String
  },
  validacionFacial: {
    type: Boolean
  },
  password: {
    type: String
  },
  rol: [
    {
      type: Schema.Types.ObjectId,
      ref: "Rol"
    }
  ]
});

export default model("Usuario", usuarioEsquema);
