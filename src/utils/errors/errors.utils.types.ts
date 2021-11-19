// Types for errors utils

export interface IHTTPError extends Error {
  message: string;
  name: string;
  status: number;
  body: {
    error: string;
    code: string;
    message?: string;
  };
}

export interface NotFoundError extends IHTTPError {
  status: 404;
  body: {
    error: string;
    code: string;
    message: string;
  };
}

export interface ClientError extends IHTTPError {
  body: {
    error: string;
    code: string;
    message?: string;
    devMessage?: string;
  };
}

export interface ServerError extends IHTTPError {
  status: 500;
  body: {
    error: string;
    code: string;
    message?: never;
  };
}
