import { Service } from "typedi";
import Courier from "../models/Courier";

const { map } = require("lodash");

@Service()
export default class CatalogoRepositorio {
  // async obtenerTodos(filtros: any, _pagina: any, _limite: any) {
  //   const pagina = (_pagina - 1) * _limite;
  //   let whereQuery: any = {};
  //   try {
  //     const filtrosWhere = JSON.parse(filtros);
  //     map(filtrosWhere, (value: any, key: any) => {
  //       whereQuery[key] = { $regex: `${value}` };
  //     });
  //   } catch (e) {
  //     whereQuery = {};
  //   }
  //   const datos = await Courier.find(whereQuery)
  //     .skip(pagina)
  //     .limit(_limite);
  //   const cantidad = datos.length;
  //   const data = {
  //     data: datos,
  //     metadata: {
  //       total: cantidad,
  //       page: _pagina,
  //       limit: _limite
  //     }
  //   };
  //   return data;
  // }

   async obtenerCourierPorCodigo(codigo: string) {
     return await Courier.findOne({
       codigoBeneficiario: { $eq: codigo }
     });
   }


  async obtenerTodos(filtros: any, _pagina: any, _limite: any) {
    const pagina = (_pagina - 1) * _limite;
    let whereQuery: any = { fechaEliminacion: { $exists: false } };
    try {
      const filtrosWhere = JSON.parse(filtros);
      map(filtrosWhere, (value: any, key: any) => {
        whereQuery[key] = { $eq: value + "" };
      });
    } catch (e) {
      whereQuery = { fechaEliminacion: { $exists: false } };
    }
    const datos = await Courier.find(whereQuery)
      .skip(pagina)
      .limit(_limite);
    const cantidad = datos.length;
    const data = {
      data: datos,
      metadata: {
        total: cantidad,
        page: _pagina,
        limit: _limite
      }
    };
    return data;
  }


  async obtenerCourierPorEstadoTipo(estado: any, identificacionBeneficiario: any) {

    if (estado == "CONSULTAENDOSO") {
      return await Courier.find({
        identificacionBeneficiario: { $eq: identificacionBeneficiario },
        estado: { $eq: "ACEPTADO" },
        endoso: { $eq: "false" }
    
      });
    }
    else if (estado == "CONSULTAEMISOR") {
      return await Courier.find({
        idEmisor: { $eq: identificacionBeneficiario },
        estado: { $eq: "ENVIADO" }
      });
    }

    else if (estado == "CONSULTAVENTANILLARPS") {
      return await Courier.find({
        identificacionBeneficiario: { $eq: identificacionBeneficiario },
        estado: { $in: ["ACEPTADO", "ENDOSADO"] },
        rps: { $eq: "" }

      });
    }


    return await Courier.find({
      identificacionBeneficiario: { $eq: identificacionBeneficiario },
      estado: { $eq: estado }
    });
  }


  async consultaRecibidosEnviados(codigoAplicacion: any, identificacion: any, estado: any) {
    return await Courier.find({
      codigoAplicacion: { $eq: codigoAplicacion },
      estado: { $eq: estado } ,
      $or: [{ "identificacionEmisor": { $eq: identificacion } }, { "identificacionBeneficiario": { $eq: identificacion } }]
    })
  }

  async validarCheque(numeroCuenta: any, numeroCheque: any) {
    return await Courier.find({
      noCheque: { $eq: numeroCheque },
      cuenta: { $eq: numeroCuenta }
    });
  }



  async consultaMovimientoRecientes(codigoAplicacion: any, identificacion: any) {
    return await Courier.find({
      codigoAplicacion: { $eq: codigoAplicacion },
      $or: [{ "identificacionEmisor": { $eq: identificacion } }, { "identificacionBeneficiario": { $eq: identificacion } }]
    }).sort({ fechaActualizacion: -1 }).limit(30);
  }

  


  async obtenerCourierPorEstadoFecha(estado: any, identificacion: any, fechaInicio: any, fechaFin: any, tipoConsulta: any, codigoAplicacion: any) {

    if (tipoConsulta == "CONSULTA ENVIADOS") {
      if (estado != "Todos") {
        return await Courier.find({
          identificacionEmisor: { $eq: identificacion },
          estado: { $eq: estado },
          codigoAplicacion: { $eq: codigoAplicacion },
          fechaActualizacion: { $gte: new Date(fechaInicio), $lte: new Date(fechaFin) }

        });
      }
      else {
        return await Courier.find({
          identificacionEmisor: { $eq: identificacion },
          codigoAplicacion: { $eq: codigoAplicacion },
          fechaActualizacion: { $gte: new Date(fechaInicio), $lte: new Date(fechaFin) },
          estado: { $ne: "RPS" },

        });
      }

    } else
      if (tipoConsulta == "CONSULTA RECIBIDO") {
        if (estado != "Todos") {
          return await Courier.find({
            identificacionBeneficiario: { $eq: identificacion },
            estado: { $eq: estado },
            codigoAplicacion: { $eq: codigoAplicacion },
            fechaActualizacion: { $gte: new Date(fechaInicio), $lte: new Date(fechaFin) }

          });
        } else {
          return await Courier.find({
            identificacionBeneficiario: { $eq: identificacion },
            codigoAplicacion: { $eq: codigoAplicacion },
            fechaActualizacion: { $gte: new Date(fechaInicio), $lte: new Date(fechaFin) },
            estado: { $nin: ["ANULADO", "RPS"] }


          });
        }
      }

  }

  async obtenerInfoRPS(rps: any, identificacionBeneficiario: any) {
    return await Courier.find({
      identificacionBeneficiario: { $eq: identificacionBeneficiario },
      rps: { $eq: rps },
      estado: { $ne: "PAGADO_RPS" }
    });
  }

  async eliminarBeneficiarioCourier(courier: any) {

    return await Courier.updateOne(
      { _id: courier._id }, courier.datosCheque);
  }

  async actualizarBeneficiarioCourier(courier: any) {
    return await Courier.updateOne({ _id: courier._id }, courier.datosCheque);
  }

  async actualizarPagoRPSVentanilla(courier: any) {
    return await Courier.updateOne({ _id: courier._id }, courier.datosCheque);
  }
}
