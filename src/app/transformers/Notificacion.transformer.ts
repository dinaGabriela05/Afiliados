import { Service } from "typedi";

@Service()
export default class NotificacionTransformador {
  public transformador = (notificacion: any) => {
    return {
      id: notificacion.id,
      nombre: notificacion.nombre,
      tipo: notificacion.tipo,
      estado: notificacion.estado,
      fechaCreacion: notificacion.fechaCreacion,
      fechaActualizacion: notificacion.fechaActualizacion,
      codigoPlantilla: notificacion.codigoPlantilla
    };
  };

  public transformadorSelector = (notificacion: any) => {
    return {
      _id: notificacion._id,
      nombre: notificacion.nombre
    };
  };
}
