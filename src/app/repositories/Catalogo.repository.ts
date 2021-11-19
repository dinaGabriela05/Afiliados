import { Service } from "typedi";
import Catalogo from "../models/Catalogo";

const { map } = require("lodash");

@Service()
export default class CatalogoRepositorio {
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
    const datos = await Catalogo.find(whereQuery)
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

  async actualizarCatalogo(id: string, catalogo: any) {
    return await Catalogo.updateOne({ _id: id }, catalogo);
  }

  async obtenerCatalogoPorCodigo(codigo: string) {
    return await Catalogo.findOne({
      codigo: { $eq: codigo }
    });
  }

  async eliminarCatalogo(id: string) {
    return await Catalogo.updateOne(
      { _id: id },
      { fechaEliminacion: new Date() }
    );
  }

  async obtenerCatalogoPorTipo(tipo: string) {
    return await Catalogo.find({
      tipo: { $eq: tipo },
      estado: { $in: ["ACTIVO"] }
    });
  }
}
