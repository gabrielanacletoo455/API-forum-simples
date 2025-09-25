import { ApiProperty } from '@nestjs/swagger';

export class AuthorResponseDoc {
  @ApiProperty({
    description: 'ID do autor',
    example: 8,
  })
  id: number;

  @ApiProperty({
    description: 'Nome de usuário do autor',
    example: 'gabriel-anacletoo',
  })
  userName: string;

  @ApiProperty({
    description: 'Data de nascimento do autor',
    example: null,
    nullable: true,
  })
  birthDate: string | null;

  @ApiProperty({
    description: 'Instagram do autor',
    example: '',
    nullable: true,
  })
  instagram: string | null;

  @ApiProperty({
    description: 'LinkedIn do autor',
    example: '',
    nullable: true,
  })
  linkedin: string | null;

  @ApiProperty({
    description: 'WhatsApp do autor',
    example: '',
    nullable: true,
  })
  whatsapp: string | null;

  @ApiProperty({
    description: 'Gênero do autor',
    example: null,
    nullable: true,
  })
  gender: string | null;

  @ApiProperty({
    description: 'URL da foto de perfil do autor',
    example: '',
    nullable: true,
  })
  photoProfile: string | null;

  @ApiProperty({
    description: 'Biografia do autor',
    example: 'Desenvolvedor front end junior ☠️',
    nullable: true,
  })
  bioDescription: string | null;

  @ApiProperty({
    description: 'Website do autor',
    example: '',
    nullable: true,
  })
  website: string | null;

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

  @ApiProperty({
    description: 'Data de atualização do autor',
    example: '2025-09-25T18:29:56.248Z',
  })
  updatedAt: string;

  @ApiProperty({
    description: 'Data de exclusão do autor',
    example: null,
    nullable: true,
  })
  deletedAt: string | null;
}

export class CommentResponseDoc {
  @ApiProperty({
    description: 'ID do comentário',
    example: 31,
  })
  id: number;

  @ApiProperty({
    description: 'Conteúdo do comentário',
    example: 'Esse é o primeiro post com imagem 🫡',
  })
  content: string;

  @ApiProperty({
    description: 'Data de criação do comentário',
    example: '2025-09-25T15:59:08.661Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Data de atualização do comentário',
    example: '2025-09-25T15:59:08.661Z',
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
    example: 17,
  })
  postId: number;
}

export class PostListResponseDoc {
  @ApiProperty({
    description: 'ID do post',
    example: 21,
  })
  id: number;

  @ApiProperty({
    description: 'Título do post',
    example: 'Skyline GTR visto no confiança',
  })
  title: string;

  @ApiProperty({
    description: 'Conteúdo do post',
    example: 'Máquina!!',
  })
  content: string;

  @ApiProperty({
    description: 'URL da imagem do post',
    example: 'https://firebasestorage.googleapis.com/v0/b/rpggame-3ef76.firebasestorage.app/o/1758816160140-359.jpg?alt=media&token=ec2d95a8-d483-4385-bad0-1cecabba70e7',
    nullable: true,
  })
  imageUrl: string | null;

  @ApiProperty({
    description: 'Data de criação do post',
    example: '2025-09-25T16:02:41.646Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Data de atualização do post',
    example: '2025-09-25T16:02:41.646Z',
  })
  updatedAt: string;

  @ApiProperty({
    description: 'Data de exclusão do post',
    example: null,
    nullable: true,
  })
  deletedAt: string | null;

  @ApiProperty({
    description: 'Informações do autor do post',
    type: AuthorResponseDoc,
  })
  author: AuthorResponseDoc;

  @ApiProperty({
    description: 'ID do autor do post',
    example: 8,
  })
  authorId: number;

  @ApiProperty({
    description: 'Lista de comentários do post',
    type: [CommentResponseDoc],
    example: [],
  })
  comments: CommentResponseDoc[];
}
