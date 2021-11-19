
import { Route, Methods } from "./routes.types";
import Container from "typedi";
import KeyVaultControlador from "../app/controllers/KeyVault.controller";

const mainRoute = "/keyVault";

export const keyVaultRutas: Route[] = [
  {

    path: `${mainRoute}/APIKEYVAULT001`,
    method: Methods.GET,
    middlewares: [],
    handler: Container.get(KeyVaultControlador).keyVault
  }
]