import { ApiProperty } from '@nestjs/swagger';

export class CommentAuthorDoc {
  @ApiProperty({
    description: 'ID do autor do comentário',
    example: 8,
  })
  id: number;

  @ApiProperty({
    description: 'Nome de usuário do autor',
    example: 'gabriel-anacletoo',
  })
  userName: string;

  @ApiProperty({
    description: 'Email do autor',
    example: 'ga@dev.com',
  })
  email: string;

  @ApiProperty({
    description: 'Role do autor',
    example: 'client',
    enum: ['admin', 'client'],
  })
  role: string;

  @ApiProperty({
    description: 'Data de criação do autor',
    example: '2025-09-23T19:06:16.112Z',
  })
  createdAt: string;
}

export class CommentPostDoc {
  @ApiProperty({
    description: 'ID do post',
    example: 10,
  })
  id: number;

  @ApiProperty({
    description: 'Título do post',
    example: 'Boa tarde, pessoal!',
  })
  title: string;

  @ApiProperty({
    description: 'Conteúdo do post',
    example: 'Ontem organizamos as chaves dos armários...',
  })
  content: string;
}

export class CommentResponseDoc {
  @ApiProperty({
    description: 'ID do comentário',
    example: 30,
  })
  id: number;

  @ApiProperty({
    description: 'Conteúdo do comentário',
    example: 'Ok 🫡',
  })
  content: string;

  @ApiProperty({
    description: 'Data de criação do comentário',
    example: '2025-09-24T12:11:41.721Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Data de atualização do comentário',
    example: '2025-09-24T12:11:41.721Z',
  })
  updatedAt: string;

  @ApiProperty({
    description: 'Data de exclusão do comentário',
    example: null,
    nullable: true,
  })
  deletedAt: string | null;

  @ApiProperty({
    description: 'ID do autor do comentário',
    example: 8,
  })
  authorId: number;

  @ApiProperty({
    description: 'ID do post do comentário',
    example: 10,
  })
  postId: number;

  @ApiProperty({
    description: 'Informações do autor do comentário',
    type: CommentAuthorDoc,
  })
  author: CommentAuthorDoc;

  @ApiProperty({
    description: 'Informações do post comentado',
    type: CommentPostDoc,
  })
  post: CommentPostDoc;
}
