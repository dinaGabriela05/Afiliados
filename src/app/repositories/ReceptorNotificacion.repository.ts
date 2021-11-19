import { Service } from "typedi";
import ReceptorNotificacion from "../models/ReceptorNotificacion";

const { map } = require("lodash");

@Service()
export default class ReceptorNotificacionRepositorio {
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
    const datos = await ReceptorNotificacion.find(whereQuery)
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

  async actualizarReceptorNotificacion(id: string, receptorNotificacion: any) {
    return await ReceptorNotificacion.updateOne(
      { _id: id },
      receptorNotificacion
    );
  }

  async eliminarReceptorNotificacion(id: string) {
    return await ReceptorNotificacion.updateOne(
      { _id: id },

      { fechaEliminacion: new Date() }
    );
  }

  async consultaReceptorNotificacion(id: string) {
    return await ReceptorNotificacion.findOne({
      _id: { $eq: id }
    }).populate("notificacion");
  }

  async obtenerSelector(filtros: any) {
    let whereQuery: any = {};
    try {
      const filtrosWhere = JSON.parse(filtros);
      map(filtrosWhere, (value: any, key: any) => {
        whereQuery[key] = { $regex: `${value}` };
      });
    } catch (e) {
      whereQuery = {};
    }
    const datos = await ReceptorNotificacion.find(whereQuery);
    return datos;
  }
}
