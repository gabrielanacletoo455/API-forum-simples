import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDoc {
  @ApiProperty({
    type: String,
    description: 'Conteúdo do comentário',
    example: 'Excelente post! Muito informativo.',
    minLength: 1,
    maxLength: 1000,
  })
  content: string;

  @ApiProperty({
    type: Number,
    description: 'ID do post que está sendo comentado',
    example: 10,
  })
  postId: number;
}
