import { Service } from "typedi";

@Service()
export default class LogTransformador {
  public transformador = (log: any) => {
    return {
      id: log.id,
      codigo: log.codigo,
      usuario: log.usuario,
      atributos: log.atributos,
      fechaCreacion: log.fechaCreacion
    };
  };
}
