import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
  async findProfileInformation(userName: string) {
    try {
      return await this.usersRepository.findOne({ where: { userName } });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findMyInformation(id: number) {
    try {
      return await this.usersRepository.findOne({
        where: { id },
        select: [
          'id',
          'email',
          'userName',
          'photoProfile',
          'bioDescription',
          'website',
          'gender',
          'birthDate',
          'createdAt',
        ],
        relations: ['posts', 'posts.comments'],
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      return await this.usersRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async updateByAdmin(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      if (!user) throw new NotFoundException('User not found');
      await this.usersRepository.update(id, updateUserDto);
      return this.usersRepository.findOne({ where: { id } });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    console.log('chegou na service', updateUserDto);
    try {
      const user = await this.findOne(id);
      if (!user) throw new NotFoundException('User not found');
      console.log('encontrou o usuario', user);
      // Se tiver senha no DTO, encripta
      if (updateUserDto.password) {
        updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
      }

      Object.assign(user, updateUserDto);

      await this.usersRepository.save(user);

      // retorna o usuário atualizado sem senha
      return this.usersRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number) {
    try {
      const user = await this.findOne(id);
      if (!user) throw new NotFoundException('User not found');
      return await this.usersRepository.delete(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async sendFriendRequest(senderId: number, receiverId: number) {
    const sender = await this.usersRepository.findOne({
      where: { id: senderId },
      relations: ['sentFriendRequests'],
    });

    const receiver = await this.usersRepository.findOne({
      where: { id: receiverId },
    });

    if (sender && receiver) {
      sender.sentFriendRequests.push(receiver);
      return await this.usersRepository.save(sender);
    }
  }

  // Buscar solicitações recebidas
  async getReceivedFriendRequests(userId: number) {
    return await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['receivedFriendRequests'],
    });
  }

  // Aceitar solicitação
  async acceptFriendRequest(userId: number, friendId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['friends', 'receivedFriendRequests'],
    });

    const friend = await this.usersRepository.findOne({
      where: { id: friendId },
      relations: ['friends'],
    });

    // Adicionar como amigo
    if (user && friend) {
      user.friends.push(friend);
      friend.friends.push(user);

      // Remover da solicitação
      user.receivedFriendRequests = user.receivedFriendRequests.filter(
        (req) => req.id !== friendId,
      );

      return await this.usersRepository.save([user, friend]);
    }
  }
}
