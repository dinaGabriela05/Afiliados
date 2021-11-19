import ReceptorNotificacionValidador from "../../validators/ReceptorNotificacion.validator";
import { Inject, Service } from "typedi";
import ReceptorNotificacionRepositorio from "../../repositories/ReceptorNotificacion.repository";
import ReceptorNotificacion from "../../models/ReceptorNotificacion";
import AfiliadoRepositorio from "../../repositories/Afiliado.repository";
import AutenticadorServicio from "../autenticador/Autenticador.service";

@Service()
export default class ReceptorNotificacionServicio {
  @Inject(type => AfiliadoRepositorio)
  afiliadoRepositorio: AfiliadoRepositorio;
  @Inject(type => ReceptorNotificacionRepositorio)
  receptorNotificacionRepositorio: ReceptorNotificacionRepositorio;
  @Inject(type => ReceptorNotificacionValidador)
  receptorNotificacionValidador: ReceptorNotificacionValidador;
  @Inject(type => AutenticadorServicio)
  autenticadorServicio: AutenticadorServicio;

  async obtenerTodos(_page: any, _limit: any, filter: any) {
    const receptoresNotificacion = await this.receptorNotificacionRepositorio.obtenerTodos(
      filter,
      parseInt(_page),
      parseInt(_limit)
    );
    return receptoresNotificacion;
  }

  async crearReceptorNotificacion(receptorNotificacion: any) {
    await this.receptorNotificacionValidador.crearReceptorNotificacion(
      receptorNotificacion
    );
    const nuevoReceptorNotificacion = new ReceptorNotificacion(
      receptorNotificacion
    );
    const receptorNotificacionGuardado = await nuevoReceptorNotificacion.save();
    return receptorNotificacionGuardado;
  }

  async actualizarReceptorNotificacion(id: string, receptorNotificacion: any) {
    await this.receptorNotificacionValidador.actualizarReceptorNotificacion(
      receptorNotificacion
    );
    let receptorNotificacionGuardado = false;
    console.log(id, receptorNotificacion);
    const actualizacionReceptorNotificacion = await this.receptorNotificacionRepositorio.actualizarReceptorNotificacion(
      id,
      receptorNotificacion
    );
    if (actualizacionReceptorNotificacion) {
      if (actualizacionReceptorNotificacion.n === 1) {
        receptorNotificacionGuardado = true;
      }
    }
    return receptorNotificacionGuardado;
  }

  async eliminarReceptorNotificacion(id: string, notificador: any) {
    await this.receptorNotificacionValidador.eliminarReceptorNotificacion({
      id: notificador._id
    });
    let receptorNotificacionEliminado = false;

    const eliminacionReceptorNotificacion = await this.receptorNotificacionRepositorio.eliminarReceptorNotificacion(
      notificador._id
    );

    if (eliminacionReceptorNotificacion) {
      const actualizacionAfiliado = await this.afiliadoRepositorio.eliminarAfiliadoNotificacion(
        id,
        notificador._id
      );
      if (actualizacionAfiliado) {
        if (actualizacionAfiliado.n === 1) {
          receptorNotificacionEliminado = true;
        }
      }
    }

    return receptorNotificacionEliminado;
  }

  async crearMasivoReceptorNotificacion(receptorNotificacion: any) {
    const usuariosGuardados = await ReceptorNotificacion.create(
      receptorNotificacion
    );
    return usuariosGuardados;
  }

  async consultaReceptorNotificacion(id: string) {
    const receptorNotificacion = await this.receptorNotificacionRepositorio.consultaReceptorNotificacion(
      id
    );
    return receptorNotificacion;
  }

  async obtenerCatalogoNotificacion(filter: any) {
    const roles = await this.receptorNotificacionRepositorio.obtenerSelector(
      filter
    );
    return roles;
  }

  async envioReceptorNotificaciones(correos: any) {
    let usuarios: any = [];
    for (let i = 0; i < correos.length; i++) {
      usuarios = await this.receptorNotificacionRepositorio.consultaReceptorNotificacion(
        correos[i]._id
      );
      this.autenticadorServicio.envioNotificacion(
        usuarios.email,
        "test121",
        5,
        {
          tool: {
            name: usuarios.nombre,
            rol: usuarios.notificacion[0]
              ? usuarios.notificacion[0].nombre
              : "default"
          }
        },
        [
          {
            id: 2,
            params: {}
          }
        ]
      );
    }
  }
}
