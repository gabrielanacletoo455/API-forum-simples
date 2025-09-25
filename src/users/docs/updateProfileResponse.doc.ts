
import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "../../enums/role.enum";

export class UpdateProfileResponseDoc {
  @ApiProperty({
    type: Number,
    description: 'ID único do usuário',
    example: 3,
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'Email do usuário',
    example: 'ga@dev.fr',
  })
  email: string;


  @ApiProperty({
    type: String,
    description: 'Data de criação do usuário',
    example: '2025-09-09T23:55:00.726Z',
  })
  createdAt: string;

  @ApiProperty({
    type: String,
    description: 'Data da última atualização',
    example: '2025-09-10T00:03:26.876Z',
  })
  updatedAt: string;

  @ApiProperty({
    type: String,
    description: 'Data de exclusão (soft delete)',
    example: null,
    nullable: true,
  })
  deletedAt: string | null;
}