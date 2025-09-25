import { ApiProperty } from '@nestjs/swagger';

export class DeletedPostInfoDoc {
  @ApiProperty({
    description: 'ID do post excluído',
    example: 10,
  })
  id: number;

  @ApiProperty({
    description: 'Título do post excluído',
    example: 'Boa tarde, pessoal!',
  })
  title: string;

  @ApiProperty({
    description: 'Quem excluiu o post',
    example: 'owner',
    enum: ['owner', 'admin'],
  })
  deletedBy: string;

  @ApiProperty({
    description: 'Data e hora da exclusão',
    example: '2025-09-25T20:30:15.123Z',
  })
  deletedAt: string;
}

export class DeletePostResponseDoc {
  @ApiProperty({
    description: 'Mensagem de confirmação da exclusão',
    example: 'Post excluído com sucesso',
  })
  message: string;

  @ApiProperty({
    description: 'Informações do post excluído',
    type: DeletedPostInfoDoc,
  })
  deletedPost: DeletedPostInfoDoc;
}
