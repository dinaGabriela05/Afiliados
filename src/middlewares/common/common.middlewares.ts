// Common middlewares that are normally used in most server applications
import { Express } from "express";
import cors from "cors";
import parser from "body-parser";
import compression from "compression";
import helmet from "helmet";
import { Router } from "express";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "../../docs/swagger/swagger.json";

import json from "morgan-json";
import morgan from "morgan";
import { morganOption } from "../../utils/logs/logs.utils";

export const handleAPIDocs = (router: Router) => {
  router.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export const handleHelmet = (app: Express) => {
  app.use(helmet());
};

export const handleCors = (app: Express) => {
  app.use(cors());
};

export const handleBodyRequestParsing = (app: Express) => {
  app.use(parser.urlencoded({ extended: true }));
  app.use(parser.json({ limit: "5mb" }));
};

export const handleCompression = (app: Express) => {
  const env = app.get("env");
  if (env === "production") {
    app.use(compression());
  }
};

export const handleMorgan = (app: Express) => {
  const format = json(
    {
      date: ":date[clf]",
      "remote-addr": ":remote-addr",
      "remote-user": ":remote-user",
      "http-version": ":http-version",
      "content-length": ":res[content-length]",
      "user-agent": ":user-agent",
      referrer: ":referrer",
      method: ":method",
      url: ":url",
      status: ":status"
    },
    { stringify: true }
  );
  app.use(morgan(format, morganOption));
};
