// Utils to handle errors
import { NotFoundError, ServerError } from "./errors.utils.types";
import { Errors } from "./errors.utils.helpers";
import { Methods } from "../../routes/routes.types";

export class HTTPError extends Error {
  readonly name: string;
  readonly body: any;

  constructor(message: object | string) {
    if (message instanceof Object) {
      super(JSON.stringify(message));
    } else {
      super(message);
    }
    this.name = this.constructor.name;
    this.body = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const notFoundError = (method: Methods, url: string): NotFoundError => {
  const data = Errors.notFound;
  return {
    status: 404,
    body: {
      error: data.error,
      code: data.code,
      message: `Route ${method} ${url} not found.`
    },
    name: "",
    message: ""
  };
};

export const serverError = (): ServerError => {
  const data = Errors.server;
  return {
    status: 500,
    body: { error: data.error, code: data.code },
    name: "",
    message: ""
  };
};

export class AxiosError extends Error {
  public statusCode: number;
  public responseData: string | object;

  constructor(message: any) {
    super(message);
    if (message.response && message.response.status && message.response.data) {
      this.statusCode = message.response.status;
      this.responseData = message.response.data;
    } else {
      this.statusCode = 500;
      this.responseData = message;
    }
  }
}
