import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  // Herda todos os campos do CreateCommentDto como opcionais
  // Permite atualizar apenas o content, mantendo o postId
}