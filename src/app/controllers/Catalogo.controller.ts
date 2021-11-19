import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { ICatalogo } from "../models/types/catalogo/types";
import CatalogoServicio from "../services/catalogo/Catalogo.service";
import CatalogoTransformador from "../transformers/Catalogo.transformer";

@Service()
export default class CatalogoControlador {
  @Inject(type => CatalogoServicio)
  catalogoServicio: CatalogoServicio;
  @Inject(type => CatalogoTransformador)
  catalogoTransformador: CatalogoTransformador;

  public obtenerTodos = async (req: Request, res: Response) => {
    const { limit, page, filter } = req.query;
    const catalogos = await this.catalogoServicio.obtenerTodos(
      page,
      limit,
      filter
    );
    (catalogos as any).data = catalogos.data.map((afiliados: any) =>
      this.catalogoTransformador.transformador(afiliados)
    );
    res.status(200).send(catalogos);
  };

  public crearCatalogo = async (req: Request, res: Response) => {
    const catalogo: ICatalogo = req.body;
    const catalogoCreado = await this.catalogoServicio.crearCatalogo(catalogo);
    if (catalogoCreado) {
      const response = this.catalogoTransformador.transformador(catalogoCreado);
      res
        .status(200)
        .send({ mensaje: "Catalogo creado exitosamente", data: response });
    } else {
      res
        .status(400)
        .send({ mensaje: "Ya existe un registro con este código" });
    }
  };

  public actualizarCatalogo = async (req: Request, res: Response) => {
    const { catalogoId } = req.params;
    const catalogo: ICatalogo = req.body;
    const catalogoGuardado = await this.catalogoServicio.actualizarCatalogo(
      catalogoId,
      catalogo
    );
    if (catalogoGuardado) {
      res.status(200).send({ mensaje: "Catalogo actualizado exitosamente" });
    } else {
      res.status(400).send({ mensaje: "No se pudo actualizar el catalogo" });
    }
  };

  public eliminarCatalogo = async (req: Request, res: Response) => {
    const { catalogoId } = req.params;
    const catalogoEliminado = await this.catalogoServicio.eliminarCatalogo(
      catalogoId
    );
    if (catalogoEliminado) {
      res.status(200).send({ mensaje: "Catalogo eliminado exitosamente" });
    } else {
      res.status(400).send({ mensaje: "No se pudo eliminar el catalogo" });
    }
  };

  public obtenerCatalogo = async (req: Request, res: Response) => {
    const { tipo } = req.params;
    const catalogo = await this.catalogoServicio.obtenerAfiliadoPorTipo(tipo);
    const transformarEntidadesACatalogos = catalogo.map(catalogo =>
      this.catalogoTransformador.transformador(catalogo)
    );
    res.status(200).send({
      resultado: {
        data: transformarEntidadesACatalogos
      }
    });
  };

  public obtenerCatalogoSelectores = async (req: Request, res: Response) => {
    const { tipo } = req.params;
    const catalogo = await this.catalogoServicio.obtenerAfiliadoPorTipo(tipo);
    const transformarEntidadesACatalogos = catalogo.map(catalogo =>
      this.catalogoTransformador.transformador(catalogo)
    );
    res.status(200).send({
      resultado: {
        data: transformarEntidadesACatalogos
      }
    });
  };
}
