import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import UsuarioServicio from "../services/usuario/Usuario.service";
import UsuarioTransformador from "../transformers/Usuario.transformer";
import { IUsuario } from "../models/types/usuario/types";

@Service()
export default class UsuarioControlador {
  @Inject(type => UsuarioServicio)
  usuarioServicio: UsuarioServicio;
  @Inject(type => UsuarioTransformador)
  usuarioTransformador: UsuarioTransformador;

  public obtenerTodos = async (req: Request, res: Response) => {
    const { limit, page, filter } = req.query;
    const usuarios = await this.usuarioServicio.obtenerTodos(
      page,
      limit,
      filter
    );
    (usuarios as any).data = usuarios.data.map((usuarios: any) =>
      this.usuarioTransformador.transformador(usuarios)
    );
    res.status(200).send(usuarios);
  };

  public crearUsuario = async (req: Request, res: Response) => {
    const usuario: IUsuario = req.body;
    const usuarioCreado = await this.usuarioServicio.crearUsuario(usuario);
    if (usuarioCreado) {
      const usuarioTransformado = this.usuarioTransformador.transformador(
        usuarioCreado
      );
      res.status(200).send({
        data: usuarioTransformado,
        mensaje: "Usuario guardado exitosamente"
      });
    } else {
      res.status(400).send({ mensaje: "No se pudo guardar el usuario" });
    }
  };

  public actualizarUsuario = async (req: Request, res: Response) => {
    const { usuarioId } = req.params;
    const usuario: IUsuario = req.body;
    const usuarioGuardado = await this.usuarioServicio.actualizarUsuario(
      usuarioId,
      usuario
    );
    if (usuarioGuardado) {
      res.status(200).send({ mensaje: "Usuario actualizado exitosamente" });
    } else {
      res.status(400).send({ mensaje: "No se pudo actualizar el usuario" });
    }
  };

  public eliminarUsuario = async (req: Request, res: Response) => {
    const { usuarioId } = req.params;
    const usuarioEliminado = await this.usuarioServicio.eliminarUsuario(
      usuarioId
    );
    if (usuarioEliminado) {
      res.status(200).send({ mensaje: "Usuario eliminado exitosamente" });
    } else {
      res.status(400).send({ mensaje: "No se pudo eliminar el usuario" });
    }
  };

  public consultaUsuario = async (req: Request, res: Response) => {
    const { usuarioId } = req.params;
    const usuarioConsultaID = await this.usuarioServicio.consultaUsuario(
      usuarioId
    );
    if (usuarioConsultaID) {
      res.status(200).send({ mensaje: "Datos afiliado exitoso" });
    } else {
      res.status(400).send({ mensaje: "Datos afiliado no existe" });
    }
  };

  public consultaUsuarioPorNombre = async (req: Request, res: Response) => {
    const { username } = req.params;
    const usuarioConsultaID = await this.usuarioServicio.consultarUsuarioPorNombre(
      username
    );
    if (usuarioConsultaID) {
      res.status(400).send({ mensaje: "true" });
    } else {
      res.status(200).send({ mensaje: "false" });
    }
  };

  public consultaConexionUsuarioPorUsername = async (
    req: Request,
    res: Response
  ) => {
    const { username } = req.params;
    const usuarioConsulta = await this.usuarioServicio.consultarUsuarioPorNombre(
      username
    );
    if (usuarioConsulta) {
      const usuarioTransformado = this.usuarioTransformador.transformadorConexion(
        usuarioConsulta
      );
      res.status(200).send({
        data: usuarioTransformado,
        mensaje: "Usuario encontrado"
      });
    } else {
      res.status(400).send({ mensaje: "No se pudo encontrar el usuario" });
    }
  };

  public actualizarConexionUsuario = async (req: Request, res: Response) => {
    const { username } = req.params;
    const usuario: IUsuario = req.body;
    const usuarioGuardado = await this.usuarioServicio.actualizarConexionUsuario(
      username,
      usuario
    );
    if (usuarioGuardado) {
      res.status(200).send({ mensaje: "Usuario actualizado exitosamente" });
    } else {
      res.status(400).send({ mensaje: "No se pudo actualizar el usuario" });
    }
  };

  public actualizarValidacionScanReferenceUsuario = async (
    req: Request,
    res: Response
  ) => {
    const { username } = req.params;
    const usuario: IUsuario = req.body;
    const usuarioGuardado = await this.usuarioServicio.actualizarScanReferenceUsuario(
      username,
      usuario
    );
    if (usuarioGuardado) {
      res.status(200).send({ mensaje: "Usuario actualizado exitosamente" });
    } else {
      res.status(400).send({ mensaje: "No se pudo actualizar el usuario" });
    }
  };

  public actualizarValidacionFacialUsuario = async (
    req: Request,
    res: Response
  ) => {
    const { username } = req.params;
    const usuario: IUsuario = req.body;
    const usuarioGuardado = await this.usuarioServicio.actualizarValidacionFacialUsuario(
      username,
      usuario
    );
    if (usuarioGuardado) {
      res.status(200).send({ mensaje: "Usuario actualizado exitosamente" });
    } else {
      res.status(400).send({ mensaje: "No se pudo actualizar el usuario" });
    }
  };
}
