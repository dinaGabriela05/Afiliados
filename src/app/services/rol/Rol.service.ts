import RolValidador from "../../validators/Rol.validator";
import { Inject, Service } from "typedi";
import RolRepositorio from "../../repositories/Rol.repository";
import Rol from "../../models/Rol";

@Service()
export default class RolServicio {
  @Inject(type => RolRepositorio)
  rolRepositorio: RolRepositorio;
  @Inject(type => RolValidador)
  rolValidador: RolValidador;

  async obtenerTodos(_page: any, _limit: any, filter: any) {
    const roles = await this.rolRepositorio.obtenerTodos(
      filter,
      parseInt(_page),
      parseInt(_limit)
    );
    return roles;
  }

  async crearRol(rol: any) {
    await this.rolValidador.crearRol(rol);
    const nuevoRol = new Rol(rol);
    const rolGuardado = await nuevoRol.save();
    return rolGuardado;
  }

  async actualizarRol(id: string, rol: any) {
    await this.rolValidador.actualizarRol(rol);
    let rolGuardado = false;
    const actualizacionRol = await this.rolRepositorio.actualizarRol(id, rol);
    if (actualizacionRol) {
      if (actualizacionRol.n === 1) {
        rolGuardado = true;
      }
    }
    return rolGuardado;
  }

  async eliminarRol(id: string) {
    await this.rolValidador.eliminarRol({ id: id });
    let rolEliminado = false;
    const eliminacionRol = await this.rolRepositorio.eliminarRol(id);
    if (eliminacionRol) {
      if (eliminacionRol.n === 1) {
        rolEliminado = true;
      }
    }
    return rolEliminado;
  }

  async obtenerCatalogoRol(filter: any) {
    const roles = await this.rolRepositorio.obtenerSelector(filter);
    return roles;
  }
}
