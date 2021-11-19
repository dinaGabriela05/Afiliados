import { Schema, model } from "mongoose";


const keyVaultEsquema = new Schema({
  id: {
    type: Number,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },

  keyChekex: {
    type: String
  },
  keyCheqscan: {
    type: String,
  },
  

});

export default model("KeyVault", keyVaultEsquema);
