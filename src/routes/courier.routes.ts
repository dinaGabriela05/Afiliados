import { Route, Methods } from "./routes.types";
import Container from "typedi";
import CourierControlador from "../app/controllers/Courier.controller";

const mainRoute = "/courier";

export const courierRutas: Route[] = [
  {
    path: `${mainRoute}`,
    method: Methods.GET,
    middlewares: [],
    handler: Container.get(CourierControlador).obtenerTodos
  },
  {
    path: `${mainRoute}/APICOURIER001`,
    method: Methods.POST,
    middlewares: [],
    handler: Container.get(CourierControlador).crearCourier
  },

  {
    path: `${mainRoute}/APICOURIER002`,
    method: Methods.POST,
    middlewares: [],
    handler: Container.get(CourierControlador).obtenerCourier
  },

  {
    path: `${mainRoute}/APICOURIER003`,
    method: Methods.POST,
    middlewares: [],
    handler: Container.get(CourierControlador).eliminarBeneficiarioCourier
  },

  {
    path: `${mainRoute}/APICOURIER004`,
    method: Methods.POST,
    middlewares: [],
    handler: Container.get(CourierControlador).actualizarBeneficiarioCourier
  },


  {
    path: `${mainRoute}/APICOURIER005`,
    method: Methods.POST,
    middlewares: [],
    handler: Container.get(CourierControlador).consultaCourierPorFecha
  },

    {
        path: `${mainRoute}/APICOURIER006`,
        method: Methods.POST,
        middlewares: [],
        handler: Container.get(CourierControlador).obtenerInfoRPS
    },
    {
      path: `${mainRoute}/APICOURIER007`,
      method: Methods.POST,
      middlewares: [],
      handler: Container.get(CourierControlador).actualizarPagoRPSVentanilla
    },
    {
      path: `${mainRoute}/APICOURIER008`,
      method: Methods.POST,
      middlewares: [],
      handler: Container.get(CourierControlador).actualizarBeneficiarioCourierEnvioCorreo
    },
    {
      path: `${mainRoute}/APICOURIER009`,
      method: Methods.POST,
      middlewares: [],
      handler: Container.get(CourierControlador).consultaMovimientoRecientes
    },

    {
      path: `${mainRoute}/APICOURIER010`,
      method: Methods.POST,
      middlewares: [],
      handler: Container.get(CourierControlador).validarCheque
    },
    
    {
      path: `${mainRoute}/APICOURIER011`,
      method: Methods.POST,
      middlewares: [],
      handler: Container.get(CourierControlador).consultaRecibidosEnviados
    },

    {
      path: `${mainRoute}/APICOURIER012`,
      method: Methods.POST,
      middlewares: [],
      handler: Container.get(CourierControlador).enviocorreoPrecargaEnvio
    }


];


