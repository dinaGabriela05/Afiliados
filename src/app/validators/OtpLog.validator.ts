import { Service } from "typedi";
import { RespuestaValidador } from "./validator.types";
import { Errors } from "../../utils/errors/errors.utils.helpers";
import Validator from "validatorjs";
import { getAsyncValidationResponse } from "../../utils/common/common.utils";
import { IOtpLog } from "../models/types/otpLog/types";

@Service()
export default class OtpLogValidador {
  async crearOtpLog(payload: IOtpLog) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        // nombre: "required|string|max:100",
        // tipo: `required|in:${enumToString(TIPONOTIFICACION)}`,
        // parametrosEnvio: "validJson",
        // codigoPlantilla: "required|string|max:100",
        // fechaCreacion: "required|date",
        // estado: `required|in:${enumToString(ESTADOSNOTIFICACION)}`
      };

      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }
}
