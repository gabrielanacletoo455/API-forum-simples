
import { ApiProperty } from "@nestjs/swagger";


export class AuthorDoc {
  @ApiProperty({
    type: Number,
    description: 'ID do autor',
    example: 7,
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'Nome de usuário do autor',
    example: 'ga3205',
  })
  userName: string;

  @ApiProperty({
    type: String,
    description: 'Data de nascimento do autor',
    example: null,
    nullable: true,
  })
  birthDate: string | null;

  @ApiProperty({
    type: String,
    description: 'Gênero do autor',
    example: null,
    nullable: true,
  })
  gender: string | null;

  @ApiProperty({
    type: String,
    description: 'URL da foto de perfil do autor',
    example: null,
    nullable: true,
  })
  photoProfile: string | null;

  @ApiProperty({
    type: String,
    description: 'Biografia do autor',
    example: null,
    nullable: true,
  })
  bioDescription: string | null;

  @ApiProperty({
    type: String,
    description: 'Website do autor',
    example: null,
    nullable: true,
  })
  website: string | null;

  @ApiProperty({
    type: String,
    description: 'Email do autor',
    example: 'ga@dev.fer',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Data de criação do autor',
    example: '2025-09-23T15:32:21.986Z',
  })
  createdAt: string;

  @ApiProperty({
    type: String,
    description: 'Data da última atualização do autor',
    example: '2025-09-23T15:32:21.986Z',
  })
  updatedAt: string;

  @ApiProperty({
    type: String,
    description: 'Data de exclusão do autor',
    example: null,
    nullable: true,
  })
  deletedAt: string | null;
}

export class CreatePostResponseDoc {
  @ApiProperty({
    type: Number,
    description: 'ID único do post',
    example: 11,
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'Título do post',
    example: 'TestESSSS',
  })
  title: string;

  @ApiProperty({
    type: String,
    description: 'Conteúdo do post',
    example: 'olamudnndoo',
  })
  content: string;

  @ApiProperty({
    type: String,
    description: 'URL da imagem do post',
    example: null,
    nullable: true,
  })
  imageUrl: string | null;

  @ApiProperty({
    type: String,
    description: 'Data de criação do post',
    example: '2025-09-23T15:40:41.115Z',
  })
  createdAt: string;

  @ApiProperty({
    type: String,
    description: 'Data da última atualização do post',
    example: '2025-09-23T15:40:41.115Z',
  })
  updatedAt: string;

  @ApiProperty({
    type: String,
    description: 'Data de exclusão do post',
    example: null,
    nullable: true,
  })
  deletedAt: string | null;

  @ApiProperty({
    type: AuthorDoc,
    description: 'Informações do autor do post',
  })
  author: AuthorDoc;
}