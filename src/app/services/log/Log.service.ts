import LogValidador from "../../validators/Log.validator";
import { Inject, Service } from "typedi";
import LogRepositorio from "../../repositories/Log.repository";
import Log from "../../models/Log";

@Service()
export default class LogServicio {
  @Inject(type => LogRepositorio)
  logRepositorio: LogRepositorio;
  @Inject(type => LogValidador)
  logValidador: LogValidador;

  async obtenerTodos(_page: any, _limit: any, filter: any) {
    const logs = await this.logRepositorio.obtenerTodos(
      filter,
      parseInt(_page),
      parseInt(_limit)
    );
    return logs;
  }

  async crearLog(log: any) {
    await this.logValidador.crearLog(log);
    const nuevoLog = new Log(log);
    const logGuardado = await nuevoLog.save();
    return logGuardado;
  }
}
