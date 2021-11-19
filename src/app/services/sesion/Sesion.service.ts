import SesionValidador from "../../validators/Sesion.validator";
import { Inject, Service } from "typedi";
import SesionRepositorio from "../../repositories/Sesion.repository";
import Sesion from "../../models/Sesion";

@Service()
export default class SesionServicio {
  @Inject(type => SesionRepositorio)
  sesionRepositorio: SesionRepositorio;
  @Inject(type => SesionValidador)
  sesionValidador: SesionValidador;

  async obtenerTodos(_page: any, _limit: any, filter: any) {
    const sesiones = await this.sesionRepositorio.obtenerTodos(
      filter,
      parseInt(_page),
      parseInt(_limit)
    );
    return sesiones;
  }

 
}
