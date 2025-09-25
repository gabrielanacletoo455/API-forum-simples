import { IsString, IsNotEmpty, MaxLength, MinLength, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({ message: 'O conteúdo do comentário não pode estar vazio' })
  @MinLength(1, { message: 'O comentário deve ter pelo menos 1 caractere' })
  @MaxLength(1000, { message: 'O comentário não pode exceder 1000 caracteres' })
  content: string;

  @IsNumber()
  @IsNotEmpty({ message: 'O postId não pode estar vazio' })
  postId: number;
}
