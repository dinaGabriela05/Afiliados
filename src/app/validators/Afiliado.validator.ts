import { Service } from "typedi";
import Validator from "validatorjs";
import { RespuestaValidador } from "./validator.types";
import { Errors } from "../../utils/errors/errors.utils.helpers";
import {
  getAsyncValidationResponse,
  enumToString
} from "../../utils/common/common.utils";
import { IAfiliado } from "../models/types/afiliado/types.js";
import {
  TIPODOCUMENTO,
  ESTADOSAFILIADO,
  TIPOAFILIADO
} from "../models/Afiliado";

@Service()
export default class AfiliadoValidador {
  async precargarAfiliadoTipo(payload: IAfiliado) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        tipo: `required|in:${enumToString(TIPOAFILIADO)}`
      };
      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }

  async precargarAfiliadoPersona(payload: IAfiliado) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        "identificacion.tipoDocumento": `required|in:${enumToString(
          TIPODOCUMENTO
        )}`,
        "representanteLegal.email": "required|email|max:100",
        "identificacion.documento": "required|string|max:100",
        nombre: "required|string|max:250",
        apellido: "required|string|max:250",
        estado: `required|in:${enumToString(ESTADOSAFILIADO)}`
      };

      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }

  async precargarAfiliadoPersonaRUC(payload: IAfiliado) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        "identificacion.tipoDocumento": `required|in:${enumToString(
          TIPODOCUMENTO
        )}`,
        "representanteLegal.email": "required|email|max:100",
        razonSocial: "required|string|max:500",
        "identificacion.documento": "required|string|max:100",
        nombre: "required|string|max:250",
        apellido: "required|string|max:250",
        estado: `required|in:${enumToString(ESTADOSAFILIADO)}`
      };

      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }

  async precargarAfiliadoJuridico(payload: IAfiliado) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        "identificacion.tipoDocumento": `required|in:${enumToString(
          TIPODOCUMENTO
        )}`,
        "identificacion.documento": "required|string|max:100",
        "representanteLegal.tipoDocumento": `required|in:${enumToString(
          TIPODOCUMENTO
        )}`,
        "representanteLegal.nombre": "required|string|max:400",
        razonSocial: "required|string|max:500",
        "representanteLegal.documento": "required|string|max:100",
        "representanteLegal.email": "required|email|max:100",
        estado: `required|in:${enumToString(ESTADOSAFILIADO)}`
      };

      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }

  async crearAfiliadoJuridico(payload: IAfiliado) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        nombreComercial: "required|string|max:100",
        "identificacion.tipoDocumento": `required|in:${enumToString(
          TIPODOCUMENTO
        )}`,
        "identificacion.documento": "required|string|max:20",
        "identificacion.fechaVencimiento": "required|date",
        tipo: "required|string|max:100",
        notificadores: "required|array",
        "notificadores.*.nombre": "required|string|max:100",
        "notificadores.*.email": "required|email",
        "notificadores.*.notificacion": "required|array",
        cuentas: "array",
        "cuentas.*.banco": "required|string|max:100",
        "cuentas.*.numero": "required|string",
        "cuentas.*.codigoBanco": "required|string",
        "cuentas.*.moneda": "required|string",
        "cuentas.*.tipo": "required|string",
        usuarios: "required|array",
        "usuarios.*.nombre": "required|string|max:100",
        "usuarios.*.apellido": "required|string",
        "usuarios.*.username": "required|string",
        "usuarios.*.cargo": "required|string",
        "usuarios.*.identificacion": "required|string",
        "usuarios.*.email": "required|email",
        "usuarios.*.telefono": "required|string",
        "usuarios.*.rol": "required|array"
      };

      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }

  async crearAfiliadoPersonaRuc(payload: IAfiliado) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        nombreComercial: "required|string|max:100",
        "identificacion.tipoDocumento": `required|in:${enumToString(
          TIPODOCUMENTO
        )}`,
        "identificacion.documento": "required|string|max:20",
        "identificacion.fechaVencimiento": "required|date",
        tipo: "required|string|max:100",
        notificadores: "required|array",
        "notificadores.*.nombre": "required|string|max:100",
        "notificadores.*.email": "required|email",
        "notificadores.*.notificacion": "required|array",
        cuentas: "array",
        "cuentas.*.banco": "required|string|max:100",
        "cuentas.*.numero": "required|string",
        "cuentas.*.codigoBanco": "required|string",
        "cuentas.*.moneda": "required|string",
        "cuentas.*.tipo": "required|string",
        usuarios: "required|array",
        "usuarios.*.nombre": "required|string|max:100",
        "usuarios.*.apellido": "required|string",
        "usuarios.*.username": "required|string",
        "usuarios.*.identificacion": "required|string",
        "usuarios.*.email": "required|email",
        "usuarios.*.telefono": "required|string",
        "usuarios.*.rol": "required|array"
      };

      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }

  async crearAfiliadoPersona(payload: IAfiliado) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        "identificacion.tipoDocumento": `required|in:${enumToString(
          TIPODOCUMENTO
        )}`,
        "identificacion.documento": "required|string|max:20",
        "identificacion.fechaVencimiento": "required|date",
        tipo: "required|string|max:100",
        notificadores: "array",
        "notificadores.*.nombre": "required|string|max:100",
        "notificadores.*.email": "required|email",
        "notificadores.*.notificacion": "array",
        cuentas: "array",
        "cuentas.*.banco": "required|string|max:100",
        "cuentas.*.numero": "required|string",
        "cuentas.*.codigoBanco": "required|string",
        "cuentas.*.moneda": "required|string",
        "cuentas.*.tipo": "required|string",
        usuarios: "required|array",
        "usuarios.*.nombre": "required|string|max:100",
        "usuarios.*.apellido": "required|string",
        "usuarios.*.username": "required|string",
        "usuarios.*.identificacion": "required|string",
        "usuarios.*.email": "required|email",
        "usuarios.*.telefono": "required|string",
        "usuarios.*.rol": "array"
      };

      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }

  async actualizarAfiliado(payload: IAfiliado) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        // razonSocial: "required|string|max:100",
        // "identificacion.tipoDocumento": `required|in:${enumToString(
        //   TIPODOCUMENTO
        // )}`,
        // "identificacion.documento": "required|string|max:20",
        // "identificacion.fechaVencimiento": "required|date",
        // tipo: "required|string|max:100",
        // paso: "required|string|max:1",
        // estado: `required|in:${enumToString(ESTADOSAFILIADO)}`,
        // notificaciones: 'required|array|isEmpty'
      };

      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }

  async eliminarAfiliado(payload: any) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        id: "required|string|max:20"
      };

      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }

  async actualizarEmpresa(payload: IAfiliado) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        direccion: "required|array",
        "direccion.*.callePrincipal": "required|string|max:100",
        contacto: "required|array",
        "contacto.*.numContacto": "required|string|max:10",
        ciudad: "required|string|max:500"
      };

      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }

  async insertarNotificacionAfiliado(payload: IAfiliado) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        notificadores: "required|array",
        "notificadores.*.nombre": "required|string|max:100",
        "notificadores.*.email": "required|email",
        "notificadores.*.notificacion": "required|array"
      };

      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }

  async actualizarUsuariosAfiliado(payload: IAfiliado) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        nombre: "required|string|max:100",
        apellido: "required|string",
        username: "required|string",
        identificacion: "required|string",
        email: "required|email",
        telefono: "required|string",
        rol: "required|array"
      };

      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }

  async eliminarCuentasAfiliado(payload: any) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        _id: "required|string"
      };

      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }

  async eliminarUsuariosAfiliado(payload: any) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        _id: "required|string"
      };
      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }

  async cuentaAfiliado(payload: IAfiliado) {
    return new Promise<RespuestaValidador>((resolve, reject) => {
      const codigoError = Errors.deleteEntity.code;
      const reglas = {
        banco: "required|string|max:100",
        numero: "required|string",
        codigoBanco: "required|string",
        moneda: "required|string",
        tipo: "required|string"
      };

      const validacion = new Validator(payload, reglas);
      const sendResponse = () =>
        getAsyncValidationResponse(validacion, codigoError, resolve, reject);
      validacion.checkAsync(sendResponse, sendResponse);
    });
  }
}
