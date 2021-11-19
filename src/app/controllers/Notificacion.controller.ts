import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { INotificacion } from "../models/types/notificacion/types";
import NotificacionServicio from "../services/notificacion/Notificacion.service";
import NotificacionTransformador from "../transformers/Notificacion.transformer";

@Service()
export default class NotificacionControlador {
  @Inject(type => NotificacionServicio)
  notificacionServicio: NotificacionServicio;
  @Inject(type => NotificacionTransformador)
  notificacionTransformador: NotificacionTransformador;

  public obtenerTodos = async (req: Request, res: Response) => {
    const { limit, page, filter } = req.query;
    const notificaciones = await this.notificacionServicio.obtenerTodos(
      page,
      limit,
      filter
    );
    (notificaciones as any).data = notificaciones.data.map(
      (notificaciones: any) =>
        this.notificacionTransformador.transformador(notificaciones)
    );
    res.status(200).send(notificaciones);
  };

  public crearNotificacion = async (req: Request, res: Response) => {
    const notificacion: INotificacion = req.body;
    const notificacionCreada = await this.notificacionServicio.crearNotificacion(
      notificacion
    );
    if (notificacionCreada) {
      const notificacionTransformada = this.notificacionTransformador.transformador(
        notificacionCreada
      );
      res.status(200).send({
        data: notificacionTransformada,
        mensaje: "Notificación guardada exitosamente"
      });
    } else {
      res.status(400).send({ mensaje: "No se pudo guardar la notificación" });
    }
  };

  public actualizarNotificacion = async (req: Request, res: Response) => {
    const { notificacionId } = req.params;
    const notificacion: INotificacion = req.body;
    const notificacionGuardada = await this.notificacionServicio.actualizarNotificacion(
      notificacionId,
      notificacion
    );
    if (notificacionGuardada) {
      res
        .status(200)
        .send({ mensaje: "Notificación actualizada exitosamente" });
    } else {
      res
        .status(400)
        .send({ mensaje: "No se pudo actualizar la notificación" });
    }
  };

  public eliminarNotificacion = async (req: Request, res: Response) => {
    const { notificacionId } = req.params;
    const notificacionEliminada = await this.notificacionServicio.eliminarNotificacion(
      notificacionId
    );
    if (notificacionEliminada) {
      res.status(200).send({ mensaje: "Notificación eliminada exitosamente" });
    } else {
      res.status(400).send({ mensaje: "No se pudo eliminar la notificación" });
    }
  };

  public obtenerCatalogoNotificacion = async (req: Request, res: Response) => {
    const { filter } = req.query;
    let roles: any = await this.notificacionServicio.obtenerCatalogoNotificacion(
      filter
    );
    roles = roles.map((roles: any) =>
      this.notificacionTransformador.transformadorSelector(roles)
    );
    res.status(200).send(roles);
  };
}
