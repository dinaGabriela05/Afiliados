import { Route, Methods } from "./routes.types";
import Container from "typedi";
import UsuarioControlador from "../app/controllers/Usuario.controller";

const mainRoute = "/usuario";

export const usuarioRutas: Route[] = [
  {
    path: `${mainRoute}`,
    method: Methods.GET,
    middlewares: [],
    handler: Container.get(UsuarioControlador).obtenerTodos
  },
  {
    path: `${mainRoute}/:usuarioId`,
    method: Methods.GET,
    middlewares: [],
    handler: Container.get(UsuarioControlador).consultaUsuario
  },
  {
    path: `${mainRoute}/:usuarioId`,
    method: Methods.PUT,
    middlewares: [],
    handler: Container.get(UsuarioControlador).actualizarUsuario
  },
  {
    path: `${mainRoute}/APICON001/:username`,
    method: Methods.PUT,
    middlewares: [],
    handler: Container.get(UsuarioControlador).actualizarConexionUsuario
  },
  {
    path: `${mainRoute}/APIVAL001/:username`,
    method: Methods.PUT,
    middlewares: [],
    handler: Container.get(UsuarioControlador)
      .actualizarValidacionScanReferenceUsuario
  },
  {
    path: `${mainRoute}/APIVAL002/:username`,
    method: Methods.PUT,
    middlewares: [],
    handler: Container.get(UsuarioControlador).actualizarValidacionFacialUsuario
  },
  {
    path: `${mainRoute}/consultaUsuarioPorNombre/:username`,
    method: Methods.GET,
    middlewares: [],
    handler: Container.get(UsuarioControlador).consultaUsuarioPorNombre
  },
  {
    path: `${mainRoute}/APICON002/:username`,
    method: Methods.GET,
    middlewares: [],
    handler: Container.get(UsuarioControlador)
      .consultaConexionUsuarioPorUsername
  }
];
