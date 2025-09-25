import { HttpException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/users/entities/user.entity';
import { Comment } from './entities/comment.entity';
import { Post } from '@/posts/entities/post.entity';


@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>
  ) {}

  async create(createCommentDto: CreateCommentDto, userId: number) {
    try {
      const user = await this.usersRepository.findOne({ where: { id: userId } });
      const post = await this.postsRepository.findOne({ where: { id: createCommentDto.postId } });
      
      // Validação se user e post existem
      if (!user) {
        throw new HttpException('Usuário não encontrado', 404);
      }
      if (!post) {
        throw new HttpException('Post não encontrado', 404);
      }
      const comment = this.commentsRepository.create({ 
        content: createCommentDto.content, 
        authorId: userId, 
        postId: createCommentDto.postId 
      });
      
      return await this.commentsRepository.save(comment);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      return await this.commentsRepository.find({
        relations: ['author', 'post'],
        order: { createdAt: 'DESC' }
      });
    } catch (error) {
      throw new HttpException('Erro interno do servidor', 500);
    }
  }

  async findOne(id: number) {
    try {
      const comment = await this.commentsRepository.findOne({
        where: { id },
        relations: ['author', 'post']
      });

      if (!comment) {
        throw new HttpException('Comentário não encontrado', 404);
      }

      return comment;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Erro interno do servidor', 500);
    }
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, currentUserId: number, currentUserRole: string) {
    try {
      // 1. Busca o comentário pelo ID
      const comment = await this.commentsRepository.findOne({
        where: { id },
        relations: ['author']
      });

      if (!comment) {
        throw new HttpException('Comentário não encontrado', 404);
      }

      // 2. Verifica permissões de atualização
      const isOwner = comment.authorId === currentUserId;
      const isAdmin = currentUserRole === 'admin';

      if (!isOwner && !isAdmin) {
        throw new HttpException('Você não tem permissão para atualizar este comentário', 403);
      }

      // 3. Atualiza apenas os campos fornecidos
      await this.commentsRepository.save({
        ...comment,
        ...updateCommentDto,
        updatedAt: new Date()
      });

      // 4. Retorna o comentário atualizado com as relações
      return await this.commentsRepository.findOne({
        where: { id },
        relations: ['author', 'post']
      });

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Erro interno do servidor', 500);
    }
  }

  async remove(id: number, currentUserId: number, currentUserRole: string) {
    try {
      // 1. Busca o comentário pelo ID
      const comment = await this.commentsRepository.findOne({
        where: { id },
        relations: ['author']
      });

      if (!comment) {
        throw new HttpException('Comentário não encontrado', 404);
      }

      // 2. Verifica permissões de exclusão
      const isOwner = comment.authorId === currentUserId;
      const isAdmin = currentUserRole === 'admin';

      if (!isOwner && !isAdmin) {
        throw new HttpException('Você não tem permissão para excluir este comentário', 403);
      }

      // 3. Realiza soft delete
      await this.commentsRepository.softDelete(id);

      // 4. Retorna confirmação de exclusão
      return {
        message: 'Comentário excluído com sucesso',
        deletedComment: {
          id: comment.id,
          content: comment.content,
          deletedBy: isAdmin ? 'admin' : 'owner',
          deletedAt: new Date()
        }
      };

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Erro interno do servidor', 500);
    }
  }
}
