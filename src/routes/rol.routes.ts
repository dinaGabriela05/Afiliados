import { Route, Methods } from "./routes.types";
import Container from "typedi";
import RolControlador from "../app/controllers/Rol.controller";

const mainRoute = "/rol";

export const rolRutas: Route[] = [
  {
    path: `${mainRoute}`,
    method: Methods.GET,
    middlewares: [],
    handler: Container.get(RolControlador).obtenerTodos
  },
  {
    path: `${mainRoute}`,
    method: Methods.POST,
    middlewares: [],
    handler: Container.get(RolControlador).crearRol
  },
  {
    path: `${mainRoute}/catalogo`,
    method: Methods.GET,
    middlewares: [],
    handler: Container.get(RolControlador).obtenerCatalogoRol
  }
];
