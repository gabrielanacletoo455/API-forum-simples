import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { Repository } from 'typeorm';
import { LoginDTO } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { FileDTO } from './dto/files.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}



  async generateUniqueUsernameBaseOnEmail(email: string): Promise<string> {
    try {
      // 🎯 Extrai a parte antes do @ do email
      let baseUsername = email.split('@')[0];
      
      // 🧹 Remove caracteres especiais e converte para lowercase
      baseUsername = baseUsername
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '') // Remove caracteres especiais
        .substring(0, 8); // 🎯 Limita a 8 caracteres para dar espaço aos números

      // 🎲 Gera 4 números aleatórios
      const randomNumbers = Math.floor(1000 + Math.random() * 9000); // 1000-9999
      
      // 🔗 Combina username base + números aleatórios
      const username = `${baseUsername}${randomNumbers}`;

      // 🔍 Verifica se o username já existe (muito improvável com números aleatórios)
      const existingUser = await this.usersRepository.findOne({
        where: { userName: username }
      });

      // ��️ Se por acaso existir (muito raro), gera novos números
      if (existingUser) {
        const newRandomNumbers = Math.floor(1000 + Math.random() * 9000);
        return `${baseUsername}${newRandomNumbers}`;
      }

      return username;
    } catch (error) {
      throw new HttpException('Erro ao gerar username único', 500);
    }
  }


  async create(createUserDto: CreateUserDto) {
    try {
      // Verifica se email já existe
      const user = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
      if (user) throw new BadRequestException('User already exists');

      // Gera username único automaticamente
      const uniqueUsername = await this.generateUniqueUsernameBaseOnEmail(
        createUserDto.email
      );

      // Cria o usuário com o username gerado
      const newUser = this.usersRepository.create({
        ...createUserDto,
        userName: uniqueUsername
      });

      return await this.usersRepository.save(newUser);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async login(PayLoad: LoginDTO) {
    try {
      const { email, password } = PayLoad;
      const user = await this.usersRepository.findOne({
        where: { email },
        select: { id: true, email: true, password: true, role: true },
      });

      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new UnauthorizedException('Invalid email or password.');
        }
        const token = await this.jwtService.signAsync({
          id: user.id,
          email: user.email,
          role: user.role,
          userId: user.id,
        });

        return { token };
      }
      throw new UnauthorizedException('Invalid email or password.');
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
