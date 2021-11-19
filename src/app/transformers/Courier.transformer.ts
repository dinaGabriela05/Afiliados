import { Service } from "typedi";

@Service()
export default class CourierTransformador {
  public transformador = (courier: any) => {
    return {
      _id: courier._id,
      estado: courier.estado,
      codigoBeneficiario: courier.codigoBeneficiario,
      nombreBeneficiario: courier.nombreBeneficiario,
      correoBeneficiario: courier.correoBeneficiario,
      codigoAplicacion: courier.codigoAplicacion,
      celularBeneficiario: courier.celularBeneficiario,
      identificacionBeneficiario: courier.identificacionBeneficiario,
      nombreEmisor: courier.nombreEmisor,
      idEmisor: courier.idEmisor,
      ruta: courier.ruta,
      cuenta: courier.cuenta,
      noCheque: courier.noCheque,
      monto: courier.monto,
      pin: courier.pin,
      fecha: courier.fecha,
      endoso: courier.endoso,
      imgFrente: courier.imgFrente,
      imgReverso: courier.imgReverso,
      micrDeCheque: courier.micrDeCheque,
      rps: courier.rps,
      usuarioEmisor: courier.usuarioEmisor,
      correoEmisor: courier.correoEmisor,
      identificacionEmisor: courier.identificacionEmisor,
      telfEmisor:courier.telfEmisor,
      idUsuarioBenef:courier.idUsuarioBenef,
      concepto:courier.concepto,
      nombreBanco:"Banco Pichincha",
      fechaCreacion: courier.fechaCreacion,
      fechaActualizacion: courier.fechaActualizacion,
      fechaEliminacion: courier.fechaEliminacion
    };
  };

  public selectorTransformador = (courier: any) => {
    const transformedActivity = {
      id: courier.id,
      nombreBeneficiario: courier.nombreBeneficiario
    };
    return transformedActivity;
  };
}
