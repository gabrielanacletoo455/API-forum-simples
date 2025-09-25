
import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDoc {
  @ApiProperty({
    type: String,
    description: 'Título do post',
    example: 'TestESSSS',
    maxLength: 255,
  })
  title: string;

  @ApiProperty({
    type: String,
    description: 'Conteúdo do post',
    example: 'olamudnndoo',
    minLength: 1,
    maxLength: 2000,
  })
  content: string;

  @ApiProperty({
    type: String,
    description: 'URL da imagem do post (opcional)',
    example: 'https://exemplo.com/imagem.jpg',
    required: false,
    maxLength: 500,
    nullable: true,
  })
  imageUrl?: string;
}