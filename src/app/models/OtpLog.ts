import { Schema, model } from "mongoose";

const otpLogEsquema = new Schema({
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
  usado: {
    type: Boolean,
    required: true
  },
  fechaExpiracion: {
    type: Date,
    required: true
  }
});

export default model("OtpLog", otpLogEsquema);
