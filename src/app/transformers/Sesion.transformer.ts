import { Service } from "typedi";

@Service()
export default class SesionTransformador {
  public transformador = (sesion: any) => {
    return {
      id: sesion.id,
      usuario: sesion.codigo,
      contrasenia: sesion.usuario,
      estado: sesion.atributos,
      cambioClave: sesion.fechaCreacion
    };
  };
}
