import { RoleEnum } from "@/enums/role.enum";
import { 
  IsEnum, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  IsEmail, 
  IsDateString, 
  IsBoolean, 
  IsUrl,
  MinLength, 
  MaxLength,
  Matches 
} from "class-validator";

export class CreateUserDto {

  @IsDateString({}, { message: 'A data de nascimento deve estar no formato válido (YYYY-MM-DD)' })
  @IsOptional()
  birthDate: string;

  @IsString({ message: 'O username deve ser um texto válido' })
  @IsOptional()
  @MaxLength(255, { message: 'O username não pode exceder 255 caracteres' })
  userName: string; 

  @IsEmail({}, { message: 'O email deve ter um formato válido' })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  @MaxLength(255, { message: 'O email não pode exceder 255 caracteres' })
  email: string;

  @IsString()
  @IsOptional()
  instagram: string;

  @IsString()
  @IsOptional()
  linkedin: string;

  @IsString()
  @IsOptional()
  whatsapp: string;

  @IsString({ message: 'A senha deve ser um texto válido' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  @MaxLength(50, { message: 'A senha não pode exceder 50 caracteres' })
  password: string;

  // Campos opcionais
  @IsOptional()
  @IsEnum(['male', 'female', 'other', 'prefer_not_to_say'], { 
    message: 'O gênero deve ser: male, female, other ou prefer_not_to_say' 
  })
  gender?: string;

  @IsOptional()
  @IsUrl({}, { message: 'A URL da foto de perfil deve ser válida' })
  @MaxLength(500, { message: 'A URL da foto não pode exceder 500 caracteres' })
  photoProfile?: string;

  @IsOptional()
  @IsString({ message: 'A biografia deve ser um texto válido' })
  @MaxLength(500, { message: 'A biografia não pode exceder 500 caracteres' })
  bioDescription?: string;

  @IsOptional()
  @IsUrl({}, { message: 'A URL do website deve ser válida' })
  @MaxLength(100, { message: 'A URL do website não pode exceder 100 caracteres' })
  website?: string;

  @IsOptional()
  @IsEnum(RoleEnum, { message: 'O role deve ser um valor válido do enum' })
  role?: RoleEnum = RoleEnum.client;
}
