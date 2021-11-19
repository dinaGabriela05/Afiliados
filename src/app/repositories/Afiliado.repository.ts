import { Inject, Service } from "typedi";
import Afiliado from "../models/Afiliado";

const { map } = require("lodash");
import AfiliadoTransformador from "../transformers/Afiliado.transformer";

@Service()
export default class AfiliadoRepositorio {
  @Inject(type => AfiliadoTransformador)
  afiliadoTransformador: AfiliadoTransformador;

  async obtenerTodos(filtros: any, _pagina: any, _limite: any) {
    const pagina = (_pagina - 1) * _limite;
    let whereQuery: any = {};
    try {
      const filtrosWhere = JSON.parse(filtros);
      map(filtrosWhere, (value: any, key: any) => {
        whereQuery[key] = { $regex: `${value}` };
      });
    } catch (e) {
      whereQuery = {};
    }
    const datos = await Afiliado.find(whereQuery)
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

  async obtenerPreCargadoPorDocumento(documento: string, estado: any) {
    return await Afiliado.findOne({
      "identificacion.documento": { $eq: documento },
      estado: { $in: estado }
    });
  }

  async obtenerPorDocumento(documento: string, estado: any) {
    return await Afiliado.findOne({
      "identificacion.documento": { $eq: documento },
      estado: { $in: estado }
    });
  }

  async obtenerPorDocumentoPrecarga(
    documento: string,
    tipo: string,
    estado: any
  ) {
    return await Afiliado.findOne({
      "identificacion.documento": { $eq: documento },
      tipo: { $eq: tipo },
      estado: { $in: estado }
    });
  }

  async actualizarAfiliadoCuenta(id: string, cuenta_id: string, cuenta: any) {
    return await Afiliado.findOneAndUpdate(
      {
        _id: id,
        "cuentas._id": cuenta_id
      },
      {
        $set: {
          "cuentas.$.banco": cuenta.banco,
          "cuentas.$.numero": cuenta.numero,
          "cuentas.$.moneda": cuenta.moneda,
          "cuentas.$.tipo": cuenta.tipo
        }
      }
    );
  }

  async actualizarAfiliado(id: string, afiliado: any) {
    return await Afiliado.updateOne({ _id: id }, afiliado);
  }

  async consultaAfiliado(id: string, documento: string) {
    try {
      return await Afiliado.findOne({
        _id: { $eq: id },
        "identificacion.documento": { $eq: documento }
      });
    } catch (error) {
      return null;
    }
  }

  async consultarAfiliadoId(id: string) {
    try {
      return await Afiliado.findOne({
        _id: { $eq: id }
      });
    } catch (error) {
      return null;
    }
  }

  async eliminarAfiiado(id: string) {
    return await Afiliado.updateOne(
      { _id: id },
      { fechaEliminacion: new Date() }
    );
  }

  async consultarNotificacionAfiliado(id: string) {
    return await Afiliado.findOne({
      _id: { $in: id }
    }).populate({
      path: "notificadores",
      populate: { path: "notificacion" }
    });
  }

  async consultaAfiliadoPorId(id: string) {
    try {
      return await Afiliado.findOne({
        _id: id
      });
    } catch (error) {
      return null;
    }
  }

  async consultacuentas(id: string) {
    try {
      return await Afiliado.findOne({
        _id: { $eq: id }
      });
    } catch (error) {
      return null;
    }
  }

  async eliminarCuentasAfiliado(id: string, idCuenta: string) {
    try {
      return await Afiliado.updateOne(
        { _id: { $eq: id } },
        {
          $pull: { cuentas: { _id: idCuenta } }
        }
      );
    } catch (error) {
      return null;
    }
  }

  async eliminarUsuariosAfiliado(id: string, idUsuario: string) {
    try {
      return await Afiliado.updateOne(
        { _id: { $eq: id } },
        {
          $pull: { usuarios: idUsuario }
        }
      );
    } catch (error) {
      return null;
    }
  }

  async eliminarAfiliadoNotificacion(id: string, idNotificadores: string) {
    try {
      return await Afiliado.updateOne(
        { _id: { $eq: id } },
        {
          $pull: { notificadores: idNotificadores }
        }
      );
    } catch (error) {
      return null;
    }
  }

  async consultarUsuarioAfiliadoUserId(userId: string) {
    try {
      return await Afiliado.findOne({
        usuarios: { $in: userId }
      });
    } catch (error) {
      return null;
    }
  }

  async consultarUsuarioPorIdentificacion(identificacion: string) {
    return await Afiliado.findOne({
      "identificacion.documento": { $eq: identificacion }
    });
  }
}
