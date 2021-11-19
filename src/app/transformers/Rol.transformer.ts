import { Service } from "typedi";

@Service()
export default class RolTransformador {
  public transformador = (rol: any) => {
    return {
      id: rol.id,
      nombre: rol.nombre,
      codigo: rol.codigo,
      reglas: rol.reglas,
      estado: rol.estado,
      fechaCreacion: rol.fechaCreacion,
      fechaActualizacion: rol.fechaActualizacion
    };
  };

  public transformadorSelector = (rol: any) => {
    return {
      _id: rol._id,
      nombre: rol.nombre
    };
  };
}
