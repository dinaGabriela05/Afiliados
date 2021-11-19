import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import OtpLogServicio from "../services/otpLog/OtpLog.service";
import OtpLogTransformador from "../transformers/OtpLog.transformer";
import { IOtpLog } from "../models/types/otpLog/types";

@Service()
export default class OtpLogControlador {
  @Inject(type => OtpLogServicio)
  otpLogServicio: OtpLogServicio;
  @Inject(type => OtpLogTransformador)
  otpLogTransformador: OtpLogTransformador;

  public obtenerTodos = async (req: Request, res: Response) => {
    const { limit, page, filter } = req.query;
    const otpLogs = await this.otpLogServicio.obtenerTodos(page, limit, filter);
    (otpLogs as any).data = otpLogs.data.map((otpLogs: any) =>
      this.otpLogTransformador.transformador(otpLogs)
    );
    res.status(200).send(otpLogs);
  };

  public crearOtpLog = async (req: Request, res: Response) => {
    const otpLog: IOtpLog = req.body;
    const otpLogCreado = await this.otpLogServicio.crearOtpLog(otpLog);
    if (otpLogCreado) {
      const otpLogTransformado = this.otpLogTransformador.transformador(
        otpLogCreado
      );
      res.status(200).send({
        data: otpLogTransformado,
        mensaje: "Otp log guardado exitosamente"
      });
    } else {
      res.status(400).send({ mensaje: "No se pudo guardar el otp log" });
    }
  };
}
