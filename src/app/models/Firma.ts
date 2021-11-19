import { Schema, model } from "mongoose";


const firmaEsquema = new Schema({
  id: {
    type: Number,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  

  idBanco: {
    type: String
  },

  imagenFirma: {
    type: String
  },

  fechaActualizacion: Date,
  fechaEliminacion: Date
});

export default model("Firma", firmaEsquema);
