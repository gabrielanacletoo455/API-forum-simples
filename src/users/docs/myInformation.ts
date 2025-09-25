// src/users/docs/myInformation.doc.ts
import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "../../enums/role.enum";

export class CommentDoc {
  @ApiProperty({
    type: Number,
    description: 'ID do comentário',
    example: 30,
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'Conteúdo do comentário',
    example: 'Ok ��',
  })
  content: string;

  @ApiProperty({
    type: String,
    description: 'Data de criação do comentário',
    example: '2025-09-24T12:11:41.721Z',
  })
  createdAt: string;

  @ApiProperty({
    type: String,
    description: 'Data da última atualização do comentário',
    example: '2025-09-24T12:11:41.721Z',
  })
  updatedAt: string;

  @ApiProperty({
    type: String,
    description: 'Data de exclusão (soft delete)',
    example: null,
    nullable: true,
  })
  deletedAt: string | null;

  @ApiProperty({
    type: Number,
    description: 'ID do autor do comentário',
    example: 8,
  })
  authorId: number;

  @ApiProperty({
    type: Number,
    description: 'ID do post relacionado',
    example: 10,
  })
  postId: number;
}

export class PostDoc {
  @ApiProperty({
    type: Number,
    description: 'ID do post',
    example: 10,
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'Título do post',
    example: 'Boa tarde, pessoal!',
  })
  title: string;

  @ApiProperty({
    type: String,
    description: 'Conteúdo do post',
    example: 'Ontem organizamos as chaves dos armários...',
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
    example: '2025-09-23T15:34:44.994Z',
  })
  createdAt: string;

  @ApiProperty({
    type: String,
    description: 'Data da última atualização do post',
    example: '2025-09-23T15:34:44.993Z',
  })
  updatedAt: string;

  @ApiProperty({
    type: String,
    description: 'Data de exclusão (soft delete)',
    example: null,
    nullable: true,
  })
  deletedAt: string | null;

  @ApiProperty({
    type: Number,
    description: 'ID do autor do post',
    example: 7,
  })
  authorId: number;

  @ApiProperty({
    type: [CommentDoc],
    description: 'Lista de comentários do post',
  })
  comments: CommentDoc[];
}

export class MyInformationResponseDoc {
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
    description: 'Data de criação do usuário',
    example: '2025-09-23T15:32:21.986Z',
  })
  createdAt: string;

  @ApiProperty({
    type: [PostDoc],
    description: 'Lista de posts do usuário com seus comentários',
  })
  posts: PostDoc[];
}