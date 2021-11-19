import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import AutenticadorServicio from "../services/autenticador/Autenticador.service";

// registro_afiliacion
// notificacion_otp
// asignacion_rol

@Service()
export default class AutenticacionControlador {
  @Inject(type => AutenticadorServicio)
  autenticadorServicio: AutenticadorServicio;

  public obtenerOtp = async (req: Request, res: Response) => {
    try {
      const cliente = req.body;
      const obtencionOtp = await this.autenticadorServicio.obtenerOtp();
      if (obtencionOtp.success) {
        const envioNotificacion = await this.autenticadorServicio.envioNotificacion(
          cliente.email,
          "test121",
          2,
          {
            tool: {
              name: cliente.nombre,
              password: obtencionOtp.data.token
            }
          },
          [
            {
              id: 1,
              params: {}
            }
          ]
        );
        
        const envioOtpAfiliado = await this.autenticadorServicio.envioOtpAfiliado(
         cliente.movil,
         obtencionOtp.data.token
          
        );
    
        if (envioNotificacion) {
          res.status(200).send({
            resultado: {
              envio: envioNotificacion.mensaje,
              secret: obtencionOtp.data.secret,
              cod_respuesta: envioOtpAfiliado.cod_respuesta,
              des_respuesta: envioOtpAfiliado.des_respuesta,
            },
            mensaje: "Correo enviado exitosamente"
          });
        } else {
          res.status(500).send({
            resultado: {},
            mensaje: "Correo de otp no fue enviado"
          });
        }
      } else {
        res.status(500).send({
          resultado: {},
          mensaje: "No se puede obtener otp intentelo más tarde"
        });
      }
    } catch (e) {
      res.status(500).send({
        resultado: {},
        mensaje: "Ocurrió un error al obtener otp intentelo más tarde"
      });
    }
  };





  public login = async (req: Request, res: Response) => {
    const { ...usuario } = req.body;
    const usuarioLogueado = await this.autenticadorServicio.login(usuario);
    if (usuarioLogueado.logueado) {
      res.status(200).send({
        resultado: usuarioLogueado.data,
        mensaje: "Usuario logueado exitosamente"
      });
    } else {
      res.status(400).send({
        resultado: {},
        mensaje: "Credenciales incorrectas"
      });
    }
  };
}
