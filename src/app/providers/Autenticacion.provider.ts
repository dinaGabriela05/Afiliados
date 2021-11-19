import axios from "axios";
import { Service } from "typedi";

@Service()
export class AutenticacionProvider {
  async login(usuario: string, contrasenia: string) {
    try {
      const host = process.env.AUTENTICACION_RUTA as string;
      const url = `${host}/AutenticarUsuario`;
      const headers = {};
      const response = await axios.post(
        url,
        { Usuario: usuario, Contrasena: contrasenia },
        {
          headers
        }
      );
      return response.data;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
