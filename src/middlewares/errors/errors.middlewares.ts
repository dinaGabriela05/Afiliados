// Error handling middlewares
import { Express, Request, Response, NextFunction } from "express";

import {
  serverError,
  notFoundError,
  HTTPError
} from "../../utils/errors/errors.utils";
import { Methods } from "../../routes/routes.types";
import { errorLogger } from "../../utils/logs/logs.utils";
import { keyVault } from "../../config/validators/keyVault";

export const handle404Error = (app: Express) => {
  app.use((req, res, next) => {
    const data = notFoundError(req.method as Methods, req.url);
    return res.status(data.status).send(data.body);
  });
};

export const handleClientError = (app: Express) => {
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    errorLogger.error("Client Error", {
      name: error.name,
      message: error.message,
      url: req.url,
      method: req.method,
      params: req.params,
      query: req.query,
      body: req.body
    });
    if (error instanceof HTTPError) {
      res.status(400).send(error.body);
    } else {
      next(error);
    }
  });
};

export const handleServerError = (app: Express) => {
  app.use(async (error: Error, req: Request, res: Response, next: NextFunction) => {
    const data = serverError();
    errorLogger.error("Client Error", {
      name: error.name,
      message: error.message,
      url: req.url,
      method: req.method,
      params: req.params,
      query: req.query,
      body: req.body
    });

    
    if (process.env.NODE_ENV === "production") {
      return res.status(data.status).send(data.body);
    }
    return res.status(500).send({ ...data.body, stack: error.stack });
  });
};
