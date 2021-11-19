import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { ICourier } from "../models/types/courier/types";
import KeyVaultServicio from "../services/keyVault/KeyVault.service";
import KeyVaultTransformador from "../transformers/KeyVault.transformer";


@Service()
export default class KeyVaultControlador {
  @Inject(type => KeyVaultServicio)
  keyVaultServicio: KeyVaultServicio;
  @Inject(type => KeyVaultTransformador)
  keyVaultTransformador: KeyVaultTransformador;


  public keyVault = async (req: Request, res: Response) => {
    const keyVaultGuardado = await this.keyVaultServicio.getVault([
      'keyChekex',
      'KeyCheqscann',
      ])
  
    if (keyVaultGuardado) {
      const response = this.keyVaultTransformador.transformador(keyVaultGuardado);
      res
        .status(200)
        .send({ mensaje: "OK", data: response });
    } else {
      res
        .status(400)
        .send({ mensaje: "No exite datos" });
    }
  }
}