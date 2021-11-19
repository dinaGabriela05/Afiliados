import { Service } from "typedi";

@Service()
export default class CatalogoTransformador {
  public transformador = (catalogo: any) => {
    return {
      _id: catalogo._id,
      codigo: catalogo.codigo,
      nombre: catalogo.nombre,
      descripcion: catalogo.descripcion,
      infoAdicional: catalogo.infoAdicional,
      tipo: catalogo.tipo,
      estado: catalogo.estado,
      fechaCreacion: catalogo.fechaCreacion,
      fechaActualizacion: catalogo.fechaActualizacion,
      fechaEliminacion: catalogo.fechaEliminacion
    };
  };

  public selectorTransformador = (catalogo: any) => {
    const transformedActivity = {
      id: catalogo.id,
      nombre: catalogo.nombre
    };
    return transformedActivity;
  };
}
