import { Route, Methods } from "./routes.types";
import Container from "typedi";
import NotificacionControlador from "../app/controllers/Notificacion.controller";

const mainRoute = "/notificacion";

export const notificacionRutas: Route[] = [
  {
    path: `${mainRoute}`,
    method: Methods.GET,
    middlewares: [],
    handler: Container.get(NotificacionControlador).obtenerTodos
  },
  {
    path: `${mainRoute}`,
    method: Methods.POST,
    middlewares: [],
    handler: Container.get(NotificacionControlador).crearNotificacion
  },
  {
    path: `${mainRoute}/catalogo`,
    method: Methods.GET,
    middlewares: [],
    handler: Container.get(NotificacionControlador).obtenerCatalogoNotificacion
  }
];
