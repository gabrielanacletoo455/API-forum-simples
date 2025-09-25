import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from '@/auth/decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { AuthGuard } from '@/auth/guards/auth-guard';
import { RolesGuards } from '@/auth/guards/role-guard';
import { Roles } from '@/auth/decorators/roles';
import { RoleEnum } from '@/enums/role.enum';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiExcludeEndpoint, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseCreatedUserDoc } from './docs/responseCreatedUser.doc';
import { MyInformationResponseDoc } from './docs/myInformation';
import { UpdateProfileResponseDoc } from './docs/updateProfileResponse.doc';

@Controller('users')
@ApiTags('1 - Usuários')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiBearerAuth()
  @ApiResponse({ 
    status: 200, 
    description: 'Informações do usuário logado com seus posts e comentários',
    type: MyInformationResponseDoc 
  })
  @UseGuards(AuthGuard, RolesGuards)
  @Get('information')
  myInformation(@CurrentUser() currentUser: User) {
    return this.usersService.findMyInformation(+currentUser.id);
  }

  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard, RolesGuards)
  @Get('profile-information/:userName')
  profileInformation( @Param('userName') userName: string) {
    return this.usersService.findProfileInformation(userName);
  }

  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard, RolesGuards)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @Patch('editbyadm/:id')
  updatebyadmin(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ) {
    return this.usersService.updateByAdmin(+id,updateUserDto);
  }


  @ApiBearerAuth()
  @ApiBody({ 
    type: UpdateUserDto,
    description: 'Dados para atualização do perfil do usuário',
    examples: {
      'Atualizar email': {
        summary: 'Atualizar apenas o email',
        value: {
          email: 'novo@email.com'
        }
      },
      'Atualizar múltiplos campos': {
        summary: 'Atualizar email e outros campos',
        value: {
          email: 'novo@condfynews.com.br',
          userName: 'novo_usuario',
          bioDescription: 'Nova biografia do usuário'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Perfil atualizado com sucesso',
    type: UpdateProfileResponseDoc 
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Token de autenticação inválido ou expirado'
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Dados inválidos para atualização'
  })
  @UseGuards(AuthGuard, RolesGuards)
  @Patch('edit-profile')
  @ApiBearerAuth()
  update(
    @Body() updateUserDto: UpdateUserDto,
    @CurrentUser() currentUser: User
  ) {
    return this.usersService.update(currentUser.id, updateUserDto);
  }

  @ApiExcludeEndpoint()
  @UseGuards(AuthGuard, RolesGuards)
  @Roles(RoleEnum.admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
