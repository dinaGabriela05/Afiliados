import { Route, Methods } from "./routes.types";
import Container from "typedi";
import OtpLogControlador from "../app/controllers/OtpLog.controller";

const mainRoute = "/log";

export const otpLogRutas: Route[] = [
  {
    path: `${mainRoute}`,
    method: Methods.GET,
    middlewares: [],
    handler: Container.get(OtpLogControlador).obtenerTodos
  }
];
