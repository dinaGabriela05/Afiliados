// Common routes found in most server applications
import { Route, Methods } from "./routes.types";
import Container from "typedi";
import CommonController from "../app/controllers/Common.controller";

export const commonRoutes: Route[] = [
  {
    path: "/health",
    method: Methods.GET,
    middlewares: [],
    handler: Container.get(CommonController).health
  }
];
