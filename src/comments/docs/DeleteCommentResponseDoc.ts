import { ApiProperty } from '@nestjs/swagger';

export class DeletedCommentInfoDoc {
  @ApiProperty({
    description: 'ID do comentário excluído',
    example: 30,
  })
  id: number;

  @ApiProperty({
    description: 'Conteúdo do comentário excluído',
    example: 'Ok 🫡',
  })
  content: string;

  @ApiProperty({
    description: 'Quem excluiu o comentário',
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

export class DeleteCommentResponseDoc {
  @ApiProperty({
    description: 'Mensagem de confirmação da exclusão',
    example: 'Comentário excluído com sucesso',
  })
  message: string;

  @ApiProperty({
    description: 'Informações do comentário excluído',
    type: DeletedCommentInfoDoc,
  })
  deletedComment: DeletedCommentInfoDoc;
}
