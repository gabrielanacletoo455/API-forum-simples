import { IsString, IsNotEmpty, NotEquals, IsOptional } from 'class-validator';

export class ChangePasswordDto {

  newPassword: string;

  token: string;
}