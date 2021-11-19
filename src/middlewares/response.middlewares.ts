import {
  handle404Error,
  handleClientError,
  handleServerError
} from "./errors/errors.middlewares";

export default [handle404Error, handleClientError, handleServerError];
