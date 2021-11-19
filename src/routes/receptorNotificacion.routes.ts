import { Route, Methods } from "./routes.types";
import Container from "typedi";
import ReceptorNotificacionControlador from "../app/controllers/ReceptorNotificacion.controller";

const mainRoute = "/receptorNotificacion";

export const receptorNotificacionRutas: Route[] = [
  {
    path: `${mainRoute}`,
    method: Methods.GET,
    middlewares: [],
    handler: Container.get(ReceptorNotificacionControlador).obtenerTodos
  },
  {
    path: `${mainRoute}/:id`,
    method: Methods.PUT,
    middlewares: [],
    handler: Container.get(ReceptorNotificacionControlador)
      .actualizarReceptorNotificacion
  },
  {
    path: `${mainRoute}/estadoNotificador/:afiliadoId`,
    method: Methods.PUT,
    middlewares: [],
    handler: Container.get(ReceptorNotificacionControlador)
      .eliminarReceptorNotificacion
  }
];
