import { Service } from "typedi";
import Validator from "validatorjs";
import { RespuestaValidador } from "./validator.types";
import { Errors } from "../../utils/errors/errors.utils.helpers";
import {
  getAsyncValidationResponse,
  enumToString
} from "../../utils/common/common.utils";
import { ICatalogo } from "../models/types/catalogo/types.js";
import { ESTADOSCATALOGO } from "../models/Catalogo";

@Service()
export default class CatalogoValidador {
  async crearCatalogo(payload: ICatalogo) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        codigo: `required|string|max:500`,
        nombre: `required|string|max:500`,
        infoAdicional: `validJson`,
        tipo: `required|string|max:500`,
        estado: `required|in:${enumToString(ESTADOSCATALOGO)}`,
        fechaCreacion: `required|date`
      };

      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }

  async actualizarCatalogo(payload: ICatalogo) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        codigo: `string|max:500`,
        nombre: `string|max:500`,
        infoAdicional: `validJson`,
        tipo: `string|max:500`,
        estado: `in:${enumToString(ESTADOSCATALOGO)}`,
        fechaCreacion: `date`
      };

      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }

  async eliminarCatalogo(payload: any) {
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
