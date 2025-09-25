import { ApiProperty } from '@nestjs/swagger';

export class LoginDoc {
  @ApiProperty({
    type: String,
    description: 'Refere-se ao email do usuário.',
    example: 'exemplo@usuario.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Refere-se a senha do usuário.',
    example: 'senha123',
    required: true,
  })
  password: string;
}