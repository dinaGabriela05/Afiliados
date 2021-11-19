import { Request, Response } from "express";
import { keyVault } from "../../config/validators/keyVault";
import { Inject, Service } from "typedi";
import { ICourier } from "../models/types/courier/types";
import CourierServicio from "../services/courier/Courier.service";
import CourierTransformador from "../transformers/Courier.transformer";


@Service()
export default class CourierControlador {
  @Inject(type => CourierServicio)
  courierServicio: CourierServicio;
  @Inject(type => CourierTransformador)
  courierTransformador: CourierTransformador;

  public obtenerTodos = async (req: Request, res: Response) => {
    const { limit, page, filter } = req.query;
    const courier = await this.courierServicio.obtenerTodos(
      page,
      limit,
      filter
    );
    (courier as any).data = courier.data.map((afiliados: any) =>
      this.courierTransformador.transformador(afiliados)
    );
    res.status(200).send(courier);
  };

  public crearCourier = async (req: Request, res: Response) => {
    const courier: ICourier = req.body;
    const courierCreado = await this.courierServicio.crearCourier(courier);
    if (courierCreado) {
      const response = this.courierTransformador.transformador(courierCreado);
      res
        .status(200)
        .send({ mensaje: "courier creado exitosamente", data: response });
    } else {
      res
        .status(400)
        .send({ mensaje: "Ya existe un registro con este código" });
    }
  };


  public obtenerCourier = async (req: Request, res: Response) => {
    const courierBody: any = req.body;
    const courier = await this.courierServicio.obtenerCourierPorEstadoIdentificacion(courierBody);
    var crypto = require('crypto-js/crypto-js.js');
    const llave = await keyVault([
      'KeyChekex'
    ]);
    var AESKEY = llave.KeyChekex as string;
    const transformarEntidadesACatalogos = courier.map(courier =>
      this.courierTransformador.transformador(courier)
    );
    if (transformarEntidadesACatalogos.length > 0) {
      var datatransformarEntidadesACatalogos = crypto.AES.encrypt(JSON.stringify(transformarEntidadesACatalogos), AESKEY).toString()
    } else {

      datatransformarEntidadesACatalogos = []
    }
    res.status(200).send({
      resultado: {

        data: datatransformarEntidadesACatalogos
      }
    });
  };



  public consultaCourierPorFecha = async (req: Request, res: Response) => {
    const courierBody: any = req.body;
    const courier = await this.courierServicio.obtenerCourierPorFechaEstado(courierBody);
    var crypto = require('crypto-js/crypto-js.js');
       const llave = await keyVault([
      'KeyChekex'
    ]);
    var AESKEY = llave.KeyChekex as string;
    if (courier != null) {
      const transformarEntidadesACatalogos = courier.map(courier =>
        this.courierTransformador.transformador(courier)

      );
      if (transformarEntidadesACatalogos.length > 0) {
        var datatransformarEntidadesACatalogos = crypto.AES.encrypt(JSON.stringify(transformarEntidadesACatalogos), AESKEY).toString();
      }
      else {
        datatransformarEntidadesACatalogos = [];
      }
      res.status(200).send({
        resultado: {
          data: datatransformarEntidadesACatalogos
        }
      });
    }

  };


  public obtenerInfoRPS = async (req: Request, res: Response) => {
    const courierBody: any = req.body;
    const courier = await this.courierServicio.obtenerInfoRPS(courierBody);
    var crypto = require('crypto-js/crypto-js.js');
    //  var AESKEY = process.env.AESKEY as string;
    const llave = await keyVault([
      'KeyChekex'
    ]);
    var AESKEY = llave.KeyChekex as string;

    if (courier != null) {
      const transformarEntidadesACatalogos = courier.map(courier =>
        this.courierTransformador.transformador(courier)

      );
      if (transformarEntidadesACatalogos.length > 0) {
        var datatransformarEntidadesACatalogos = crypto.AES.encrypt(JSON.stringify(transformarEntidadesACatalogos), AESKEY).toString();
      }
      else {
        datatransformarEntidadesACatalogos = [];
      }
      res.status(200).send({
        resultado: {
          data: datatransformarEntidadesACatalogos
        }
      });
    }

  };


  public eliminarBeneficiarioCourier = async (req: Request, res: Response) => {
    // const { courierId } = req.params;
    const courier: ICourier = req.body;
    const afiliadoEliminado = await this.courierServicio.eliminarBeneficiarioCourier(
      // courierId,
      courier
    );
    if (afiliadoEliminado) {
      res.status(200).send({ mensaje: "Beneficiario Courier eliminado exitosamente" });
    } else {
      res.status(400).send({ mensaje: "No se pudo eliminar el Beneficiario Courier" });
    }
  };


  public actualizarBeneficiarioCourier = async (req: Request, res: Response) => {
    // const { courierId } = req.params;
    const courier: ICourier = req.body;
    const courierGuardado = await this.courierServicio.actualizarBeneficiarioCourier(
      //  courierId,
      courier
    );
    if (courierGuardado) {
      res.status(200).send({ mensaje: "Beneficiario Courier actualizado exitosamente" });



    } else {
      res.status(400).send({ mensaje: "No se pudo actualizar el Beneficiario Courier" });
    }
  };
  public actualizarBeneficiarioCourierEnvioCorreo = async (req: Request, res: Response) => {
    const { courierId } = req.params;
    const courier: ICourier = req.body;
    const courierGuardado = await this.courierServicio.actualizarBeneficiarioCourierEnvioCorreo(
      courierId,
      courier
    );
    if (courierGuardado) {
      res.status(200).send({ mensaje: "Beneficiario Courier actualizado exitosamente" });



    } else {
      res.status(400).send({ mensaje: "No se pudo actualizar el Beneficiario Courier" });
    }
  };

  public enviocorreoPrecargaEnvio = async (req: Request, res: Response) => {
    const { courierId } = req.params;
    const courier: ICourier = req.body;
    const courierGuardado = await this.courierServicio.enviocorreoPrecargaEnvio(
      courierId,
      courier
    );
    if (courierGuardado) {
      res.status(200).send({ mensaje: "Se envio correo exitosamente" });



    } else {
      res.status(400).send({ mensaje: "No se pudo enviar el correo" });
    }
  };





  public actualizarPagoRPSVentanilla = async (req: Request, res: Response) => {
    // const { courierId } = req.params;
    const courier: ICourier = req.body;
    const courierGuardado = await this.courierServicio.actualizarPagoRPSVentanilla(
      // courierId,
      courier
    );
    if (courierGuardado) {
      res.status(200).send({ mensaje: "Pago de cheque RPS exitoso" });
    } else {
      res.status(400).send({ mensaje: "No se pudo actualizar el pago de cheque RPS" });
    }
  };


  public consultaMovimientoRecientes = async (req: Request, res: Response) => {
    const courierBody: any = req.body;
    const courier = await this.courierServicio.consultaMovimientoRecientes(courierBody);
    var crypto = require('crypto-js/crypto-js.js');
    // var AESKEY = process.env.AESKEY as string;
    const llave = await keyVault([
      'KeyChekex'
    ]);
    var AESKEY = llave.KeyChekex as string;

    const transformarEntidadesACatalogos = courier.map(courier =>
      this.courierTransformador.transformador(courier)
    );
    if (transformarEntidadesACatalogos.length > 0) {

      var datacourierTransformador = crypto.AES.encrypt(JSON.stringify(transformarEntidadesACatalogos), AESKEY).toString();

    } else {
      datacourierTransformador = [];
    }
    res.status(200).send({
      resultado: {
        data: datacourierTransformador
      }
    });
  };



  
  


  public consultaRecibidosEnviados = async (req: Request, res: Response) => {

    const body = req.body;
    try {
      const courier = await this.courierServicio.consultaRecibidosEnviados(
        body
      );
      var crypto = require('crypto-js/crypto-js.js');
      //var AESKEY = process.env.AESKEY as string;

      const llave = await keyVault([
        'KeyChekex'
      ]);
      var AESKEY = llave.KeyChekex as string;

      (courier as any).data = courier.data.map((courier: any) =>
        this.courierTransformador.transformador(courier)
      );

      if (courier.data.length > 0) {

        var datacourier = crypto.AES.encrypt(JSON.stringify(courier), AESKEY).toString();

      } else {
        datacourier = [];
      }

      res.status(200).send({
        resultado: {
          data: datacourier
        }
      });
    } catch (e) {
      res.status(400).send({ mensaje: "No existe datos" });
    }
  };


  public validarCheque = async (req: Request, res: Response) => {
    const courierBody: any = req.body;
    const courier = await this.courierServicio.validarCheque(courierBody);

    if (courier == "No existe") {
      res.status(200).send({ mensaje: "No existe" });
    } else if (courier == "Existente") {
      res.status(200).send({ mensaje: "Existente" });
    }
    if (courier == "ERROR") {
      res.status(400).send({ mensaje: "Error el servicio validarCheque/APICOURIER010" });
    }
  };


}
