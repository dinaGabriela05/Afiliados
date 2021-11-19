import OtpLogValidador from "../../validators/OtpLog.validator";
import { Inject, Service } from "typedi";
import OtpLogRepositorio from "../../repositories/OtpLog.repository";
import OtpLog from "../../models/OtpLog";

@Service()
export default class OtpLogServicio {
  @Inject(type => OtpLogRepositorio)
  otpLogRepositorio: OtpLogRepositorio;
  @Inject(type => OtpLogValidador)
  otpLogValidador: OtpLogValidador;

  async obtenerTodos(_page: any, _limit: any, filter: any) {
    const otpLogs = await this.otpLogRepositorio.obtenerTodos(
      filter,
      parseInt(_page),
      parseInt(_limit)
    );
    return otpLogs;
  }

  async crearOtpLog(otpLog: any) {
    await this.otpLogValidador.crearOtpLog(otpLog);
    const nuevoOtpLog = new OtpLog(otpLog);
    const otpLogGuardado = await nuevoOtpLog.save();
    return otpLogGuardado;
  }
}
