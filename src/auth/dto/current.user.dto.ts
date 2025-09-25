import { RoleEnum } from '../../enums/role.enum';

export class CurrentUserDto {
  id: number;
  email: string;
  role: RoleEnum;
  userId: number;
  storeId: number;
}