import NotificacionValidador from "../../validators/Notificacion.validator";
import { Inject, Service } from "typedi";
import NotificacionRepositorio from "../../repositories/Notificacion.repository";
import Notificacion from "../../models/Notificacion";

@Service()
export default class NotificacionServicio {
  @Inject(type => NotificacionRepositorio)
  notificacionRepositorio: NotificacionRepositorio;
  @Inject(type => NotificacionValidador)
  notificacionValidador: NotificacionValidador;

  async obtenerTodos(_page: any, _limit: any, filter: any) {
    const notificaciones = await this.notificacionRepositorio.obtenerTodos(
      filter,
      parseInt(_page),
      parseInt(_limit)
    );
    return notificaciones;
  }

  async crearNotificacion(notificacion: any) {
    await this.notificacionValidador.crearNotificacion(notificacion);
    const nuevaNotificacion = new Notificacion(notificacion);
    const notificacionGuardada = await nuevaNotificacion.save();
    return notificacionGuardada;
  }

  async actualizarNotificacion(id: string, notificacion: any) {
    await this.notificacionValidador.actualizarNotificacion(notificacion);
    let notificacionGuardada = false;
    const actualizacionNotificacion = await this.notificacionRepositorio.actualizarNotificacion(
      id,
      notificacion
    );
    if (actualizacionNotificacion) {
      if (actualizacionNotificacion.n === 1) {
        notificacionGuardada = true;
      }
    }
    return notificacionGuardada;
  }

  async eliminarNotificacion(id: string) {
    await this.notificacionValidador.eliminarNotificacion({ id: id });
    let notificacionEliminada = false;
    const eliminacionNotificacion = await this.notificacionRepositorio.eliminarNotificacion(
      id
    );
    if (eliminacionNotificacion) {
      if (eliminacionNotificacion.n === 1) {
        notificacionEliminada = true;
      }
    }
    return notificacionEliminada;
  }

  async guardarNotificacion(notificacion: any) {
    await this.notificacionValidador.guardarNotificacion(notificacion);
    // let notificacionGuardado = false;
  }

  async obtenerCatalogoNotificacion(filter: any) {
    const roles = await this.notificacionRepositorio.obtenerSelector(filter);
    return roles;
  }
}
