import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { RoleEnum } from '../../enums/role.enum';
import { ROLES_KEY } from '../decorators/roles';

@Injectable()
export class RolesGuards implements CanActivate {
  // Estudar sobre Reflector e setmetadata
  constructor(private reflector: Reflector) {
    console.log('RolesGuards.constructor: entered');
    console.log(`RolesGuards.constructor: this.reflector = ${JSON.stringify(this.reflector)}`);
  }

  // LEMBRAR canActivate que implementa a lógica de autorização baseada nos roles!!!!!!
  canActivate(context: ExecutionContext): boolean {
    // pega o roles associados a rota pelo metadados usando o Reflector.
    const roles: RoleEnum[] = this.reflector.get(
      ROLES_KEY,
      context.getHandler(),
    );

    // se não tem nenhum role na rota, libera  o acesso
    if (!roles) {
      return true;
    }

    // pega a requisição HTTP do contexto
    const request = context.switchToHttp().getRequest();
    // pega as info do user a partir do objeto da req
    const user = request.user;

    // verifica se role enum do user ta nos enum da rota
    return !!roles.find((role: RoleEnum) => role == user.role);
  }
}