import { Service } from "typedi";
import { RespuestaValidador } from "./validator.types";
import { Errors } from "../../utils/errors/errors.utils.helpers";
import Validator from "validatorjs";
import { getAsyncValidationResponse } from "../../utils/common/common.utils";
import { IReceptorNotificacion } from "../models/types/receptorNotificacion/types";

@Service()
export default class ReceptorNotificacionValidador {
  async crearReceptorNotificacion(payload: IReceptorNotificacion) {
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

  async actualizarReceptorNotificacion(payload: IReceptorNotificacion) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        nombre: "required|string|max:100",
        email: "required|email",
        notificacion: "required|array"
      };

      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }

  async eliminarReceptorNotificacion(payload: any) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        id: `required|string|max:50`
      };

      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }
}
