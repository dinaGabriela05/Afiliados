import { Service } from "typedi";
import { RespuestaValidador } from "./validator.types";
import { Errors } from "../../utils/errors/errors.utils.helpers";
import Validator from "validatorjs";
import { getAsyncValidationResponse } from "../../utils/common/common.utils";
import { ISesion } from "../models/types/sesion/types";

@Service()
export default class SesionValidador {
  async crearLog(payload: ISesion) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        // codigo: `required|string|max:500`,
        // nombre: `required|string|max:500`,
        // infoAdicional: `validJson`,
        // tipo: `required|string|max:500`,
        // fechaCreacion: `required|date`
      };

      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }
}
