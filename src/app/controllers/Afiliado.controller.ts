import { Request, Response } from "express";
import { Inject, Service } from "typedi";
import { TIPOAFILIADO, TIPODOCUMENTO } from "../models/Afiliado";
import { IAfiliado } from "../models/types/afiliado/types";
import AfiliadoServicio from "../services/afiliado/Afiliado.service";
import LogServicio from "../services/log/Log.service";
import ReceptorNotificacionServicio from "../services/receptorNotificacion/ReceptorNotificacion.service";
import AfiliadoTransformador from "../transformers/Afiliado.transformer";

@Service()
export default class AfiliadoControlador {
  @Inject(type => AfiliadoServicio)
  afiliadoServicio: AfiliadoServicio;
  @Inject(type => AfiliadoTransformador)
  afiliadoTransformador: AfiliadoTransformador;
  @Inject(type => LogServicio)
  logServicio: LogServicio;
  @Inject(type => ReceptorNotificacionServicio)
  receptorNotificacionServicio: ReceptorNotificacionServicio;

  public obtenerTodos = async (req: Request, res: Response) => {
    const { limit, page, filter } = req.query;
    const afiliados = await this.afiliadoServicio.obtenerTodos(
      page,
      limit,
      filter
    );
    (afiliados as any).data = afiliados.data.map((afiliados: any) =>
      this.afiliadoTransformador.transformador(afiliados)
    );
    res.status(200).send(afiliados);
  };

  public crearAfiliado = async (req: Request, res: Response) => {
    const { afiliadoId } = req.params;
    const afiliado: any = req.body;

    const afiliadoGuardado = await this.afiliadoServicio.crearAfiliado(
      afiliadoId,
      afiliado
    );
    if (afiliadoGuardado) {
      res.status(200).send({
        mensaje: "Afiliado guardado exitosamente"
      });
      this.logServicio.crearLog({
        codigo: "200",
        usuario: "TEST",
        atributos: {
          error: {
            metodo: "crearAfiliado",
            mensaje: "Afiliado guardado exitosamente"
          }
        },
        fechaCreacion: new Date()
      });
    } else {
      res.status(400).send({ mensaje: "No se pudo guardar el afiliado " });
      this.logServicio.crearLog({
        codigo: "400",
        usuario: "TEST",
        atributos: {
          error: {
            metodo: "crearAfiliado",
            mensaje: "No se pudo guardar el afiliado"
          }
        },
        fechaCreacion: new Date()
      });
    }
  };

  public actualizarAfiliado = async (req: Request, res: Response) => {
    const { afiliadoId } = req.params;
    const afiliado: IAfiliado = req.body;
    const afiliadoGuardado = await this.afiliadoServicio.actualizarAfiliado(
      afiliadoId,
      afiliado
    );
    if (afiliadoGuardado) {
      res.status(200).send({ mensaje: "Afiliado actualizado exitosamente" });
    } else {
      res.status(400).send({ mensaje: "No se pudo actualizar el afiliado" });
    }
  };

  public eliminarAfiliado = async (req: Request, res: Response) => {
    const { afiliadoId } = req.params;
    const afiliadoEliminado = await this.afiliadoServicio.eliminarAfiliado(
      afiliadoId
    );
    if (afiliadoEliminado) {
      res.status(200).send({ mensaje: "Afiliado eliminado exitosamente" });
    } else {
      res.status(400).send({ mensaje: "No se pudo eliminar el afiliado" });
    }
  };

  // public delete = async (req: Request, res: Response) => {
  //   const { userId } = req.params;
  //   await this.userService.delete(+userId);
  //   res.status(204).send();
  // };

  public obtenerAfiliado = async (req: Request, res: Response) => {
    const parametros = req.params;
    const { ...estadoAfiliado } = req.query;
    if (estadoAfiliado.afiliado) {
      const afiliado: any = await this.afiliadoServicio.obtenerAfiliadoPorDocumento(
        parametros.documento
      );
      if (afiliado) {
        res.status(200).send({
          resultado: {
            estaAfiliado: true,
            data: this.afiliadoTransformador.transformador(afiliado)
          },
          mensaje: "La persona o empresa se encuentra afiliada"
        });
      } else {
        res.status(400).send({
          mensaje: "La persona o empresa no se encuentra afiliada"
        });
      }
    } else {
      let afiliadoTransformado: any = {};
      const afiliado: any = await this.afiliadoServicio.obtenerAfiliadoPorDocumento(
        parametros.documento
      );
      if (afiliado) {
        res.status(400).send({
          mensaje: "La persona o empresa se encuentra afiliada"
        });
      } else {
        const afiliadoPrecargado: any = await this.afiliadoServicio.obtenerAfiliadoPreCargadoPorDocumento(
          parametros.documento
        );
        if (afiliadoPrecargado) {
          afiliadoTransformado = this.afiliadoTransformador.transformador(
            afiliadoPrecargado
          );
          res.status(200).send({
            resultado: { data: afiliadoTransformado },
            mensaje: "La persona o empresa tiene información precargada"
          });
        } else {
          res.status(400).send({
            mensaje: "La persona o empresa no tiene información precargada"
          });
        }
      }
    }
  };

  public precargarAfiliado = async (req: Request, res: Response) => {
    const afiliado: IAfiliado = req.body;
    const afiliadoCreado = await this.afiliadoServicio.precargarAfiliado(
      afiliado
    );
    if (afiliadoCreado) {
      const response = this.afiliadoTransformador.transformador(afiliadoCreado);
      res
        .status(200)
        .send({ mensaje: "Afiliado creado exitosamente", data: response });
      this.logServicio.crearLog({
        codigo: "200",
        usuario: "TEST",
        atributos: {
          error: {
            metodo: "precargarAfiliado",
            mensaje: "Afiliado creado exitosamente",
            data: response
          }
        },
        fechaCreacion: new Date()
      });
    } else {
      res
        .status(400)
        .send({ mensaje: "Ya existe un afiliado con este documento " });
      this.logServicio.crearLog({
        codigo: "400",
        usuario: "TEST",
        atributos: {
          error: {
            metodo: "precargarAfiliado",
            mensaje: "Ya existe un afiliado con este documento"
          }
        },
        fechaCreacion: new Date()
      });
    }
  };

  public guardarAfiliado = async (req: Request, res: Response) => {
    // const afiliado: IAfiliado = req.body;
    // const afiliadoGuardado = await this.afiliadoServicio.guardarAfiliado(
    //   afiliado
    // );
    // if (afiliadoGuardado) {
    //   res.status(200).send({ mensaje: "Afiliado actualizado exitosamente" });
    // } else {
    //   res.status(400).send({ mensaje: "No se pudo actualizar el afiliado" });
    // }
  };

  public obtenerProcesoAfiliado = async (req: Request, res: Response) => {
    // const parametros = req.params;
    // const afiliadoEnProcesoAfiliacion = await this.afiliadoServicio.obtenerAfiliadoPreCargadoPorDocumento(
    //   parametros.documento
    // );
    // if (afiliadoEnProcesoAfiliacion) {
    //   res.status(200).send({
    //     resultado: {
    //       data: this.afiliadoTransformador.transformador(afiliadoEnProcesoAfiliacion)
    //     },
    //     mensaje: "Se encontro el afiliado"
    //   });
    // } else {
    //   res.status(200).send({
    //     resultado: {
    //       data: {}
    //     },
    //     mensaje: "No se encuentra el afiliado"
    //   });
    // }
  };

  public consultarEmpresaAfiliada = async (req: Request, res: Response) => {
    const { id } = req.params;

    const empresaAfiliado: any = await this.afiliadoServicio.consultarEmpresaAfiliada(
      id
    );
    if (empresaAfiliado) {
      let responseRucJuri: any,
        responseRucNatural: any,
        responsePasaporte: any,
        responseCedula: any;

      switch (empresaAfiliado.tipo) {
        case TIPOAFILIADO.EMPRESA:
          // code block
          responseRucJuri = await this.afiliadoTransformador.transformadorEmpresa(
            empresaAfiliado
          );
          res.status(200).send({
            mensaje: "Consulta empresa juridica exitosamente",
            data: responseRucJuri
          });

          break;
        case TIPOAFILIADO.PERSONA:
          // code block
          switch (empresaAfiliado.identificacion.tipoDocumento) {
            case TIPODOCUMENTO.RUC:
              // code block

              responseRucNatural = await this.afiliadoTransformador.transformadorPersonaRucNatural(
                empresaAfiliado
              );
              res.status(200).send({
                mensaje: "Consulta empresa natural  exitosamente",
                data: responseRucNatural
              });

              break;
            case TIPODOCUMENTO.PASAPORTE:
              // code block

              responsePasaporte = await this.afiliadoTransformador.transformadorPersonaPasaporte(
                empresaAfiliado
              );
              res.status(200).send({
                mensaje: "Consulta pasaporte exitosamente",
                data: responsePasaporte
              });

              break;
            case TIPODOCUMENTO.CEDULA:
              // code block
              responseCedula = await this.afiliadoTransformador.transformadorPersonaCedula(
                empresaAfiliado
              );
              res.status(200).send({
                mensaje: "Consulta  cédula exitosamente",
                data: responseCedula
              });

              break;
          }

          break;
      }
    } else {
      res
        .status(400)
        .send({ mensaje: "No se encuentra documento del afiliado " });
    }
  };

  public actualizarEmpresaAfiliada = async (req: Request, res: Response) => {
    const { id } = req.params;
    const empresa: any = req.body;
    const empresaAfiliado: any = await this.afiliadoServicio.actualizarEmpresaAfiliado(
      id,
      empresa
    );
    if (empresaAfiliado) {
      res.status(200).send({
        mensaje: "Actualización empresa exitosamente"
      });
    } else {
      res.status(400).send({ mensaje: "No se pudo actualizar la empresa " });
    }
  };

  public consultarNotificacionAfiliado = async (
    req: Request,
    res: Response
  ) => {
    const { id } = req.params;
    let responseRecNotificador: any;
    const consultaNotificadorAfiliado: any = await this.afiliadoServicio.consultarNotificacionAfiliado(
      id
    );

    if (consultaNotificadorAfiliado) {
      responseRecNotificador = await this.afiliadoTransformador.transformadorConsulta(
        consultaNotificadorAfiliado
      );
      res.status(200).send({
        mensaje: "Consulta Notificación exitosamente",
        data: responseRecNotificador
      });
    } else {
      res.status(400).send({ mensaje: "Consulta Notificaciòn no existosa " });
    }
  };

  public insertarNotificacionAfiliado = async (req: Request, res: Response) => {
    const { id } = req.params;
    const notificacion: any = req.body;
    const notificacionGuardado = await this.afiliadoServicio.insertarNotificacionAfiliado(
      id,
      notificacion
    );
    if (notificacionGuardado) {
      res.status(200).send({
        mensaje: "Notificación guardado exitosamente"
      });
    } else {
      res.status(400).send({ mensaje: "No se pudo guardar notificación  " });
    }
  };
  public obtenerUsuariosAfiliado = async (req: Request, res: Response) => {
    const { afiliadoId } = req.params;
    const afiliado: any = await this.afiliadoServicio.usuarioAfiliado(
      afiliadoId
    );
    if (afiliado) {
      const response = this.afiliadoTransformador.transformadorAdminUsuarios(
        afiliado
      );
      res
        .status(200)
        .send({ mensaje: "Afiliado consultado exitosamente", data: response });
    } else {
      res.status(400).send({ mensaje: "No se encuentra el afiliado " });
    }
  };

  public guardarUsuariosAfiliado = async (req: Request, res: Response) => {
    const { afiliadoId } = req.params;
    const usuario: any = req.body;
    const afiliadoGuardado = await this.afiliadoServicio.actualizarUsuariosAfiliado(
      afiliadoId,
      usuario
    );
    if (afiliadoGuardado) {
      res.status(200).send({ mensaje: "Afiliado actualizado exitosamente" });
    } else {
      res.status(400).send({ mensaje: "No se pudo actualizar el afiliado" });
    }
  };

  public obtenerCuentasAfiliado = async (req: Request, res: Response) => {
    //  const { afiliadoId } = req.params;
    const afiliadoId = req.body;
    const afiliado: any = await this.afiliadoServicio.usuarioAfiliado(
      afiliadoId.id
    );
    if (afiliado) {
      const response = this.afiliadoTransformador.transformadorAdminCuentas(
        afiliado
      );
      res
        .status(200)
        .send({ mensaje: "Afiliado consultado exitosamente", data: response });
    } else {
      res.status(400).send({ mensaje: "No se encuentra el afiliado " });
    }
  };

  public cuentasAfiliado = async (req: Request, res: Response) => {
    const { afiliadoId } = req.params;
    const usuario: any = req.body;
    const afiliadoGuardado = await this.afiliadoServicio.cuentasAfiliado(
      afiliadoId,
      usuario
    );
    if (afiliadoGuardado) {
      res.status(200).send({ mensaje: "Afiliado actualizado exitosamente" });
    } else {
      res.status(400).send({ mensaje: "No se pudo actualizar el afiliado" });
    }
  };

  public afiliadoPorIdUsuario = async (req: Request, res: Response) => {
    const { usuarioId } = req.params;
    const afiliadoConsultado = await this.afiliadoServicio.consultarUsuarioAfiliadoPorId(
      usuarioId
    );
    if (afiliadoConsultado) {
      const response = this.afiliadoTransformador.transformador(
        afiliadoConsultado
      );
      res
        .status(200)
        .send({ mensaje: "Afiliado consultado exitosamente", data: response });
    } else {
      res.status(400).send({
        mensaje: "No existe un afiliado con el id de usuario ingresado"
      });
    }
  };

  public cuentasAfiliado1 = async (req: Request, res: Response) => {
    const { afiliadoId } = req.params;
    const usuario: any = req.body;

    const afiliadoGuardado = await this.afiliadoServicio.cuentasAfiliado(
      afiliadoId,
      usuario
    );
    if (afiliadoGuardado) {
      res.status(200).send({ mensaje: "Afiliado actualizado exitosamente" });
    } else {
      res.status(400).send({ mensaje: "No se pudo actualizar el afiliado" });
    }
  };

  public eliminarCuentasAfiliado = async (req: Request, res: Response) => {
    const { afiliadoId } = req.params;
    const cuenta: any = req.body;
    const afiliadoGuardado = await this.afiliadoServicio.eliminarCuentasAfiliado(
      afiliadoId,
      cuenta
    );
    if (afiliadoGuardado) {
      res.status(200).send({ mensaje: "Cuenta eliminada exitosamente" });
    } else {
      res.status(400).send({ mensaje: "No se pudo eliminar la cuenta" });
    }
  };

  public eliminarUsuariosAfiliado = async (req: Request, res: Response) => {
    const { afiliadoId } = req.params;
    const usuario: any = req.body;
    const afiliadoGuardado = await this.afiliadoServicio.eliminarUsuariosAfiliado(
      afiliadoId,
      usuario
    );
    if (afiliadoGuardado) {
      res.status(200).send({ mensaje: "Usuario eliminado exitosamente" });
    } else {
      res.status(400).send({ mensaje: "No se pudo eliminar el usuario" });
    }
  };

  public consultaUsuarioAfiliadoPorUsername = async (
    req: Request,
    res: Response
  ) => {
    const { username } = req.params;
    const usuarioConsulta = await this.afiliadoServicio.consultarUsuarioAfiliadoPorNombre(
      username
    );
    if (usuarioConsulta) {
      const response = this.afiliadoTransformador.transformador(
        usuarioConsulta
      );
      res
        .status(200)
        .send({ mensaje: "Usuario consultado exitosamente", data: response });
    } else {
      res.status(400).send({ mensaje: "No se encuentra el usuario " });
    }
  };


  public consultaUsuarioIdentificacion = async (req: Request, res: Response) => {
    const params = req.body;
    const usuarioConsulta = await this.afiliadoServicio.consultarUsuarioPorIdentificacionAplicacion(
      params.identificacion
    );
    if (usuarioConsulta) {
      const usuarioTransformado = this.afiliadoTransformador.transformador(
        usuarioConsulta
      );
      res.status(200).send({
        data: usuarioTransformado,
        mensaje: "Usuario consultado exitosamente"
      });
    } else {
      res.status(400).send({ mensaje: "Usuario consultado no existe" });
    }
  };


  public imagenCheque = async (req: Request, res: Response) => {
    const params = req.body;
    this.afiliadoServicio.imagenCheque(
      params, res
    );

  };

  public imagenQR = async (req: Request, res: Response) => {
    try {
      const params = req.body;

      const paguese = params.paguese + "; " + params.ciudad + "; " + params.fecha + "; " + params.monto + "; " + params.numeroCuenta + "; " + params.numeroCheque + "; " + params.rutaTransito;
      var qr = require('qr-image');
      var fs = require('fs');
      var code = await qr.image(paguese, { type: 'png' });
      var output = await fs.createWriteStream('./imagenQR.png')
      code.pipe(output);
      res.status(200).send({
        mensaje: "OK"
      });
    }
    catch (e) {

      res.status(400).send({
        resultado: {},
        mensaje: "Ocurrió un error al obtener el servicio" + e
      });
    }

  };



}
