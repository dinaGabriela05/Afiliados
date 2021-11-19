// Custom namespace declarations and overrides
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Auth } from "./types/afiliado.types";

declare global {
  namespace Express {
    export interface Request {
      auth?: Auth;
    }
  }
}
