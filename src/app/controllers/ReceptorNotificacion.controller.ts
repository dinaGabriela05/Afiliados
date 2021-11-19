import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import ReceptorNotificacionServicio from "../services/receptorNotificacion/ReceptorNotificacion.service";
import ReceptorNotificacionTransformador from "../transformers/ReceptorNotificacion.transformer";
import { IReceptorNotificacion } from "../models/types/receptorNotificacion/types";

@Service()
export default class ReceptorNotificacionControlador {
  @Inject(type => ReceptorNotificacionServicio)
  receptorNotificacionServicio: ReceptorNotificacionServicio;
  @Inject(type => ReceptorNotificacionTransformador)
  receptorNotificacionTransformador: ReceptorNotificacionTransformador;

  public obtenerTodos = async (req: Request, res: Response) => {
    const { limit, page, filter } = req.query;
    const receptoresNotificacion = await this.receptorNotificacionServicio.obtenerTodos(
      page,
      limit,
      filter
    );
    (receptoresNotificacion as any).data = receptoresNotificacion.data.map(
      (receptoresNotificacion: any) =>
        this.receptorNotificacionTransformador.transformador(
          receptoresNotificacion
        )
    );
    res.status(200).send(receptoresNotificacion);
  };

  public crearReceptorNotificacion = async (req: Request, res: Response) => {
    const receptorNotificacion: IReceptorNotificacion = req.body;
    const receptorNotificacionCreado = await this.receptorNotificacionServicio.crearReceptorNotificacion(
      receptorNotificacion
    );
    if (receptorNotificacionCreado) {
      const receptorNotificacionTransformado = this.receptorNotificacionTransformador.transformador(
        receptorNotificacionCreado
      );
      res.status(200).send({
        data: receptorNotificacionTransformado,
        mensaje: "Receptor notificación guardado exitosamente"
      });
    } else {
      res
        .status(400)
        .send({ mensaje: "No se pudo guardar el receptor notificación" });
    }
  };

  public actualizarReceptorNotificacion = async (
    req: Request,
    res: Response
  ) => {
    const { id } = req.params;
    const receptorNotificacion: IReceptorNotificacion = req.body;
    const receptorNotificacionGuardado = await this.receptorNotificacionServicio.actualizarReceptorNotificacion(
      id,
      receptorNotificacion
    );
    if (receptorNotificacionGuardado) {
      res
        .status(200)
        .send({ mensaje: "Notificación actualizado exitosamente" });
    } else {
      res
        .status(400)
        .send({ mensaje: "No se pudo actualizar el la notificación" });
    }
  };

  public eliminarReceptorNotificacion = async (req: Request, res: Response) => {
    const { afiliadoId } = req.params;
    const notificador: any = req.body;
    const receptorNotificacionEliminado = await this.receptorNotificacionServicio.eliminarReceptorNotificacion(
      afiliadoId,
      notificador
    );
    if (receptorNotificacionEliminado) {
      res
        .status(200)
        .send({ mensaje: "Receptor notificación eliminado exitosamente" });
    } else {
      res
        .status(400)
        .send({ mensaje: "No se pudo eliminar el receptor notificación" });
    }
  };
}
