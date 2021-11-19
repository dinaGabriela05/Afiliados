import { Service } from "typedi";
import Usuario from "../models/Usuario";
import Firma from "../models/Firma";
const { map } = require("lodash");

@Service()
export default class UsuarioRepositorio {
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
    const datos = await Usuario.find(whereQuery)
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

  async actualizarUsuario(id: string, usuario: any) {
    return await Usuario.updateOne({ _id: id }, usuario);
  }

  async eliminarUsuario(id: string) {
    return await Usuario.updateOne(
      { _id: id },
      { fechaEliminacion: new Date() }
    );
  }

  async usuarioVerificador(identificacion: any) {
    return await Usuario.find({
      identificacion: { $in: identificacion }
    });
  }

  async obtenerPorDocumentoUsuario(documento: string) {
    return await Usuario.findOne({
      identificacion: { $eq: documento }
    });
  }

  async consultarUsuarioId(id: string) {
    return await Usuario.findOne({
      _id: { $eq: id }
    }).populate("Afiliado");
  }

  async consultarUsuarioPorNombre(nombre: string) {
    return await Usuario.findOne({
      username: { $eq: nombre }
    }).populate("rol");
  }


  async firma(idBanco: string) {
    return await Firma.findOne({
      _id: { $eq: idBanco }
    })
  }

  async actualizarUsuarioPorUsername(username: string, usuario: any) {
    return await Usuario.updateOne({ username: username }, usuario);
  }
}
