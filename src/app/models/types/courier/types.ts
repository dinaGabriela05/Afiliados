import { Document } from "mongoose";

export interface ICourier extends Document {
    estado: string;
    codigoBeneficiario: string;
    nombreBeneficiario: string;
    correoBeneficiario: string;
    codigoAplicacion: string;
    celularBeneficiario: string;
    identificacionBeneficiario: string;
    nombreEmisor: string;
    idEmisor: string;
    ruta: string;
    cuenta: string;
    noCheque: string;
    monto: string;
    pin: string;
    fecha: string;
    endoso: string;
    imgFrente: string;
    imgReverso: string;
    micrDeCheque: string;
    rps:string;
    usuarioEmisor: string;
    correoEmisor: string;
    identificacionEmisor: string;
    telfEmisor:string;
    idUsuarioBenef:string;
    concepto:string;
    nombreBanco:string;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    fechaEliminacion: Date;

}
