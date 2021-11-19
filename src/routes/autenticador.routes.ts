import { Route, Methods } from "./routes.types";
import Container from "typedi";
import AutenticacionControlador from "../app/controllers/Autenticador.controller";

const mainRoute = "/autenticador";

export const autenticadorRutas: Route[] = [
  {
    path: `${mainRoute}`,
    method: Methods.POST,
    middlewares: [],
    handler: Container.get(AutenticacionControlador).obtenerOtp
  },
  {
    path: `${mainRoute}/login`,
    method: Methods.POST,
    middlewares: [],
    handler: Container.get(AutenticacionControlador).login
  }
];
