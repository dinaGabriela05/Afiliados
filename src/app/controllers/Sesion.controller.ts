import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import SesionServicio from "../services/sesion/Sesion.service";
import SesionTransformador from "../transformers/Sesion.transformer";
import { ISesion } from "../models/types/sesion/types";

@Service()
export default class SesionControlador {
  @Inject(type => SesionServicio)
  sesionServicio: SesionServicio;
  @Inject(type => SesionTransformador)
  sesionTransformador: SesionTransformador;

  public obtenerTodos = async (req: Request, res: Response) => {
    const { limit, page, filter } = req.query;
    const sesiones = await this.sesionServicio.obtenerTodos(page, limit, filter);
    (sesiones as any).data = sesiones.data.map((sesiones: any) =>
      this.sesionTransformador.transformador(sesiones)
    );
    res.status(200).send(sesiones);
  };


}
