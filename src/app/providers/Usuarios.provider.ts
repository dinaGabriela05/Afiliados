import axios from "axios";
import { keyVault } from "../../config/validators/keyVault";
import { Service } from "typedi";

@Service()
export class UsuariosProvider {
  async crearUsuario(data: any) {
    try {
     // const host = process.env.USUARIOS_RUTA as string;

      const llave = await keyVault([
        'USUARIOSRUTA'
      ]);
      const host = llave.USUARIOSRUTA as string;
    
      const url = `${host}/APIUSU004`;
      const headers = {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmllbmRseU5hbWUiOiJDaGVxU2Nhbi5SREMiLCJjb2RlIjoidGVzdDEyMSIsImtleSI6InNlY3JldCIsInVzZXIiOiJDaGVxU2Nhbi5SRENAcGxhbm1hcmtldC5uZXQiLCJwYXNzd29yZCI6IlBvcnRhbFJEQzIwMjEiLCJzbXRwU2VydmVyIjoic210cC5vZmZpY2UzNjUuY29tIiwic210cFBvcnQiOjU4Nywic210cFNlY3VyZSI6ZmFsc2UsInVwZGF0ZWRBdCI6IjIwMjEtMDQtMjJUMjI6NTQ6MDYuOTM2WiIsImRlbGV0ZWRBdCI6bnVsbCwiaWQiOjYsImNyZWF0ZWRBdCI6IjIwMjEtMDQtMjJUMjI6NTQ6MDYuOTM2WiIsImlhdCI6MTYxOTExNDA0NX0.XGm09VQlLziF47dp3iIkMvczOLesbQI5pU6rOM2oF5A"
      };
      const response = await axios.post(url, data, {
        headers
      });
      return response.data;
    } catch (e) {
      console.log(e);
      return {
        status_code: e.response.status,
        http_mensaje: e.response.data.message
      };
    }
  }
}
