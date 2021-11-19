import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import TokenServicio from "../services/token/Token.service";
import TokenTransformador from "../transformers/Token.transformer";

@Service()
export default class TokenControlador {
  @Inject(type => TokenServicio)
  tokenServicio: TokenServicio;
  @Inject(type => TokenTransformador)
  tokenTransformador: TokenTransformador;

  // public obtenerToken = async (res: Response) => {
  //     const token = await this.tokenServicio.obtenerToken();
  //   if (token) {

  //     const tokenTransformador = this.tokenTransformador.transformador(
  //       token);

  //       res.status(200).send({
  //         data: tokenTransformador,
  //         mensaje: "token generado exitosamente"
  //       });
  //     } else {
  //       res.status(400).send({ mensaje: "No se pudo generar el token" });
  //     }
  //   };
  // }

  public obtenerToken = async (req: Request, res: Response) => {
    const token = await this.tokenServicio.obtenerToken();
    if (token) {
      res
        .status(200)
        .send({ data: token, mensaje: "token generado exitosamente" });
    } else {
      res.status(400).send({ mensaje: "No se pudo generar el token" });
    }
  };
}
