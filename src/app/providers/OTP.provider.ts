import axios from "axios";
import { keyVault } from "../../config/validators/keyVault";
import { Service } from "typedi";

@Service()
export class OTPProvider {
  async obtenerOtpToken() {
    try {
      //const host = process.env.OTP_TOKEN_RUTA as string;

      const llave = await keyVault([
        'OTPTOKENRUTA'
      ]);
      const host = llave.OTPTOKENRUTA as string;

      const url = `${host}/obtenerOtpToken`;
      const headers = {
        "X-Road-Client": "CS/ORG/1111/TestService"
      };
      const response = await axios.get(url, {
        headers
      });
      return response.data.resultado;
    } catch (e) {
      return false;
    }
  }

  async generarOtpKey(data: any) {
    try {
     // const host = process.env.OTP_TOKEN_RUTA as string;
      const llave = await keyVault([
        'OTPTOKENRUTA'
      ]);
      const host = llave.OTPTOKENRUTA as string;

      const url = `${host}/generarOtpKey`;
      const headers = {
        "X-Road-Client": "CS/ORG/1111/TestService"
      };
      const response = await axios.post(url, data, {
        headers
      });
      return response.data.resultado;
    } catch (e) {
      return false;
    }
  }
}
