import { Service } from "typedi";

@Service()
export default class ReceptorNotificacionTransformador {
  public transformador = (receptorNotificacion: any) => {
    return {
      id: receptorNotificacion.id,
      email: receptorNotificacion.email,
      contacto: receptorNotificacion.contacto,
      estado: receptorNotificacion.estado,
      notificacion: receptorNotificacion.notificacion,
      afiliado: receptorNotificacion.afiliado,
      fechaCreacion: receptorNotificacion.fechaCreacion,
      fechaActualizacion: receptorNotificacion.fechaActualizacion
    };
  };
}
