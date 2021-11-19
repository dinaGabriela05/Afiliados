import { Schema, model } from "mongoose";

export enum TIPODOCUMENTO {
  RUC = "RUC",
  CEDULA = "CEDULA",
  PASAPORTE = "PASAPORTE"
}

export enum ESTADOSAFILIADO {
  PRECARGADO = "PRECARGADO",
  AFILIADO = "AFILIADO",
  PROCESOAFILIACION = "PROCESOAFILIACION"
}

export enum TIPOAFILIADO {
  EMPRESA = "EMPRESA",
  PERSONA = "PERSONA"
}

const afiliadoEsquema = new Schema({
  id: {
    type: Number,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: String,
  apellido: String,
  razonSocial: String,
  nombreComercial: String,
  inicioActividades: Date,
  tipo: String,
  representanteLegal: {
    tipoDocumento: {
      type: String
    },
    documento: {
      type: String
    },
    nombre: {
      type: String
    },
    email: {
      type: String
    }
  },
  identificacion: {
    tipoDocumento: {
      type: String
    },
    fechaVencimiento: {
      type: Date
    },
    documento: {
      type: String,
      unique: true
    }
  },
  direccion: [
    {
      callePrincipal: {
        type: String
      },
      calleSecundaria: {
        type: String
      },
      referencia: {
        type: String
      },
      numero: {
        type: String
      }
    }
  ],
  ciudad: String,
  contacto: [
    {
      numContacto: {
        type: String
      },
      tipoContacto: {
        type: String
      }
    }
  ],
  terminosCondiciones: {
    type: Boolean
  },
  cuentas: [
    {
      codigoBanco: {
        type: String
      },
      banco: {
        type: String
      },
      numero: {
        type: String
      },
      moneda: {
        type: String
      },
      tipo: {
        type: String
      },
      estado: {
        type: String
      },
      fechaCreacion: {
        type: Date
      },
      fechaActualizacion: Date
    }
  ],
  usuarios: [
    {
      type: [String]
    }
  ],
  notificadores: [
    {
      type: Schema.Types.ObjectId,
      ref: "ReceptorNotificacion"
    }
  ],
  estado: {
    type: String
  },
  fechaCreacion: {
    type: Date,
    default: Date.now()
  },
  fechaActualizacion: Date,
  fechaEliminacion: Date
});

export default model("Afiliado", afiliadoEsquema);
