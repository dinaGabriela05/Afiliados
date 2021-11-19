import { Service } from "typedi";
import Validator from "validatorjs";
import { RespuestaValidador } from "./validator.types";
import { Errors } from "../../utils/errors/errors.utils.helpers";
import {
  getAsyncValidationResponse,
  enumToString
} from "../../utils/common/common.utils";
import { ICourier } from "../models/types/courier/types";
import { ICatalogo } from "../models/types/catalogo/types";


@Service()
export default class CatalogoValidador {
  async crearCourier(payload: ICourier) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        codigoBeneficiario: `required|string|max:500`,
        nombreBeneficiario: `required|string|max:500`,
        correoBeneficiario: `required|string|max:500`,
        codigoAplicacion: `required|string|max:500`,
        fechaCreacion: `required|date`
      };

      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }

  async eliminacionCourierBeneficiario(payload: ICourier) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        estado: `required|string|max:500`,
        codigoAplicacion: `required|string|max:500`,
        fechaEliminacion: `required|date`
      };

      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }

  async actualizarCourierBeneficiario(payload: ICourier) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        estado: `required|string|max:500`,
        codigoAplicacion: `required|string|max:500`,
        fechaActualizacion: `required|date`
      };

      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }
  
  async actualizarPagoRPSVentanilla(payload: ICourier) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        estado: `required|string|max:500`,
        fechaActualizacion: `required|date`
      };

      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }
}
