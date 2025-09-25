import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { RoleEnum } from "../../enums/role.enum";


export class CreateUserDoc {

    @ApiProperty({
        type: String,
        description: 'Email do usuário',
        example: 'usuario@condfynews.com.br',
    })
   email: string;


    @ApiProperty({
        type: String,
        description: 'Senha do usuário',
        example: 'senha123',
    })
    password: string;


}


export class ResponseCreateUserEmailExistDoc {
    @ApiProperty({
      type: String,
      description: 'Status da requisição.',
      example: 400,
    })
    statusCode: number;
  
    @ApiProperty({
      type: String,
      description: 'Mensagem de email já cadastrado.',
      example: 'There is already a user with this email.',
    })
    message: string;
  }