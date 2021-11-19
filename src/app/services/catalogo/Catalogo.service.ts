import Catalogo from "../../models/Catalogo";
import CatalogoValidador from "../../validators/Catalogo.validator";
import { Inject, Service } from "typedi";
import CatalogoRepositorio from "../../repositories/Catalogo.repository";

@Service()
export default class CatalogoServicio {
  @Inject(type => CatalogoRepositorio)
  catalogoRepositorio: CatalogoRepositorio;
  @Inject(type => CatalogoValidador)
  catalogoValidador: CatalogoValidador;

  async obtenerTodos(_page: any, _limit: any, filter: any) {
    const catalogos = await this.catalogoRepositorio.obtenerTodos(
      filter,
      parseInt(_page),
      parseInt(_limit)
    );
    return catalogos;
  }

  async crearCatalogo(catalogo: any) {
    await this.catalogoValidador.crearCatalogo(catalogo);
    const nuevoCatalogo = new Catalogo(catalogo);
    let catalogoGuardado: any;
    const catalogoUnico = await this.catalogoRepositorio.obtenerCatalogoPorCodigo(
      catalogo.codigo
    );
    if (!catalogoUnico) {
      catalogoGuardado = await nuevoCatalogo.save();
    }
    return catalogoGuardado;
  }

  async actualizarCatalogo(id: string, catalogo: any) {
    await this.catalogoValidador.actualizarCatalogo(catalogo);
    let catalogoGuardado = false;
    const actualizacionCatalogo = await this.catalogoRepositorio.actualizarCatalogo(
      id,
      catalogo
    );
    if (actualizacionCatalogo) {
      if (actualizacionCatalogo.n === 1) {
        catalogoGuardado = true;
      }
    }
    return catalogoGuardado;
  }

  async eliminarCatalogo(id: string) {
    await this.catalogoValidador.eliminarCatalogo({ id: id });
    let catalogoEliminado = false;
    const eliminacionCatalogo = await this.catalogoRepositorio.eliminarCatalogo(
      id
    );
    if (eliminacionCatalogo) {
      if (eliminacionCatalogo.n === 1) {
        catalogoEliminado = true;
      }
    }
    return catalogoEliminado;
  }

  async obtenerAfiliadoPorTipo(tipo: string) {
    const afiliado = await this.catalogoRepositorio.obtenerCatalogoPorTipo(
      tipo
    );
    return afiliado;
  }
}
