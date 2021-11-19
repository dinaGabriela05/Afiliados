import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import LogServicio from "../services/log/Log.service";
import LogTransformador from "../transformers/Log.transformer";
import { ILog } from "../models/types/log/types";

@Service()
export default class LogControlador {
  @Inject(type => LogServicio)
  logServicio: LogServicio;
  @Inject(type => LogTransformador)
  logTransformador: LogTransformador;

  public obtenerTodos = async (req: Request, res: Response) => {
    const { limit, page, filter } = req.query;
    const logs = await this.logServicio.obtenerTodos(page, limit, filter);
    (logs as any).data = logs.data.map((logs: any) =>
      this.logTransformador.transformador(logs)
    );
    res.status(200).send(logs);
  };

  public crearLog = async (req: Request, res: Response) => {
    const log: ILog = req.body;
    const logCreado = await this.logServicio.crearLog(log);
    if (logCreado) {
      const logTransformado = this.logTransformador.transformador(logCreado);
      res
        .status(200)
        .send({ data: logTransformado, mensaje: "Log guardado exitosamente" });
    } else {
      res.status(400).send({ mensaje: "No se pudo guardar el log" });
    }
  };
}
