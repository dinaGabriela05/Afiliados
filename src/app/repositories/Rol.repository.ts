import { Service } from "typedi";
import Rol from "../models/Rol";
const { map } = require("lodash");

@Service()
export default class RolRepositorio {
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
    const datos = await Rol.find(whereQuery)
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
    const datos = await Rol.find(whereQuery);
    return datos;
  }

  async actualizarRol(id: string, rol: any) {
    return await Rol.updateOne({ _id: id }, rol);
  }

  async eliminarRol(id: string) {
    return await Rol.updateOne({ _id: id }, { fechaEliminacion: new Date() });
  }
}
