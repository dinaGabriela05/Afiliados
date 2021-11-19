import { Service } from "typedi";
import Validator from "validatorjs";
import { RespuestaValidador } from "./validator.types";
import { Errors } from "../../utils/errors/errors.utils.helpers";
import { getAsyncValidationResponse } from "../../utils/common/common.utils";

@Service()
export default class AutenticadorValidator {
  async login(payload: any) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        usuario: "required|string",
        contrasenia: "required|string"
      };
      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }
}
