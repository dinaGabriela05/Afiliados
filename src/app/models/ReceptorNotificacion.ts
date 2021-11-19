import { Schema, model } from "mongoose";
const receptorNotificacionEsquema = new Schema({
  id: {
    type: Number,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: String,
  email: String,
  contacto: String,
  estado: {
    type: String,
    default: "ACTIVO"
  },
  notificacion: [
    {
      type: Schema.Types.ObjectId,
      ref: "Notificacion"
    }
  ],
  fechaCreacion: {
    type: Date,
    default: Date.now()
  },
  fechaActualizacion: Date,
  fechaEliminacion: Date
});

// const ReceptorNotificacion= model("ReceptorNotificacion", receptorNotificacionEsquema);
// module.exports=ReceptorNotificacion;
export default model("ReceptorNotificacion", receptorNotificacionEsquema);
