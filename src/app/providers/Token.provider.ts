import axios from "axios";
import { keyVault } from "../../config/validators/keyVault";
import { Service } from "typedi";

@Service()
export class TokenProvider {
  async obtenerClaves(data: any) {
    try {
     // const host = process.env.AUTENTIFICAR_CLAVES as string;
      const llave = await keyVault([
        'AUTENTIFICARCLAVES'
      ]);
      const host = llave.AUTENTIFICARCLAVES as string;

      const url = `${host}/jwt`;
      const headers = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
      const response = await axios.post(url, data, {
        headers
      });
      return response.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
