import { IsString, IsOptional, IsBoolean, IsUrl, MaxLength, MinLength, IsNotEmpty } from 'class-validator';

export class CreatePostDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString({ message: 'O conteúdo do post deve ser um texto válido' })
  @MinLength(1, { message: 'O conteúdo do post não pode estar vazio' })
  @MaxLength(2000, { message: 'O conteúdo do post não pode exceder 2000 caracteres' })
  content: string;

  @IsOptional()
  @IsUrl({}, { message: 'A URL da imagem deve ser válida' })
  @MaxLength(500, { message: 'A URL da imagem não pode exceder 500 caracteres' })
  imageUrl?: string;


}
