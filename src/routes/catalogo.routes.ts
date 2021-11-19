import { Route, Methods } from "./routes.types";
import Container from "typedi";
import CatalogoControlador from "../app/controllers/Catalogo.controller";

const mainRoute = "/catalogo";

export const catalogoRutas: Route[] = [
  {
    path: `${mainRoute}`,
    method: Methods.GET,
    middlewares: [],
    handler: Container.get(CatalogoControlador).obtenerTodos
  },
  {
    path: `${mainRoute}`,
    method: Methods.POST,
    middlewares: [],
    handler: Container.get(CatalogoControlador).crearCatalogo
  },
  {
    path: `${mainRoute}/:tipo`,
    method: Methods.GET,
    middlewares: [],
    handler: Container.get(CatalogoControlador).obtenerCatalogo
  }
];
