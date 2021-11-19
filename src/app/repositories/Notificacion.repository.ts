import { Service } from "typedi";
import Notificacion from "../models/Notificacion";

const { map } = require("lodash");

@Service()
export default class NotificacionRepositorio {
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
    const datos = await Notificacion.find(whereQuery)
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

  async actualizarNotificacion(id: string, notificacion: any) {
    return await Notificacion.updateOne({ _id: id }, notificacion);
  }

  async eliminarNotificacion(id: string) {
    return await Notificacion.updateOne(
      { _id: id },
      { fechaEliminacion: new Date() }
    );
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
    const datos = await Notificacion.find(whereQuery);
    return datos;
  }
}
