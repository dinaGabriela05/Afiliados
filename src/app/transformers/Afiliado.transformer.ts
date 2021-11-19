import { Service } from "typedi";

@Service()
export default class AfiliadoTransformador {
  public transformador = (afiliado: any) => {
    return {
      _id: afiliado._id,
      nombre: afiliado.nombre,
      apellido: afiliado.apellido,
      razonSocial: afiliado.razonSocial,
      nombreComercial: afiliado.nombreComercial,
      inicioActividades: afiliado.inicioActividades,
      representanteLegal: afiliado.representanteLegal,
      tipo: afiliado.tipo,
      paso: afiliado.paso,
      identificacion: afiliado.identificacion,
      direccion: afiliado.direccion,
      ciudad: afiliado.ciudad,
      contacto: afiliado.contacto,
      terminosCondiciones: afiliado.terminosCondiciones,
      cuentas: afiliado.cuentas,
      usuarios: afiliado.usuarios,
      estado: afiliado.estado,
      fechaCreacion: afiliado.fechaCreacion,
      fechaActualizacion: afiliado.fechaActualizacion
    };
  };

  public transformadorEmpresa = (usuarioAfiliado: any) => {
    return {
      _id: usuarioAfiliado._id,
      razonSocial: usuarioAfiliado.razonSocial,
      nombreComercial: usuarioAfiliado.nombreComercial,
      tipo: usuarioAfiliado.tipo,
      identificacion: usuarioAfiliado.identificacion,
      direccion: usuarioAfiliado.direccion,
      ciudad: usuarioAfiliado.ciudad,
      contacto: usuarioAfiliado.contacto
    };
  };
  public transformadorPersonaRucNatural = (usuarioAfiliado: any) => {
    return {
      _id: usuarioAfiliado._id,
      nombre: usuarioAfiliado.nombre,
      apellido: usuarioAfiliado.apellido,
      razonSocial: usuarioAfiliado.razonSocial,
      tipo: usuarioAfiliado.tipo,
      identificacion: usuarioAfiliado.identificacion,
      direccion: usuarioAfiliado.direccion,
      ciudad: usuarioAfiliado.ciudad,
      contacto: usuarioAfiliado.contacto
    };
  };

  public transformadorPersonaCedula = (usuarioAfiliado: any) => {
    return {
      _id: usuarioAfiliado._id,
      nombre: usuarioAfiliado.nombre,
      apellido: usuarioAfiliado.apellido,
      tipo: usuarioAfiliado.tipo,
      identificacion: usuarioAfiliado.identificacion,
      direccion: usuarioAfiliado.direccion,
      ciudad: usuarioAfiliado.ciudad,
      contacto: usuarioAfiliado.contacto
    };
  };

  public transformadorPersonaPasaporte = (usuarioAfiliado: any) => {
    return {
      _id: usuarioAfiliado._id,
      nombre: usuarioAfiliado.nombre,
      apellido: usuarioAfiliado.apellido,
      tipo: usuarioAfiliado.tipo,
      identificacion: usuarioAfiliado.identificacion,
      direccion: usuarioAfiliado.direccion,
      ciudad: usuarioAfiliado.ciudad,
      contacto: usuarioAfiliado.contacto
    };
  };

  public transformadorConsulta = (receptorNotificacion: any) => {
    return {
      notificadores: receptorNotificacion.notificadores
    };
  };
  public transformadorAdminUsuarios = (afiliado: any) => {
    return {
      usuarios: afiliado.usuarios
    };
  };
  public transformadorAdminCuentas = (afiliado: any) => {
    return {
      cuentas: afiliado.cuentas
    };
  };
}
