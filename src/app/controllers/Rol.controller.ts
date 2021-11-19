import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import RolServicio from "../services/rol/Rol.service";
import RolTransformador from "../transformers/Rol.transformer";
import { IRol } from "../models/types/rol/types";

@Service()
export default class RolControlador {
  @Inject(type => RolServicio)
  rolServicio: RolServicio;
  @Inject(type => RolTransformador)
  rolTransformador: RolTransformador;

  public obtenerTodos = async (req: Request, res: Response) => {
    const { limit, page, filter } = req.query;
    const roles = await this.rolServicio.obtenerTodos(page, limit, filter);
    (roles as any).data = roles.data.map((roles: any) =>
      this.rolTransformador.transformador(roles)
    );
    res.status(200).send(roles);
  };

  public crearRol = async (req: Request, res: Response) => {
    const rol: IRol = req.body;
    const rolCreado = await this.rolServicio.crearRol(rol);
    if (rolCreado) {
      const rolTransformado = this.rolTransformador.transformador(rolCreado);
      res
        .status(200)
        .send({ data: rolTransformado, mensaje: "Rol guardado exitosamente" });
    } else {
      res.status(400).send({ mensaje: "No se pudo guardar el rol" });
    }
  };

  public actualizarRol = async (req: Request, res: Response) => {
    const { rolId } = req.params;
    const rol: IRol = req.body;
    const rolGuardado = await this.rolServicio.actualizarRol(rolId, rol);
    if (rolGuardado) {
      res.status(200).send({ mensaje: "Rol actualizado exitosamente" });
    } else {
      res.status(400).send({ mensaje: "No se pudo actualizar el rol" });
    }
  };

  public eliminarRol = async (req: Request, res: Response) => {
    const { rolId } = req.params;
    const rolEliminado = await this.rolServicio.eliminarRol(rolId);
    if (rolEliminado) {
      res.status(200).send({ mensaje: "Rol eliminado exitosamente" });
    } else {
      res.status(400).send({ mensaje: "No se pudo eliminar el rol" });
    }
  };

  public obtenerCatalogoRol = async (req: Request, res: Response) => {
    const { filter } = req.query;
    let roles: any = await this.rolServicio.obtenerCatalogoRol(filter);
    roles = roles.map((roles: any) =>
      this.rolTransformador.transformadorSelector(roles)
    );
    res.status(200).send(roles);
  };
}
