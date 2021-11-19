import { Route, Methods } from "./routes.types";
import Container from "typedi";
import TokenControlador from "../app/controllers/Token.controller";

const mainRoute = "/token";

export const tokenRutas: Route[] = [
  {
    path: `${mainRoute}`,
    method: Methods.GET,
    middlewares: [],
    handler: Container.get(TokenControlador).obtenerToken
  }
];
