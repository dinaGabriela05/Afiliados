import { Route, Methods } from "./routes.types";
import Container from "typedi";
import AfiliadoControlador from "../app/controllers/Afiliado.controller";

const mainRoute = "/afiliado";

export const afiliadoRutas: Route[] = [
  {
    path: `${mainRoute}`,
    method: Methods.GET,
    middlewares: [],
    handler: Container.get(AfiliadoControlador).obtenerTodos
  },
  {
    path: `${mainRoute}/:documento`,
    method: Methods.GET,
    middlewares: [],
    handler: Container.get(AfiliadoControlador).obtenerAfiliado
  },
  {
    path: `${mainRoute}`,
    method: Methods.POST,
    middlewares: [],
    handler: Container.get(AfiliadoControlador).precargarAfiliado
  },
  {
    path: `${mainRoute}/:afiliadoId`,
    method: Methods.POST,
    middlewares: [],
    handler: Container.get(AfiliadoControlador).crearAfiliado
  },

  {
    path: `${mainRoute}/consultarEmpresaAfiliado/:id`,
    method: Methods.GET,
    middlewares: [],
    handler: Container.get(AfiliadoControlador).consultarEmpresaAfiliada
  },

  {
    path: `${mainRoute}/actualizarEmpresaAfiliado/:id`,
    method: Methods.PUT,
    middlewares: [],
    handler: Container.get(AfiliadoControlador).actualizarEmpresaAfiliada
  },

  {
    path: `${mainRoute}/consultarNotificacionAfiliado/:id`,
    method: Methods.GET,
    middlewares: [],
    handler: Container.get(AfiliadoControlador).consultarNotificacionAfiliado
  },
  {
    path: `${mainRoute}/insertarNotificacionAfiliado/:id`,
    method: Methods.POST,
    middlewares: [],
    handler: Container.get(AfiliadoControlador).insertarNotificacionAfiliado
  },
  {
    path: `${mainRoute}/obtenerUsuariosAfiliado/:afiliadoId`,
    method: Methods.GET,
    middlewares: [],
    handler: Container.get(AfiliadoControlador).obtenerUsuariosAfiliado
  },
  {
    path: `${mainRoute}/obtenerCuentasAfiliado/cuentas`,
    method: Methods.POST,
    middlewares: [],
    handler: Container.get(AfiliadoControlador).obtenerCuentasAfiliado

  },
  {
    path: `${mainRoute}/guardarUsuario/:afiliadoId`,
    method: Methods.POST,
    middlewares: [],
    handler: Container.get(AfiliadoControlador).guardarUsuariosAfiliado
  },
  {
    path: `${mainRoute}/cuentas/:afiliadoId`,
    method: Methods.POST,
    middlewares: [],
    handler: Container.get(AfiliadoControlador).cuentasAfiliado
  },
  {
    path: `${mainRoute}/APIUSU001/:usuarioId`,
    method: Methods.GET,
    middlewares: [],
    handler: Container.get(AfiliadoControlador).afiliadoPorIdUsuario
  },
  {
    path: `${mainRoute}/eliminarCuentas/:afiliadoId`,
    method: Methods.POST,
    middlewares: [],
    handler: Container.get(AfiliadoControlador).eliminarCuentasAfiliado
  },
  {
    path: `${mainRoute}/eliminarUsuarios/:afiliadoId`,
    method: Methods.POST,
    middlewares: [],
    handler: Container.get(AfiliadoControlador).eliminarUsuariosAfiliado
  },
  {
    path: `${mainRoute}/consultaUsuario/:username`,
    method: Methods.GET,
    middlewares: [],
    handler: Container.get(AfiliadoControlador)
      .consultaUsuarioAfiliadoPorUsername
  },
  {
    path: `${mainRoute}/consultaIdentificacion/APIUSU016`,
    method: Methods.POST,
    middlewares: [],
    handler: Container.get(AfiliadoControlador).consultaUsuarioIdentificacion
  },
  {
    path: `${mainRoute}/imagenCheque/APIUSU017`,
    method: Methods.POST,
    middlewares: [],
    handler: Container.get(AfiliadoControlador).imagenCheque
  },
   {
     path: `${mainRoute}/generarCodigoQR/APIUSU018`,
     method: Methods.POST,
     middlewares: [],
     handler: Container.get(AfiliadoControlador).imagenQR
  }


];
