import { Service } from "typedi";

@Service()
export default class OtpLogTransformador {
  public transformador = (otpLog: any) => {
    return {
      id: otpLog.id,
      codigo: otpLog.codigo,
      usado: otpLog.usado,
      fechaExpiracion: otpLog.fechaExpiracion
    };
  };
}
