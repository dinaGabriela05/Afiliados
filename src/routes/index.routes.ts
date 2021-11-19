import { commonRoutes } from "./common.routes";
import { afiliadoRutas } from "./afiliado.routes";
import { autenticadorRutas } from "./autenticador.routes";
import { catalogoRutas } from "./catalogo.routes";
import { notificacionRutas } from "./notificacion.routes";
import { logRutas } from "./log.routes";
import { otpLogRutas } from "./otpLog.routes";
import { receptorNotificacionRutas } from "./receptorNotificacion.routes";
import { rolRutas } from "./rol.routes";
import { usuarioRutas } from "./usuario.routes";
import { tokenRutas } from "./token.routes";
import { courierRutas } from "./courier.routes";
import { keyVaultRutas } from "./keyVault.routes";

export default [
  ...commonRoutes,
  ...afiliadoRutas,
  ...autenticadorRutas,
  ...catalogoRutas,
  ...notificacionRutas,
  ...logRutas,
  ...otpLogRutas,
  ...receptorNotificacionRutas,
  ...rolRutas,
  ...usuarioRutas,
  ...tokenRutas,
  ...courierRutas,
  ...keyVaultRutas
];
