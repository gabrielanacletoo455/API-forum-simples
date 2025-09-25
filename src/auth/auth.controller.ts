import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Render,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { FileDTO } from './dto/files.dto';
import { UploadedFile } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoginDTO } from './dto/login.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseCreatedUserDoc } from '../users/docs/responseCreatedUser.doc';
import { CreateUserDoc, ResponseCreateUserEmailExistDoc } from '../users/docs/createUser.doc';
import { LoginDoc } from './docs/authLogin.doc';
import { OkResponseLoginDoc, UnauthorizedResponseLoginDoc } from './docs/responseLogin.doc';

@Controller('auth')
@ApiTags('2 - Autenticação')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: CreateUserDoc })
  @ApiCreatedResponse({
    description: 'Usuário criado com sucesso',
    type: ResponseCreatedUserDoc,
  })
  @ApiBadRequestResponse({
    description: 'Email já cadastrado',
    type: ResponseCreateUserEmailExistDoc,
  })
  async register(@Body() UserPayLoad: CreateUserDto) {

    return await this.authService.create(UserPayLoad);
  }

  @HttpCode(200)
  @Post()
  @ApiBody({ type: LoginDoc })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso',
    type: OkResponseLoginDoc,
  })
  @ApiResponse({
    status: 401,
    description: 'Email ou senha incorretos',
    type: UnauthorizedResponseLoginDoc,
  })
  async login(@Body() PayLoad: LoginDTO) {
 
    return await this.authService.login(PayLoad);
  }
}


