import { Inject, Service } from "typedi";
import { TokenProvider } from "../../providers/Token.provider";
import jwt from "jsonwebtoken";
@Service()
export default class TokenServicio {
  @Inject(type => TokenProvider)
  tokenProvider: TokenProvider;

  async obtenerToken() {
    const data = "";
    let tokeGenerado: any;
    const datosResponse = await this.tokenProvider.obtenerClaves(data);
    if (datosResponse) {
      const fecha = new Date();
      const timestamp = fecha.getTime() + 180000;
      const iat = Math.floor(timestamp);
      const unixTimestamp = Math.floor(new Date(timestamp).getTime() / 1000);
      const payload = {
        iat: iat,
        iss: datosResponse.key,
        exp: unixTimestamp
      };
      const secret = datosResponse.secret;
      const token = jwt.sign(payload, secret, {
        algorithm: "HS256"
      });

      tokeGenerado = token;
    }
    return tokeGenerado;
  }
}
