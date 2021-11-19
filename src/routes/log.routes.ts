import { Route, Methods } from "./routes.types";
import Container from "typedi";
import LogControlador from "../app/controllers/Log.controller";

const mainRoute = "/log";

export const logRutas: Route[] = [
  {
    path: `${mainRoute}`,
    method: Methods.GET,
    middlewares: [],
    handler: Container.get(LogControlador).obtenerTodos
  }
];
