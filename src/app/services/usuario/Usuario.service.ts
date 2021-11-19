import UsuarioValidador from "../../validators/Usuario.validator";
import { Inject, Service } from "typedi";
import UsuarioRepositorio from "../../repositories/Usuario.repository";
import RolTransformador from "../../transformers/Rol.transformer";
import Usuario from "../../models/Usuario";
import { UsuariosProvider } from "../../providers/Usuarios.provider";

@Service()
export default class UsuarioServicio {
  @Inject(type => UsuarioRepositorio)
  usuarioRepositorio: UsuarioRepositorio;
  @Inject(type => UsuarioValidador)
  usuarioValidador: UsuarioValidador;
  @Inject(type => RolTransformador)
  rolTransformador: RolTransformador;
  @Inject(type => UsuariosProvider)
  usuariosProvider: UsuariosProvider;

  async obtenerTodos(_page: any, _limit: any, filter: any) {
    const usuarios = await this.usuarioRepositorio.obtenerTodos(
      filter,
      parseInt(_page),
      parseInt(_limit)
    );
    return usuarios;
  }

  async crearUsuario(usuario: any) {
    await this.usuarioValidador.crearUsuario(usuario);
    const nuevoUsuario = await this.usuariosProvider.crearUsuario(usuario);
    return nuevoUsuario;
  }

  async actualizarUsuario(id: string, usuario: any) {
    await this.usuarioValidador.actualizarUsuario(usuario);
    let usuarioGuardado = false;
    const actualizacionUsuario = await this.usuarioRepositorio.actualizarUsuario(
      id,
      usuario
    );
    console.log(id, usuario);
    console.log(actualizacionUsuario);
    if (actualizacionUsuario) {
      if (actualizacionUsuario.n === 1) {
        usuarioGuardado = true;
      }
    }
    return usuarioGuardado;
  }

  async eliminarUsuario(id: string) {
    await this.usuarioValidador.eliminarUsuario({ id: id });
    let usuarioEliminado = false;
    const eliminacionUsuario = await this.usuarioRepositorio.eliminarUsuario(
      id
    );
    if (eliminacionUsuario) {
      if (eliminacionUsuario.n === 1) {
        usuarioEliminado = true;
      }
    }
    return usuarioEliminado;
  }

  async crearMasivoUsuarios(usuarios: any) {
    const usuariosGuardados = await Usuario.create(usuarios);
    return usuariosGuardados;
  }

  async consultaUsuario(id: string) {
    const usuario = await this.usuarioRepositorio.consultarUsuarioId(id);
    return usuario;
  }

  async consultarUsuarioPorNombre(nombre: string, id: any = null) {
    const obtenerUsuario = await this.usuarioRepositorio.consultarUsuarioPorNombre(
      nombre
    );
    return obtenerUsuario;
  }

  async actualizarConexionUsuario(username: string, usuario: any) {
    await this.usuarioValidador.actualizarConexionUsuario(usuario);
    let usuarioGuardado = false;
    const actualizacionUsuario = await this.usuarioRepositorio.actualizarUsuarioPorUsername(
      username,
      usuario
    );
    if (actualizacionUsuario) {
      if (actualizacionUsuario.n === 1) {
        usuarioGuardado = true;
      }
    }
    return usuarioGuardado;
  }

  async actualizarScanReferenceUsuario(username: string, usuario: any) {
    await this.usuarioValidador.actualizarScanReferenceUsuario(usuario);
    let usuarioGuardado = false;
    const actualizacionUsuario = await this.usuarioRepositorio.actualizarUsuarioPorUsername(
      username,
      usuario
    );
    if (actualizacionUsuario) {
      if (actualizacionUsuario.n === 1) {
        usuarioGuardado = true;
      }
    }
    return usuarioGuardado;
  }

  async actualizarValidacionFacialUsuario(username: string, usuario: any) {
    await this.usuarioValidador.actualizarValidacionFacialUsuario(usuario);
    let usuarioGuardado = false;
    const actualizacionUsuario = await this.usuarioRepositorio.actualizarUsuarioPorUsername(
      username,
      usuario
    );
    if (actualizacionUsuario) {
      if (actualizacionUsuario.n === 1) {
        usuarioGuardado = true;
      }
    }
    return usuarioGuardado;
  }
}
