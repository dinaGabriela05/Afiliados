import { Inject, Service } from "typedi";
import { OTPProvider } from "../../providers/OTP.provider";
import { NotificadorProvider } from "../../providers/Notificador.provider";
import AutenticadorValidator from "../../validators/Autenticador.validator";
import { AutenticacionProvider } from "../../providers/Autenticacion.provider";

@Service()
export default class AutenticadorServicio {
  @Inject(type => OTPProvider)
  otpProvider: OTPProvider;
  @Inject(type => AutenticacionProvider)
  autenticacionProvider: AutenticacionProvider;
  @Inject(type => NotificadorProvider)
  notificadorProvider: NotificadorProvider;
  @Inject(type => AutenticadorValidator)
  autenticadorValidador: AutenticadorValidator;

  async obtenerOtp() {
    const resultado: any = { success: false, data: {} };
    const llaveSecret = await this.otpProvider.obtenerOtpToken();
    if (llaveSecret) {
      resultado.data["secret"] = llaveSecret.secret;
      const keyOtp = await this.otpProvider.generarOtpKey(llaveSecret);
      if (keyOtp) {
        resultado.data["token"] = keyOtp.secret.token;
        resultado.success = true;
      }
    }
    return resultado;
  }

  async envioNotificacion(
    email: any,
    codigoEnvio: any,
    codigoPlantilla: any,
    parametros: any,
    parametrosAdjuntos: any,
    additionalInfo: any = {}
  ) {
    const envioNotificacion = await this.notificadorProvider.enviarNotificacion(
      {
        code: codigoEnvio,
        to: email,
        template: codigoPlantilla,
        params: parametros,
        attachmentsParams: parametrosAdjuntos,
        additionalInfo
      }
    );
    console.log(envioNotificacion);
    return envioNotificacion;
  }




  async envioOtpAfiliado( movil: any,  otp: any ) {
    const envioOtpAfiliado = await this.notificadorProvider.envioOtpAfiliado(
      {
      
        telefono: movil,
        otp: otp,
       
      }
    );
    console.log(envioOtpAfiliado);
    return envioOtpAfiliado;
  }

  

  async login(data: any) {
    await this.autenticadorValidador.login(data);
    const usuarioLogueo: any = {};
    const usuarioLogueado = await this.autenticacionProvider.login(
      data.usuario,
      data.contrasenia
    );
    if (usuarioLogueado.Codigo === 0) {
      usuarioLogueo.logueado = true;
      usuarioLogueo.data = usuarioLogueado.DatoRespuesta;
    }
    return usuarioLogueo;
  }
}
