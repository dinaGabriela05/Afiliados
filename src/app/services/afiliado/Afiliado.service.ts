import Afiliado, {
  ESTADOSAFILIADO,
  TIPOAFILIADO,
  TIPODOCUMENTO
} from "../../models/Afiliado";
import AfiliadoValidador from "../../validators/Afiliado.validator";
import { Inject, Service } from "typedi";
import AfiliadoRepositorio from "../../repositories/Afiliado.repository";
import UsuarioRepositorio from "../../repositories/Usuario.repository";
import UsuarioServicio from "../usuario/Usuario.service";
import ReceptorNotificacionServicio from "../receptorNotificacion/ReceptorNotificacion.service";
import AutenticadorServicio from "../autenticador/Autenticador.service";
import LogServicio from "../log/Log.service";
import { errorLogger } from "../../../utils/logs/logs.utils";
import ldap from "ldapjs";
import { keyVault } from "../../../config/validators/keyVault";
import { fileURLToPath, pathToFileURL } from "url";

@Service()
export default class AfiliadoServicio {
  @Inject(type => AfiliadoRepositorio)
  afiliadoRepositorio: AfiliadoRepositorio;
  @Inject(type => UsuarioRepositorio)
  usuarioRepositorio: UsuarioRepositorio;
  @Inject(type => AfiliadoValidador)
  afiliadoValidador: AfiliadoValidador;
  @Inject(type => UsuarioServicio)
  usuarioServicio: UsuarioServicio;
  @Inject(type => ReceptorNotificacionServicio)
  receptorNotificacionServicio: ReceptorNotificacionServicio;
  @Inject(type => AutenticadorServicio)
  autenticadorServicio: AutenticadorServicio;

  @Inject(type => LogServicio)
  logServicio: LogServicio;

  async obtenerTodos(_page: any, _limit: any, filter: any) {
    const afiliados = await this.afiliadoRepositorio.obtenerTodos(
      filter,
      parseInt(_page),
      parseInt(_limit)
    );
    return afiliados;
  }

  async autenticateDN(username: string, password: string, datos: any) {

    const llave = await keyVault([
      'LDAP',
      'OULDAP',
      'DCLDAP',
      'CONEXIONCLASS',
      'DCSECUNDARIOLDAP'
    ]);
    const host = llave.LDAP as string;

    const client = ldap.createClient({
      url: host
    });

    client.bind(username, password, function (err) {
      if (err) {
        console.log("Error en la conexion");
      } else {
        console.log("Conexion Exitosa");
        const entry = {
          sn: datos.sn,
          cn: datos.cn,
          description: datos.description,
          mail: datos.mail,
          mobile: datos.mobile,
          o: datos.o,
          userPassword: datos.userPassword,
          givenName: datos.givenName,
          objectclass: llave.CONEXIONCLASS as string
        };
        const ou = llave.OULDAP as string;

        const dc = llave.DCLDAP as string;

        const dc_secundario = llave.DCSECUNDARIOLDAP as string;

        client.add(
          "uid=" +
          datos.uid +
          ",ou=" +
          ou +
          ",dc=" +
          dc +
          ",dc=" +
          dc_secundario,
          entry,
          err => {
            if (err) {
              console.log("error" + err);
            } else {
              console.log("Usuario Ingresado Exitosamente");
            }
          }
        );
      }
    });
  }

  async crearAfiliado(id: string, afiliado: any) {
    let afiliadoGuardado = false;
    const usuariosIds: any = [],
      notificadoresIds: any = [];
    let consultaIdAfiliado: any, nuevoUsuario: any, notificadoresGuardados: any;
    const usuariosIngresados: any = [];
    const llave = await keyVault([
      'KeyChekex'
    ]);

    switch (afiliado.tipo) {
      case TIPOAFILIADO.EMPRESA:
        await this.afiliadoValidador.crearAfiliadoJuridico(afiliado);
        consultaIdAfiliado = await this.afiliadoRepositorio.consultaAfiliado(
          id,
          afiliado.identificacion.documento
        );
        if (consultaIdAfiliado) {
          if (afiliado.usuarios) {
            for (let i = 0; i < afiliado.usuarios.length; i++) {
              nuevoUsuario = await this.usuarioServicio.crearUsuario(
                afiliado.usuarios[i]
              );
              if (nuevoUsuario.status_code && nuevoUsuario.status_code != 200) {
                return false;
              } else {
                usuariosIngresados.push(nuevoUsuario.data);
                usuariosIds.push(nuevoUsuario.data.id);
              }
            }
            if (afiliado.notificadores) {
              notificadoresGuardados = await this.receptorNotificacionServicio.crearMasivoReceptorNotificacion(
                afiliado.notificadores
              );
              if (notificadoresGuardados && notificadoresGuardados.length > 0) {
                for (let i = 0; i < notificadoresGuardados.length; i++) {
                  this.receptorNotificacionServicio.envioReceptorNotificaciones(
                    notificadoresGuardados
                  );
                  notificadoresIds.push(notificadoresGuardados[i]._id);
                }
              }
            }
            afiliado.usuarios = usuariosIds;
            afiliado.notificadores = notificadoresIds;
            const actualizacionAfiliados = await this.afiliadoRepositorio.actualizarAfiliado(
              id,
              afiliado
            );
            if (actualizacionAfiliados) {
              if (actualizacionAfiliados.n === 1) {
                usuariosIngresados.map(async (usuarios: any) => {
                  var crypto = require('crypto-js/crypto-js.js');
                  var AESKEY = llave.KeyChekex as string;
                  const usuario = crypto.AES.decrypt(usuarios.password, AESKEY).toString(crypto.enc.Utf8);

                  this.autenticadorServicio.envioNotificacion(
                    usuarios.email,
                    "test121",
                    4,
                    {
                      tool: {
                        name: usuarios.nombre + " " + usuarios.apellido,
                        username: usuarios.username,
                        password: usuario
                      }
                    },
                    [
                      {
                        id: 2,
                        params: {}
                      }
                    ]
                  );
                });
                afiliadoGuardado = true;
              }
            } else {
              errorLogger.error("Client Error", {
                codigo: "200",
                usuario: "TEST",
                atributos: {
                  error: {
                    metodo: "crearAfiliado|actualizarAfiliado",
                    mensaje: "No se pudo Actulalizar usuario con id" + id
                  }
                }
              });
              this.logServicio.crearLog({
                codigo: "200",
                usuario: "TEST",
                atributos: {
                  error: {
                    metodo: "crearAfiliado|actualizarAfiliado",
                    mensaje: "No se pudo Actulalizar usuario con id" + id
                  }
                },
                fechaCreacion: new Date()
              });
            }
          }
        } else {
          this.logServicio.crearLog({
            codigo: "200",
            usuario: "TEST",
            atributos: {
              error: {
                metodo: "crearAfiliado|consultaAfiliado",
                mensaje: "No existe Id: " + id
              }
            },
            fechaCreacion: new Date()
          });
        }
        break;
      case TIPOAFILIADO.PERSONA:
        switch (afiliado.identificacion.tipoDocumento) {
          case TIPODOCUMENTO.RUC:
            await this.afiliadoValidador.crearAfiliadoPersonaRuc(afiliado);
            consultaIdAfiliado = await this.afiliadoRepositorio.consultaAfiliado(
              id,
              afiliado.identificacion.documento
            );
            if (consultaIdAfiliado) {
              if (afiliado.usuarios) {
                for (let i = 0; i < afiliado.usuarios.length; i++) {
                  nuevoUsuario = await this.usuarioServicio.crearUsuario(
                    afiliado.usuarios[i]
                  );
                  if (
                    nuevoUsuario.status_code &&
                    nuevoUsuario.status_code != 200
                  ) {
                    console.log(nuevoUsuario.http_mensaje);
                    return false;
                  } else {
                    usuariosIngresados.push(nuevoUsuario.data);
                    usuariosIds.push(nuevoUsuario.data.id);
                  }
                }

                if (afiliado.notificadores) {
                  notificadoresGuardados = await this.receptorNotificacionServicio.crearMasivoReceptorNotificacion(
                    afiliado.notificadores
                  );
                  notificadoresGuardados.map((notificadores: any) => {
                    notificadoresIds.push(notificadores._id);
                  });
                }
                afiliado.usuarios = usuariosIds;
                afiliado.notificadores = notificadoresIds;
                const actualizacionAfiliados = await this.afiliadoRepositorio.actualizarAfiliado(
                  id,
                  afiliado
                );
                if (actualizacionAfiliados) {
                  if (actualizacionAfiliados.n === 1) {
                    usuariosIngresados.map((usuarios: any) => {
                      this.autenticadorServicio.envioNotificacion(
                        usuarios.email,
                        "test",
                        4,
                        {
                          tool: {
                            name: usuarios.nombre + " " + usuarios.apellido,
                            username: usuarios.username,
                            password: usuarios.password
                          }
                        },
                        [
                          {
                            id: 2,
                            params: {}
                          }
                        ]
                      );
                    });
                    afiliadoGuardado = true;
                  }
                }
              }
            } else {
              this.logServicio.crearLog({
                codigo: "200",
                usuario: "TEST",
                atributos: {
                  error: {
                    metodo: "crearAfiliado|crearAfiliadoPersonaRuc",
                    mensaje: "No existe Id: " + id
                  }
                },
                fechaCreacion: new Date()
              });
            }
            break;

          case TIPODOCUMENTO.CEDULA:
            await this.afiliadoValidador.crearAfiliadoPersona(afiliado);
            consultaIdAfiliado = await this.afiliadoRepositorio.consultaAfiliado(
              id,
              afiliado.identificacion.documento
            );
            if (consultaIdAfiliado) {
              if (afiliado.usuarios) {
                for (let i = 0; i < afiliado.usuarios.length; i++) {
                  nuevoUsuario = await this.usuarioServicio.crearUsuario(
                    afiliado.usuarios[i]
                  );
                  if (
                    nuevoUsuario.status_code &&
                    nuevoUsuario.status_code != 200
                  ) {
                    console.log(nuevoUsuario.http_mensaje);
                    return false;
                  } else {
                    usuariosIngresados.push(nuevoUsuario.data);
                    usuariosIds.push(nuevoUsuario.data.id);
                  }
                }

                if (afiliado.notificadores) {
                  notificadoresGuardados = await this.receptorNotificacionServicio.crearMasivoReceptorNotificacion(
                    afiliado.notificadores
                  );
                  notificadoresGuardados.map((notificadores: any) => {
                    notificadoresIds.push(notificadores._id);
                  });
                }
                afiliado.usuarios = usuariosIds;
                afiliado.notificadores = notificadoresIds;
                const actualizacionAfiliados = await this.afiliadoRepositorio.actualizarAfiliado(
                  id,
                  afiliado
                );
                if (actualizacionAfiliados) {
                  if (actualizacionAfiliados.n === 1) {
                    usuariosIngresados.map(async (usuarios: any) => {
                      var crypto = require('crypto-js/crypto-js.js');
                      var AESKEY = llave.KeyChekex as string;
                      const usuario = crypto.AES.decrypt(usuarios.password, AESKEY).toString(crypto.enc.Utf8);

                      this.autenticadorServicio.envioNotificacion(
                        usuarios.email,
                        "test121",
                        4,
                        {
                          tool: {
                            name: usuarios.nombre + " " + usuarios.apellido,
                            username: usuarios.username,
                            password: usuario
                          }
                        },
                        [
                          {
                            id: 2,
                            params: {}
                          }
                        ]
                      );
                    });
                    afiliadoGuardado = true;
                  }
                }
              }
            } else {
              this.logServicio.crearLog({
                codigo: "200",
                usuario: "TEST",
                atributos: {
                  error: {
                    metodo: "crearAfiliado|consultaAfiliado",
                    mensaje: "No existe Id: " + id
                  }
                },
                fechaCreacion: new Date()
              });
            }
            break;

          case TIPODOCUMENTO.PASAPORTE:
            await this.afiliadoValidador.crearAfiliadoPersona(afiliado);
            consultaIdAfiliado = await this.afiliadoRepositorio.consultaAfiliado(
              id,
              afiliado.identificacion.documento
            );
            if (consultaIdAfiliado) {
              if (afiliado.usuarios) {
                for (let i = 0; i < afiliado.usuarios.length; i++) {
                  nuevoUsuario = await this.usuarioServicio.crearUsuario(
                    afiliado.usuarios[i]
                  );
                  if (
                    nuevoUsuario.status_code &&
                    nuevoUsuario.status_code != 200
                  ) {
                    console.log(nuevoUsuario.http_mensaje);
                    return false;
                  } else {
                    usuariosIngresados.push(nuevoUsuario.data);
                    usuariosIds.push(nuevoUsuario.data.id);
                  }
                }

                if (afiliado.notificadores) {
                  notificadoresGuardados = await this.receptorNotificacionServicio.crearMasivoReceptorNotificacion(
                    afiliado.notificadores
                  );
                  notificadoresGuardados.map((notificadores: any) => {
                    notificadoresIds.push(notificadores._id);
                  });
                }
                afiliado.usuarios = usuariosIds;
                afiliado.notificadores = notificadoresIds;
                const actualizacionAfiliados = await this.afiliadoRepositorio.actualizarAfiliado(
                  id,
                  afiliado
                );
                if (actualizacionAfiliados) {
                  if (actualizacionAfiliados.n === 1) {
                    usuariosIngresados.map((usuarios: any) => {
                      this.autenticadorServicio.envioNotificacion(
                        usuarios.email,
                        "test",
                        4,
                        {
                          tool: {
                            name: usuarios.nombre + " " + usuarios.apellido,
                            username: usuarios.username,
                            password: usuarios.password
                          }
                        },
                        [
                          {
                            id: 2,
                            params: {}
                          }
                        ]
                      );
                    });
                    afiliadoGuardado = true;
                  }
                }
              }
            } else {
              this.logServicio.crearLog({
                codigo: "200",
                usuario: "TEST",
                atributos: {
                  error: {
                    metodo: "crearAfiliado|consultaAfiliado",
                    mensaje: "No existe Id: " + id
                  }
                },
                fechaCreacion: new Date()
              });
            }
            break;
        }

        break;
    }

    return afiliadoGuardado;
  }

  async actualizarAfiliado(id: string, afiliado: any) {
    await this.afiliadoValidador.actualizarAfiliado(afiliado);
    let afiliadoGuardado = false;
    const actualizacionAfiliado = await this.afiliadoRepositorio.actualizarAfiliado(
      id,
      afiliado
    );
    if (actualizacionAfiliado) {
      if (actualizacionAfiliado.n === 1) {
        afiliadoGuardado = true;
      }
    }
    return afiliadoGuardado;
  }

  async eliminarAfiliado(id: string) {
    await this.afiliadoValidador.eliminarAfiliado({ id: id });
    let afiliadoEliminado = false;
    const eliminacionAfiliado = await this.afiliadoRepositorio.eliminarAfiiado(
      id
    );
    if (eliminacionAfiliado) {
      if (eliminacionAfiliado.n === 1) {
        afiliadoEliminado = true;
      }
    }
    return afiliadoEliminado;
  }

  async obtenerAfiliadoPorDocumento(documento: string) {
    const afiliado = await this.afiliadoRepositorio.obtenerPorDocumento(
      documento,
      [ESTADOSAFILIADO.AFILIADO]
    );
    return afiliado;
  }

  async obtenerAfiliadoPreCargadoPorDocumento(documento: string) {
    const afiliado = await this.afiliadoRepositorio.obtenerPreCargadoPorDocumento(
      documento,
      [ESTADOSAFILIADO.PRECARGADO]
    );
    return afiliado;
  }

  async obtenerAfiliadoEnProcesoPorDocumento(documento: string) {
    // const afiliado = await this.afiliadoRepositorio.obtenerPreCargadoPorDocumento(
    //   documento, [ESTADOSAFILIADO.PROCESOAFILIACION]
    // );
    // return afiliado;
  }

  async precargarAfiliado(afiliado: any) {
    await this.afiliadoValidador.precargarAfiliadoTipo(afiliado);
    const nuevoAfiliado = new Afiliado(afiliado);
    let afiliadoGuardado,
      afiliadoUnico,
      afiliadoUnicoTipo,
      afiliadoUnicoUsuario: any;
    switch (afiliado.tipo) {
      case TIPOAFILIADO.EMPRESA:
        await this.afiliadoValidador.precargarAfiliadoJuridico(afiliado);

        afiliadoUnicoTipo = await this.afiliadoRepositorio.obtenerPorDocumentoPrecarga(
          afiliado.identificacion.documento,
          afiliado.tipo,
          [ESTADOSAFILIADO.AFILIADO]
        );

        if (!afiliadoUnicoTipo) {
          afiliadoUnico = await this.afiliadoRepositorio.obtenerPorDocumento(
            afiliado.identificacion.documento,
            [ESTADOSAFILIADO.AFILIADO, ESTADOSAFILIADO.PRECARGADO]
          );

          if (!afiliadoUnico) {
            afiliadoUnicoUsuario = await this.usuarioRepositorio.obtenerPorDocumentoUsuario(
              afiliado.identificacion.documento
            );
            if (!afiliadoUnicoUsuario) {
              afiliadoGuardado = await nuevoAfiliado.save();
            }
          }
        }
        break;
      case TIPOAFILIADO.PERSONA:
        await this.afiliadoValidador.precargarAfiliadoPersona(afiliado);
        afiliadoUnicoTipo = await this.afiliadoRepositorio.obtenerPorDocumentoPrecarga(
          afiliado.identificacion.documento,
          afiliado.tipo,
          [ESTADOSAFILIADO.AFILIADO]
        );
        if (!afiliadoUnicoTipo) {
          switch (afiliado.identificacion.tipoDocumento) {
            case TIPODOCUMENTO.RUC:
              await this.afiliadoValidador.precargarAfiliadoPersonaRUC(
                afiliado
              );
              afiliadoUnico = await this.afiliadoRepositorio.obtenerPorDocumento(
                afiliado.identificacion.documento,
                [ESTADOSAFILIADO.AFILIADO, ESTADOSAFILIADO.PRECARGADO]
              );

              if (!afiliadoUnico) {
                afiliadoUnicoUsuario = await this.usuarioRepositorio.obtenerPorDocumentoUsuario(
                  afiliado.identificacion.documento
                );
                if (!afiliadoUnicoUsuario) {
                  afiliadoGuardado = await nuevoAfiliado.save();
                }
              }
              break;
            case TIPODOCUMENTO.PASAPORTE:
              afiliadoUnico = await this.afiliadoRepositorio.obtenerPorDocumento(
                afiliado.identificacion.documento,
                [ESTADOSAFILIADO.AFILIADO, ESTADOSAFILIADO.PRECARGADO]
              );
              if (!afiliadoUnico) {
                if (!afiliadoUnico) {
                  afiliadoUnicoUsuario = await this.usuarioRepositorio.obtenerPorDocumentoUsuario(
                    afiliado.identificacion.documento
                  );
                  if (!afiliadoUnicoUsuario) {
                    afiliadoGuardado = await nuevoAfiliado.save();
                  }
                }
              }
              break;
            case TIPODOCUMENTO.CEDULA:
              afiliadoUnico = await this.afiliadoRepositorio.obtenerPorDocumento(
                afiliado.identificacion.documento,
                [ESTADOSAFILIADO.AFILIADO, ESTADOSAFILIADO.PRECARGADO]
              );

              if (!afiliadoUnico) {
                afiliadoUnicoUsuario = await this.usuarioRepositorio.obtenerPorDocumentoUsuario(
                  afiliado.identificacion.documento
                );
                if (!afiliadoUnicoUsuario) {
                  afiliadoGuardado = await nuevoAfiliado.save();
                }
              }
              break;
          }
        }
        break;
    }

    return afiliadoGuardado;
  }

  async consultarEmpresaAfiliada(id: string) {
    const empresaAfiliada = await this.afiliadoRepositorio.consultarAfiliadoId(
      id
    );
    return empresaAfiliada;
  }

  async actualizarEmpresaAfiliado(id: string, empresa: any) {
    let actualizarEmpresaGuardado = false;
    const actualizarEmpresaAfiliado = await this.afiliadoRepositorio.actualizarAfiliado(
      id,
      empresa
    );
    if (actualizarEmpresaAfiliado) {
      if (actualizarEmpresaAfiliado.n === 1) {
        actualizarEmpresaGuardado = true;
      }
    }
    return actualizarEmpresaGuardado;
  }

  async consultarNotificacionAfiliado(id: string) {
    const notificacion = await this.afiliadoRepositorio.consultarNotificacionAfiliado(
      id
    );
    return notificacion;
  }

  async insertarNotificacionAfiliado(id: string, notificacion: any) {
    await this.afiliadoValidador.insertarNotificacionAfiliado(notificacion);
    let notificacionGuardado = false;
    let notificadoresGuardados: any;
    const insertIdAfiliado: any = await this.afiliadoRepositorio.consultarAfiliadoId(
      id
    );
    if (insertIdAfiliado) {
      notificadoresGuardados = await this.receptorNotificacionServicio.crearMasivoReceptorNotificacion(
        notificacion.notificadores
      );
      if (notificadoresGuardados) {
        notificadoresGuardados.map((notificadores: any) => {
          insertIdAfiliado.notificadores.push(notificadores._id);
        });
        const actualizacionAfiliados = await this.afiliadoRepositorio.actualizarAfiliado(
          id,
          insertIdAfiliado
        );
        if (actualizacionAfiliados) {
          if (actualizacionAfiliados.n === 1) {
            notificacionGuardado = true;
          }
        }
      }
    }
    return notificacionGuardado;
  }

  async usuarioAfiliado(id: string) {
    const usuario = await this.afiliadoRepositorio.consultarAfiliadoId(id);
    return usuario;
  }

  async actualizarUsuariosAfiliado(id: string, usuario: any) {
    await this.afiliadoValidador.actualizarUsuariosAfiliado(usuario);
    let afiliadoGuardado = false;
    const usuarioGuardado = await this.usuarioServicio.crearUsuario(usuario);
    if (usuarioGuardado) {
      const afiliado: any = await this.afiliadoRepositorio.consultaAfiliadoPorId(
        id
      );
      afiliado.usuarios.push(usuarioGuardado.data.id);
      const actualizacionAfiliado = await this.afiliadoRepositorio.actualizarAfiliado(
        id,
        afiliado
      );
      if (actualizacionAfiliado) {
        if (actualizacionAfiliado.n === 1) {
          afiliadoGuardado = true;
        }
      }
    }
    return afiliadoGuardado;
  }

  async cuentasAfiliado(id: string, cuenta: any) {
    await this.afiliadoValidador.cuentaAfiliado(cuenta);
    let afiliadoGuardado = false;
    const afiliado: any = await this.afiliadoRepositorio.consultaAfiliadoPorId(
      id
    );
    if (afiliado) {
      if (!cuenta._id) {
        afiliado.cuentas.push(cuenta);
        const actualizacionAfiliado = await this.afiliadoRepositorio.actualizarAfiliado(
          id,
          afiliado
        );
        if (actualizacionAfiliado) {
          if (actualizacionAfiliado.n === 1) {
            afiliadoGuardado = true;
          }
        }
      } else {
        const actualizacionAfiliado = await this.afiliadoRepositorio.actualizarAfiliadoCuenta(
          id,
          cuenta._id,
          cuenta
        );

        if (actualizacionAfiliado) {
          afiliadoGuardado = true;
        }
      }
    }

    return afiliadoGuardado;
  }

  async eliminarUsuariosAfiliado(id: string, usuario: any) {
    await this.afiliadoValidador.eliminarUsuariosAfiliado(usuario);
    let afiliadoGuardado = false;
    const eliminacionUsuarioAfiliado = await this.usuarioServicio.eliminarUsuario(
      usuario._id
    );
    if (eliminacionUsuarioAfiliado) {
      const actualizacionAfiliado = await this.afiliadoRepositorio.eliminarUsuariosAfiliado(
        id,
        usuario._id
      );
      if (actualizacionAfiliado) {
        if (actualizacionAfiliado.n === 1) {
          afiliadoGuardado = true;
        }
      }
    }
    return afiliadoGuardado;
  }

  async eliminarCuentasAfiliado(id: string, cuenta: any) {
    await this.afiliadoValidador.eliminarCuentasAfiliado(cuenta);
    let afiliadoGuardado = false;
    const actualizacionAfiliado = await this.afiliadoRepositorio.eliminarCuentasAfiliado(
      id,
      cuenta._id
    );
    if (actualizacionAfiliado) {
      if (actualizacionAfiliado.n === 1) {
        afiliadoGuardado = true;
      }
    }
    return afiliadoGuardado;
  }

  async consultarUsuarioAfiliadoPorNombre(username: string) {
    let afiliado = null;
    const usuario = await this.usuarioRepositorio.consultarUsuarioPorNombre(
      username
    );
    if (usuario) {
      afiliado = await this.afiliadoRepositorio.consultarUsuarioAfiliadoUserId(
        usuario._id
      );
    }
    return afiliado;
  }

  async consultarUsuarioAfiliadoPorId(usuarioId: string) {
    const afiliado = await this.afiliadoRepositorio.consultarUsuarioAfiliadoUserId(
      usuarioId
    );
    return afiliado;
  }


  async consultarUsuarioPorIdentificacionAplicacion(identificacion: string) {
    const obtenerUsuario = await this.afiliadoRepositorio.consultarUsuarioPorIdentificacion(
      identificacion
    );
    return obtenerUsuario;
  }


  async imagenCheque(data: any, res: any) {

    try {
      const { registerFont, createCanvas, loadImage } = require('canvas')
      registerFont('Cmc7.ttf', { family: 'CMC7' });
      registerFont('Swiss721BT-RomanCondensed.otf', { family: 'Swiss721BT-RomanCondensed' });
    
      const firma = await this.usuarioRepositorio.firma(
        data.idBanco
      );

      if (firma) {

        const firmaData = firma.get("imagenFirma");
        const fs = require('fs')

        const conversor = require('conversor-numero-a-letras-es-ar');
        const width = 914
        const height = 432

        const canvas = createCanvas(width, height)
        const context = canvas.getContext('2d')
        let ClaseConversor = conversor.conversorNumerosALetras;
        let miConversor = new ClaseConversor();
        const monto = data.monto.split(".");
        const cuentaDivision = data.cuenta.substring("0", "2")
        const cuentaDivision1=data.cuenta.substring("2","5")
        const finalCuenta=cuentaDivision+"-"+cuentaDivision1
        const finalCuentaTresDigitos=data.cuenta.substring("5","8")
        let montoEntero = "";
        let montoDecimal = "";
        let montoLetras = "";
        if (monto.length >= 2) {
          montoEntero = monto[0];
          montoDecimal = monto[1];
          var conversionMontoEntero = miConversor.convertToText(montoEntero);
          var conversionMontoDecimal = montoDecimal;
          montoLetras = conversionMontoEntero + " " + "con" + " " + conversionMontoDecimal + "/100"
        }
        else {

          montoLetras = miConversor.convertToText(data.monto) + " " + "con" + " " + "00/100";
        }

        let numeroChequeConcatenado = "{" + data.numerocheque
        let rutaTransitoConcatenado = "}" + data.rutaTransito + "}"
        let cuentaConcatenado = data.cuenta + "["
        let pinConcatenado = data.pin + "]"
        const imagen1 = await loadImage(data.imagenCheque)
        context.drawImage(imagen1, 0, 0, 914, 432)
        context.font = "18px Swiss721BT-RomanCondensed";
        context.fillText(finalCuenta, 420, 50)
        context.fillText(finalCuentaTresDigitos, 436, 75)
        context.fillText(data.pin, 500, 87)
        context.font = "24px Swiss721BT-RomanCondensed";
        context.fillText(data.numerocheque, 703, 98)
        context.font = "20px Swiss721BT-RomanCondensed";
        context.fillText(data.nombre, 130, 130)
        context.font = "24px Swiss721BT-RomanCondensed";
        context.fillText(data.monto, 700, 130)
        context.font = "20px Swiss721BT-RomanCondensed";
        context.fillText(montoLetras, 130, 168)
        context.fillText(data.ciudad, 40, 240)
        context.fillText(data.fecha, 230, 240)
        context.font = "20px CMC7";
        context.fillText(numeroChequeConcatenado, 10, 392)
        context.fillText(rutaTransitoConcatenado, 160, 392)
        context.fillText(cuentaConcatenado, 360, 392)
        context.fillText(data.tipoCheque, 550, 392)
        context.fillText(pinConcatenado, 800, 392)
        context.font = "16px Swiss721BT-RomanCondensed";
        context.fillText("CTA.  " + data.cuenta, 20, 300)
        context.fillText(data.nombreBeneficiario, 20, 320)


        const imagen2 = await loadImage('./imagenQR.png')
        context.drawImage(imagen2, 427, 238, 100, 100)
        const imagenChequeQrFirma = await loadImage(firmaData)
        context.drawImage(imagenChequeQrFirma, 600, 220, 140, 140)
        const buffer2 = canvas.toBuffer('image/png')
        fs.writeFileSync('./imagenChequeQr.png', buffer2)
        var imageAsBase64 = fs.readFileSync('./imagenChequeQr.png', 'base64');
        res.status(200).send({
          resultado: { "imagenBase": imageAsBase64 },
          mensaje: "ok"
        });

      } else {

        res.end("error en el servicio no sencuentra firma");
      }

    } catch (e) {
      res.status(400).send({
        resultado: {},
        mensaje: "Ocurrió no hay codigo" + e
      });
    }

  }


  async imagenCheque1(data: any, res: any) {

    try {
      const { registerFont, createCanvas, loadImage } = require('canvas')
      registerFont('Cmc7.ttf', { family: 'CMC7' });
      registerFont('Swiss721BT-RomanCondensed.otf', { family: 'Swiss721BT-RomanCondensed' });
      registerFont('Lobster_1.3.otf', { family: 'Lobster' });
      
      const firma = await this.usuarioRepositorio.firma(
        data.idBanco
      );

      if (firma) {

        const firmaData = firma.get("imagenFirma");
        const fs = require('fs')

        const conversor = require('conversor-numero-a-letras-es-ar');
        const width = 914
        const height = 432

        const canvas = createCanvas(width, height)
        const context = canvas.getContext('2d')
        let ClaseConversor = conversor.conversorNumerosALetras;
        let miConversor = new ClaseConversor();
        const monto = data.monto.split(".");
        const cuentaDivision = data.cuenta.substring("0", "2")
        const cuentaDivision1=data.cuenta.substring("2","5")
        const finalCuenta=cuentaDivision+"-"+cuentaDivision1
        const finalCuentaTresDigitos=data.cuenta.substring("5","8")
        let montoEntero = "";
        let montoDecimal = "";
        let montoLetras = "";
        let conversionMontoDecimal=""
        let conversionMontoEntero=""
        if (monto.length >= 2) {
          montoEntero = monto[0];
          montoDecimal = monto[1];
          conversionMontoEntero = miConversor.convertToText(montoEntero);
          conversionMontoDecimal = montoDecimal;
          montoLetras = conversionMontoEntero + " " + "con" + " " + conversionMontoDecimal + "/100"
        }
        else {

          montoLetras = miConversor.convertToText(data.monto) + " " + "con" + " " + "00/100";
        }

        let a = montoLetras.length;

        let numeroChequeConcatenado = "{" + data.numerocheque
        let rutaTransitoConcatenado = "}" + data.rutaTransito + "}"
        let cuentaConcatenado = data.cuenta + "["
        let pinConcatenado = data.pin + "]"
        const imagen1 = await loadImage(data.imagenCheque)
        context.drawImage(imagen1, 0, 0, 914, 432)
        context.font = "18px Swiss721BT-RomanCondensed";
        context.fillText(finalCuenta, 420, 50)
        context.fillText(finalCuentaTresDigitos, 436, 75)
        context.fillText(data.pin, 500, 87)
        context.font = "24px Swiss721BT-RomanCondensed";
        context.fillText(data.numerocheque, 703, 98)
        context.font = "20px Swiss721BT-RomanCondensed";
        context.fillText(data.nombre, 130, 130)
        context.font = "24px Swiss721BT-RomanCondensed";
        context.fillText(data.monto, 700, 130)
        context.font = "20px Swiss721BT-RomanCondensed";
        context.fillText(montoLetras, 130, 168)
        context.fillText(data.ciudad, 40, 240)
        context.fillText(data.fecha, 230, 240)
        context.font = "20px CMC7";
        context.fillText(numeroChequeConcatenado, 10, 392)
        context.fillText(rutaTransitoConcatenado, 160, 392)
        context.fillText(cuentaConcatenado, 360, 392)
        context.fillText(data.tipoCheque, 550, 392)
        context.fillText(pinConcatenado, 800, 392)
        context.font = "16px Swiss721BT-RomanCondensed";
        context.fillText("CTA.  " + data.cuenta, 20, 300)
        context.fillText(data.nombreBeneficiario, 20, 320)


        const imagen2 = await loadImage('./imagenQR.png')
        context.drawImage(imagen2, 427, 238, 100, 100)
        const imagenChequeQrFirma = await loadImage(firmaData)
        context.drawImage(imagenChequeQrFirma, 600, 220, 140, 140)
        const buffer2 = canvas.toBuffer('image/png')
        fs.writeFileSync('./imagenChequeQr.png', buffer2)
        var imagenProcesada = fs.readFileSync('./imagenChequeQr.png');
        var img = Buffer.from(imagenProcesada, 'base64');
        res.set({
          'Content-Type': 'image/png',
          'Content-Length': img.length
        })
        res.end(imagenProcesada, 'binary');

      } else {

        res.end("error en el servicio no sencuentra firma");
      }

    } catch (e) {
      res.status(400).send({
        resultado: {},
        mensaje: "Ocurrió no hay codigo" + e
      });
    }

  }


}
