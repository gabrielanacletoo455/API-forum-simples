import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "../../enums/role.enum";

export class ResponseCreatedUserDoc {
  @ApiProperty({
    type: Number,
    description: 'ID único do usuário',
    example: 7,
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'Nome de usuário único',
    example: 'ga3205',
  })
  userName: string;

  @ApiProperty({
    type: String,
    description: 'Data de nascimento do usuário',
    example: null,
    nullable: true,
  })
  birthDate: string | null;

  @ApiProperty({
    type: String,
    description: 'Gênero do usuário',
    example: null,
    nullable: true,
  })
  gender: string | null;

  @ApiProperty({
    type: String,
    description: 'URL da foto de perfil',
    example: null,
    nullable: true,
  })
  photoProfile: string | null;

  @ApiProperty({
    type: String,
    description: 'Biografia/descrição do usuário',
    example: null,
    nullable: true,
  })
  bioDescription: string | null;

  @ApiProperty({
    type: String,
    description: 'Website do usuário',
    example: null,
    nullable: true,
  })
  website: string | null;

  @ApiProperty({
    type: String,
    description: 'Email do usuário',
    example: 'ga@dev.fer',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Senha criptografada do usuário',
    example: '$2b$10$2XvbiC2dHrWXUcLiVW7xKujL/YlJiF6B10/Ik0ofzrmwA1A3gvMI6',
  })
  password: string;

  @ApiProperty({
    enum: RoleEnum,
    description: 'Tipo de usuário',
    example: 'client',
  })
  role: RoleEnum;

  @ApiProperty({
    type: String,
    description: 'Data de criação do usuário',
    example: '2025-09-23T15:32:21.986Z',
  })
  createdAt: string;

  @ApiProperty({
    type: String,
    description: 'Data da última atualização',
    example: '2025-09-23T15:32:21.986Z',
  })
  updatedAt: string;

  @ApiProperty({
    type: String,
    description: 'Data de exclusão (soft delete)',
    example: null,
    nullable: true,
  })
  deletedAt: string | null;
}

export class ResponseCreateUserEmailExistDoc {
  @ApiProperty({
    type: Number,
    description: 'Status da requisição',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    type: String,
    description: 'Mensagem de email já cadastrado',
    example: 'There is already a user with this email.',
  })
  message: string;
}