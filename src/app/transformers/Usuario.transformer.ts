import { Service } from "typedi";

@Service()
export default class UsuarioTransformador {
  public transformador = (usuario: any) => {
    return {
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      identificacion: usuario.identificacion,
      email: usuario.email,
      telefono: usuario.telefono,
      cargo: usuario.cargo,
      estado: usuario.estado,
      fechaCreacion: usuario.fechaCreacion,
      fechaActualizacion: usuario.fechaActualizacion,
      cambioEstado: usuario.cambioEstado,
      password: usuario.password,
      rol: usuario.rol
    };
  };

  public transformadorConexion = (usuario: any) => {
    return {
      id: usuario._id,
      ipUltimaConexion: usuario.ipUltimaConexion,
      fechaUltimaConexion: usuario.fechaUltimaConexion,
      scanReference: usuario.scanReference,
      validacionFacial: usuario.validacionFacial
    };
  };
}
