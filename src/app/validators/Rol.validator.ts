import { Service } from "typedi";
import { RespuestaValidador } from "./validator.types";
import { Errors } from "../../utils/errors/errors.utils.helpers";
import Validator from "validatorjs";
import { getAsyncValidationResponse } from "../../utils/common/common.utils";
import { IRol } from "../models/types/rol/types";

@Service()
export default class RolValidador {
  async crearRol(payload: IRol) {
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

  async actualizarRol(payload: IRol) {
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

  async eliminarRol(payload: any) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        id: `required|string|max:20`
      };

      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }
}
