import { Service } from "typedi";
import Validator from "validatorjs";
import { RespuestaValidador } from "./validator.types";
import { Errors } from "../../utils/errors/errors.utils.helpers";
import {
  getAsyncValidationResponse,
  enumToString
} from "../../utils/common/common.utils";
import { INotificacion } from "../models/types/notificacion/types.js";
import { ESTADOSNOTIFICACION, TIPONOTIFICACION } from "../models/Notificacion";

@Service()
export default class NotificacionValidador {
  async crearNotificacion(payload: INotificacion) {
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

  async actualizarNotificacion(payload: INotificacion) {
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

  async eliminarNotificacion(payload: any) {
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

  async guardarNotificacion(payload: INotificacion) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        nombre: "required|string|max:100",
        tipo: `required|in:${enumToString(TIPONOTIFICACION)}`,
        parametrosEnvio: "validJson",
        codigoPlantilla: "required|string|max:100",
        fechaCreacion: "required|date",
        estado: `required|in:${enumToString(ESTADOSNOTIFICACION)}`
      };

      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }
}
