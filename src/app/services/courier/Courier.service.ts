import Courier from "../../models/Courier";
import CourierValidador from "../../validators/Courier.validator";
import { Inject, Service } from "typedi";
import CourierRepositorio from "../../repositories/Courier.repository";
import { NotificadorProvider } from "../../providers/Notificador.provider";
import { keyVault } from "../../../config/validators/keyVault";

@Service()
export default class CourierServicio {
  @Inject(type => CourierRepositorio)
  courierRepositorio: CourierRepositorio;
  @Inject(type => CourierValidador)
  courierValidador: CourierValidador;
  @Inject(type => NotificadorProvider)
  notificadorProvider: NotificadorProvider;

  async obtenerTodos(_page: any, _limit: any, filter: any) {
    const courier = await this.courierRepositorio.obtenerTodos(
      filter,
      parseInt(_page),
      parseInt(_limit)
    );
    return courier;
  }

  async prueba() {
    const courier = "a";
    return courier;
  }


  async crearCourier(courier: any) {

    var crypto = require('crypto-js/crypto-js.js');
    // var AESKEY = process.env.AESKEY as string;
    const llave = await keyVault([
      'KeyChekex'
    ]);
    var AESKEY = llave.KeyChekex as string;

    courier = JSON.parse(crypto.AES.decrypt(courier.datos, AESKEY).toString(crypto.enc.Utf8));
    courier.nombreBanco = "Banco Pichincha";
    await this.courierValidador.crearCourier(courier);
    const nuevoCourier = new Courier(courier);
    let courierGuardado: any;
    const courierUnico = await this.courierRepositorio.obtenerCourierPorCodigo(
      courier.codigoBeneficiario
    );
    if (!courierUnico) {
      courierGuardado = await nuevoCourier.save();
    }
    return courierGuardado;
  }




  async obtenerCourierPorEstadoIdentificacion(courierBody: any) {

    var crypto = require('crypto-js/crypto-js.js');
    // var AESKEY = process.env.AESKEY as string;
    const llave = await keyVault([
      'KeyChekex'
    ]);
    var AESKEY = llave.KeyChekex as string;

    courierBody = JSON.parse(crypto.AES.decrypt(courierBody.datos, AESKEY).toString(crypto.enc.Utf8));

    const courier = await this.courierRepositorio.obtenerCourierPorEstadoTipo(
      courierBody.estado,
      courierBody.identificacionBeneficiario,
    );
    return courier;
  }



  async consultaMovimientoRecientes(courierBody: any) {

    var crypto = require('crypto-js/crypto-js.js');
    // var AESKEY = process.env.AESKEY as string;

    const llave = await keyVault([
      'KeyChekex'
    ]);
    var AESKEY = llave.KeyChekex as string;

    courierBody = JSON.parse(crypto.AES.decrypt(courierBody.datos, AESKEY).toString(crypto.enc.Utf8));
    var courier = await this.courierRepositorio.consultaMovimientoRecientes(
      courierBody.codigoAplicacion,
      courierBody.identificacion

    );

    



    return courier;
  }



  


  async consultaRecibidosEnviados(body: any) {

    var crypto = require('crypto-js/crypto-js.js');
    // var AESKEY = process.env.AESKEY as string;
    const llave = await keyVault([
      'KeyChekex'
    ]);
    var AESKEY = llave.KeyChekex as string;
    var body = JSON.parse(crypto.AES.decrypt(body.datos, AESKEY).toString(crypto.enc.Utf8));

    const courier = await this.courierRepositorio.obtenerTodos(
      body.filter,
      parseInt(body.page),
      parseInt(body.limit)
    );
    return courier;
  }


  async validarCheque(courierBody: any) {

    try {
      var crypto = require('crypto-js/crypto-js.js');
      //var AESKEY = process.env.AESKEY as string;
      const llave = await keyVault([
        'KeyChekex'
      ]);
      var AESKEY = llave.KeyChekex as string;

      var datosCheque = JSON.parse(crypto.AES.decrypt(courierBody.datos, AESKEY).toString(crypto.enc.Utf8));
      const validarCheque = await this.courierRepositorio.validarCheque(
        datosCheque.numeroCuenta,
        datosCheque.numeroCheque

      );
      if (validarCheque.length == 0) {

        var mensaje = "No existe"
        return mensaje
      } else {

        var mensaje = "Existente"
      }
      return mensaje;
    } catch (e) {
      return mensaje = "ERROR"
    }
  }





  async obtenerCourierPorFechaEstado(courierBody: any) {

    var crypto = require('crypto-js/crypto-js.js');
    //var AESKEY = process.env.AESKEY as string;
    const llave = await keyVault([
      'KeyChekex'
    ]);
    var AESKEY = llave.KeyChekex as string;
    courierBody = JSON.parse(crypto.AES.decrypt(courierBody.datos, AESKEY).toString(crypto.enc.Utf8));

    const courierEstado = await this.courierRepositorio.obtenerCourierPorEstadoFecha(
      courierBody.estado,
      courierBody.identificacion,
      courierBody.fechaInicio,
      courierBody.fechaFin,
      courierBody.tipoConsulta,
      courierBody.codigoAplicacion,

    );
    return courierEstado;
  }



  async obtenerInfoRPS(courierBody: any) {
    var crypto = require('crypto-js/crypto-js.js');
    //var AESKEY = process.env.AESKEY as string;
    const llave = await keyVault([
      'KeyChekex'
    ]);
    var AESKEY = llave.KeyChekex as string;
    courierBody = JSON.parse(crypto.AES.decrypt(courierBody.datos, AESKEY).toString(crypto.enc.Utf8));
    const courier = await this.courierRepositorio.obtenerInfoRPS(
      courierBody.rps,
      courierBody.identificacionBeneficiario,
    );
    return courier;
  }


  async eliminarBeneficiarioCourier(courier: any) {

    var crypto = require('crypto-js/crypto-js.js');
    // var AESKEY = process.env.AESKEY as string;
    const llave = await keyVault([
      'KeyChekex'
    ]);
    var AESKEY = llave.KeyChekex as string;

    courier = JSON.parse(crypto.AES.decrypt(courier.datos, AESKEY).toString(crypto.enc.Utf8));

    await this.courierValidador.eliminacionCourierBeneficiario(courier.datosCheque);
    const eliminacionCourier = await this.courierRepositorio.eliminarBeneficiarioCourier(
      //     id,
      courier
    );

    return eliminacionCourier;
  }


  async actualizarBeneficiarioCourier(courier: any) {
    var crypto = require('crypto-js/crypto-js.js');
    //var AESKEY = process.env.AESKEY as string;

    const llave = await keyVault([
      'KeyChekex'
    ]);
    var AESKEY = llave.KeyChekex as string;

    courier = JSON.parse(crypto.AES.decrypt(courier.datos, AESKEY).toString(crypto.enc.Utf8));

    await this.courierValidador.actualizarCourierBeneficiario(courier.datosCheque);
    let beneficiarioCourierGuardado = false;

    const actualizacionBeneficiarioCourier = await this.courierRepositorio.actualizarBeneficiarioCourier(
      // id,
      courier
    );
    if (actualizacionBeneficiarioCourier) {
      if (actualizacionBeneficiarioCourier.n === 1) {
        beneficiarioCourierGuardado = true;
        var data = {
          "codigoAplicacion": courier.codigoAplicacion,
          "idUsuario": courier.idUsuario,
          "tool": courier.tool1,
          "codigoEnvio": courier.codigoEnvio,
          "codigoPlantilla": courier.codigoPlantilla

        }
        const envioNotificacion = await this.notificadorProvider.enviarCorreo(data);
        if (envioNotificacion) {
          beneficiarioCourierGuardado = true;
        }

      }
    }
    return beneficiarioCourierGuardado;
  }

  async enviocorreoPrecargaEnvio(id: string, courier: any) {

    let beneficiarioCourierGuardado = false;

    var data = {
      "codigoAplicacion": courier.codigoAplicacion,
      "correo": courier.correo,
      "tool": courier.tool,
      "codigoEnvio": courier.codigoEnvio,
      "codigoPlantilla": courier.codigoPlantilla

    }
    const envioNotificacion = await this.notificadorProvider.envioCorreoAlternativa(data);

    if (envioNotificacion) {
      beneficiarioCourierGuardado = true;
    }


    return beneficiarioCourierGuardado;
  }


  async actualizarBeneficiarioCourierEnvioCorreo(id: string, courier: any) {

    let beneficiarioCourierGuardado = false;

    var data = {
      "codigoAplicacion": courier.codigoAplicacion,
      "idUsuario": courier.idUsuario,
      "tool": courier.tool1,
      "codigoEnvio": courier.codigoEnvio,
      "codigoPlantilla": courier.codigoPlantilla

    }
    const envioNotificacion = await this.notificadorProvider.enviarCorreo(data);

    if (envioNotificacion) {
      beneficiarioCourierGuardado = true;
    }


    return beneficiarioCourierGuardado;
  }


  async actualizarPagoRPSVentanilla(courier: any) {

    var crypto = require('crypto-js/crypto-js.js');
    // var AESKEY = process.env.AESKEY as string;
    const llave = await keyVault([
      'KeyChekex'
    ]);
    var AESKEY = llave.KeyChekex as string;
    courier = JSON.parse(crypto.AES.decrypt(courier.datos, AESKEY).toString(crypto.enc.Utf8));

    await this.courierValidador.actualizarPagoRPSVentanilla(courier.datosCheque);
    let beneficiarioCourierGuardado = false;


    const actualizacionBeneficiarioCourier = await this.courierRepositorio.actualizarPagoRPSVentanilla(
      // id,
      courier
    );
    if (actualizacionBeneficiarioCourier) {
      if (actualizacionBeneficiarioCourier.n === 1) {
        beneficiarioCourierGuardado = true;
      }
    }
    return beneficiarioCourierGuardado;
  }

  async GenerarRPSCourier(id: string, courier: any) {
    await this.courierValidador.actualizarCourierBeneficiario(courier);
    let beneficiarioCourierGuardado = false;


    return beneficiarioCourierGuardado;
  }

}



