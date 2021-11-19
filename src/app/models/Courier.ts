import { Schema, model } from "mongoose";


const courierEsquema = new Schema({
  id: {
    type: Number,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },

  estado: {
    type: String
  },
  codigoBeneficiario: {
    type: String,
    required: true
  },
  nombreBeneficiario: {
    type: String,
    required: true
  },
  correoBeneficiario: {
    type: String,
    required: true
  },
  codigoAplicacion: {
    type: String,
    required: true
  },
  celularBeneficiario: {
    type: String
  },

  identificacionBeneficiario: {
    type: String
  },

  nombreEmisor: {
    type: String
  },

  idEmisor: {
    type: String
  },

  ruta: {
    type: String
  },

  cuenta: {
    type: String
  },
  noCheque: {
    type: String
  },
  monto: {
    type: String
  },
  pin: {
    type: String
  },
  fecha: {
    type: String
  },
  
  endoso: {
    type: String
  },
  imgFrente: {
    type: String
  },
  imgReverso: {
    type: String
  },
  micrDeCheque: {
    type: String
  },
  rps: {
    type: String
  },
  usuarioEmisor: {
    type: String
  },
  correoEmisor: {
    type: String
  },
  identificacionEmisor: {
    type: String
  },
  telfEmisor: {
    type: String
  },
  idUsuarioBenef:{
    type: String
  },
  concepto:{
    type: String
  },
  nombreBanco:{
    type: String
  },
  fechaCreacion: {
    type: Date,
    required: false
  },
  fechaActualizacion: Date,
  fechaEliminacion: Date
});

export default model("Courier", courierEsquema);
