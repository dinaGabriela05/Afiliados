// Common utilities that are normally use in a server application
import moment from "moment";
import { Express } from "express";
import { Validator } from "validatorjs";
import { MiddlewareWrapper } from "./common.utils.types";
import { Route } from "../../routes/routes.types";
import { HTTPError } from "../errors/errors.utils";
import asyncWrapper from "async-wrapper-express-ts";
import { transformValidationErrors } from "../errors/errors.utils.helpers";
import { CronJobParameters, CronJob } from "cron";
import LogServicio from "../../app/services/log/Log.service";
import { Container } from "typedi";


const logResultado = Container.get(LogServicio);



export const getPort = () => {
  const normalizePort = (port: string) => parseInt(port, 10);
  const port = normalizePort(process.env.PORT || "5000");
  return port;
};

export const applyMiddlewares = (
  app: Express,
  middlewareWrappers: MiddlewareWrapper[]
) => {
  for (const wrapper of middlewareWrappers) {
    wrapper(app);
  }
};

export const applyRoutes = (app: Express, routes: Route[]) => {
  const version = process.env.API_VERSION;
  for (const route of routes) {
    const { method, path, middlewares, handler } = route;
    const enhancedPath = `/api/${version}${path}`;
    app[method](enhancedPath, ...middlewares, asyncWrapper(handler));
  }
};

export const applyRoutines = (routines: CronJobParameters[]) => {
  for (const routine of routines) {
    new CronJob(routine);
  }
};
let logR: any;
export const getAsyncValidationResponse = async (
  validation: Validator<any>,
  errorCode: string,
  resolve: Function,
  reject: Function

) => {
  const formatedErrors = transformValidationErrors(validation.errors);

  if (validation.errorCount > 0) {
    logResultado.crearLog({
      codigo: formatedErrors.code,
      usuario: "TEST",
      atributos: {
        "error": formatedErrors.error
      },
      fechaCreacion: new Date()
    });

    reject(new HTTPError(formatedErrors));
  }

  resolve();

};

export const validateEcuadorianCI = (document: any, coefficient: any) => {
  let sumDigitsPerCoefficient = 0;
  let value = 0;
  for (let i = 0; i < coefficient.length; i++) {
    const digit = document.charAt(i) * 1;
    value = coefficient[i] * digit;
    if (value > 9) {
      value = value - 9;
    }
    sumDigitsPerCoefficient = sumDigitsPerCoefficient + value;
  }
  let divisonModule = sumDigitsPerCoefficient % 10;
  divisonModule = divisonModule === 0 ? 10 : divisonModule;
  const result = 10 - divisonModule;
  const lastDigit = document.charAt(9) * 1;
  if (result === lastDigit) {
    return true;
  }
  return false;
};

export const validateDocument = (document: any, type: any) => {
  if (type === "CI") {
    return validateCI(document);
  } else if (type === "PASSPORT") {
    return true;
  }
  return false;
};

export const validateCI = (document: any) => {
  const CICoefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  return (
    validateProvince(document.substring(0, 2)) &&
    validateCILenght(document) &&
    validateEcuadorianCI(document, CICoefficients)
  );
};

export const validateProvince = (document: any) => {
  if (
    parseInt(document, undefined) <= 0 ||
    parseInt(document, undefined) > 24
  ) {
    return false;
  }
  return true;
};

export const validateCILenght = (document: any) => {
  if (document.length === 10) {
    return true;
  }
  return false;
};

export const toSnakeCase = (str: string) => {
  return str.replace(/[A-Z]/g, (letter: string) => `_${letter.toLowerCase()}`);
};

export const enumToString = (object: object) => {
  const arrayObject = [];
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      arrayObject.push(key);
    }
  }
  return arrayObject.toString();
};

export const isPersonalPhoneNumber = (phone: string) => {
  const regex = /(^09\d{8}$)|(^0[2-7]\d{7}$)/;
  return regex.test(phone);
};

export const isValidMoment = (date: string) => {
  return moment(date).isValid();
};

export const addslashes = (str: string) => {
  return (str + "").replace(/[\\"']/g, "\\$&").replace(/\u0000/g, "\\0");
};

export const toUnderScore = (str?: string) => {
  if (str) {
    return str
      .replace(/(?:^|\.?)([A-Z])/g, (x, y) => "_" + y.toLowerCase())
      .replace(/^_/, "");
  } else {
    return null;
  }
};





